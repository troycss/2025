import { useState, useEffect } from 'react';
import { Plus, User, Heart, Shield, Swords, Sparkles, Trash2, Edit } from 'lucide-react';
import PageLayout from '../components/book/PageLayout';
import CharacterWizard from '../components/character/CharacterWizard';
import { fetchUserCharacters, deleteCharacter, calculateModifier, type CharacterV2 } from '../utils/characterUtils';
import { supabase } from '../lib/supabase';

interface CharactersPageProps {
  onBack: () => void;
}

export default function CharactersPage({ onBack }: CharactersPageProps) {
  const [characters, setCharacters] = useState<CharacterV2[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterV2 | null>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    loadUserAndCharacters();
  }, []);

  async function loadUserAndCharacters() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const chars = await fetchUserCharacters(user.id);
        setCharacters(chars || []);
      }
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCharacter(characterId: string) {
    if (!confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteCharacter(characterId);
      setCharacters(characters.filter(c => c.id !== characterId));
    } catch (error) {
      console.error('Error deleting character:', error);
      alert('Failed to delete character. Please try again.');
    }
  }

  function handleCharacterCreated(characterId: string) {
    setShowWizard(false);
    loadUserAndCharacters();
  }

  return (
    <PageLayout title="My Characters" onBack={onBack}>
      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--ink)' }}>
            {characters.length} Character{characters.length !== 1 ? 's' : ''}
          </h3>
          <button
            onClick={() => setShowWizard(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--gold)',
              color: 'var(--parchment)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            <Plus size={20} />
            Create Character
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--ink-light)' }}>
            Loading characters...
          </div>
        ) : characters.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--ink-light)' }}>
            <User size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              No characters yet
            </p>
            <p>Create your first character to begin your adventure!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onView={() => setSelectedCharacter(character)}
                onDelete={() => handleDeleteCharacter(character.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showWizard && (
        <CharacterWizard
          userId={userId}
          onComplete={handleCharacterCreated}
          onCancel={() => setShowWizard(false)}
        />
      )}

      {selectedCharacter && (
        <CharacterDetailModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </PageLayout>
  );
}

function CharacterCard({ character, onView, onDelete }: {
  character: CharacterV2;
  onView: () => void;
  onDelete: () => void;
}) {
  const strMod = calculateModifier(character.ability_scores.str);
  const dexMod = calculateModifier(character.ability_scores.dex);
  const conMod = calculateModifier(character.ability_scores.con);

  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'rgba(255, 248, 230, 0.3)',
        border: '2px solid var(--gold)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onClick={onView}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--ink)', fontSize: '1.5rem' }}>
            {character.name}
          </h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--ink-light)', fontSize: '1rem' }}>
            Level {character.level} {character.species} {character.class}
            {character.subclass && ` (${character.subclass})`}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Stat icon={Heart} label="HP" value={`${character.current_hp}/${character.max_hp}`} />
            <Stat icon={Shield} label="AC" value={character.armor_class.toString()} />
            <Stat icon={Swords} label="STR" value={`${character.ability_scores.str} (${strMod >= 0 ? '+' : ''}${strMod})`} />
            <Stat icon={Sparkles} label="DEX" value={`${character.ability_scores.dex} (${dexMod >= 0 ? '+' : ''}${dexMod})`} />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            padding: '0.5rem',
            background: 'transparent',
            color: '#dc2626',
            border: '1px solid #dc2626',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Icon size={16} style={{ color: 'var(--gold)' }} />
      <span style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>
        <strong>{label}:</strong> {value}
      </span>
    </div>
  );
}

function CharacterDetailModal({ character, onClose }: { character: CharacterV2; onClose: () => void }) {
  const abilities = [
    { key: 'str', label: 'STR', value: character.ability_scores.str },
    { key: 'dex', label: 'DEX', value: character.ability_scores.dex },
    { key: 'con', label: 'CON', value: character.ability_scores.con },
    { key: 'int', label: 'INT', value: character.ability_scores.int },
    { key: 'wis', label: 'WIS', value: character.ability_scores.wis },
    { key: 'cha', label: 'CHA', value: character.ability_scores.cha }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--parchment)',
          border: '3px solid var(--gold)',
          borderRadius: '12px',
          maxWidth: '800px',
          maxHeight: '80vh',
          width: '100%',
          overflowY: 'auto',
          padding: '2rem'
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '2rem' }}>
                {character.name}
              </h2>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--ink-light)', fontSize: '1.1rem' }}>
                Level {character.level} {character.species} {character.class}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--gold)',
                color: 'var(--parchment)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Close
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {abilities.map(({ key, label, value }) => (
              <div
                key={key}
                style={{
                  padding: '1rem',
                  background: 'rgba(218, 165, 32, 0.1)',
                  border: '2px solid var(--gold)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--ink-light)', marginBottom: '0.25rem' }}>
                  {label}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>
                  {calculateModifier(value) >= 0 ? '+' : ''}{calculateModifier(value)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <StatBox label="Hit Points" value={`${character.current_hp}/${character.max_hp}`} />
            <StatBox label="Armor Class" value={character.armor_class.toString()} />
            <StatBox label="Speed" value={`${character.speed} ft.`} />
            <StatBox label="Hit Die" value={character.hit_die} />
            <StatBox label="Proficiency" value={`+${character.proficiency_bonus}`} />
            <StatBox label="Passive Perc." value={character.passive_perception.toString()} />
          </div>

          {character.personality_traits && (
            <Section title="Personality" content={character.personality_traits} />
          )}
          {character.ideals && (
            <Section title="Ideals" content={character.ideals} />
          )}
          {character.bonds && (
            <Section title="Bonds" content={character.bonds} />
          )}
          {character.flaws && (
            <Section title="Flaws" content={character.flaws} />
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: '0.75rem', background: 'rgba(255, 248, 230, 0.5)', borderRadius: '6px' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--ink-light)', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--ink)' }}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold)', fontSize: '1rem' }}>
        {title}
      </h4>
      <p style={{ margin: 0, color: 'var(--ink)', lineHeight: '1.5' }}>
        {content}
      </p>
    </div>
  );
}
