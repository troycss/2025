import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { CLASS_DATA, calculateModifier, calculateProficiencyBonus, createCharacter } from '../../utils/characterUtils';
import { DND_RACES } from '../../types';

interface CharacterWizardProps {
  onComplete: (characterId: string) => void;
  onCancel: () => void;
  userId: string;
}

type WizardStep = 'basics' | 'class' | 'species' | 'abilities' | 'background' | 'details';

export default function CharacterWizard({ onComplete, onCancel, userId }: CharacterWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('basics');
  const [loading, setLoading] = useState(false);

  const [characterData, setCharacterData] = useState({
    name: '',
    class: '',
    species: '',
    background: '',
    alignment: 'N',
    abilityScores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    personality_traits: '',
    ideals: '',
    bonds: '',
    flaws: ''
  });

  const steps: WizardStep[] = ['basics', 'class', 'species', 'abilities', 'background', 'details'];
  const stepIndex = steps.indexOf(currentStep);

  function nextStep() {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1]);
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1]);
    }
  }

  async function handleComplete() {
    setLoading(true);
    try {
      const classInfo = CLASS_DATA[characterData.class as keyof typeof CLASS_DATA];
      const profBonus = calculateProficiencyBonus(1);
      const conMod = calculateModifier(characterData.abilityScores.con);
      const maxHp = parseInt(classInfo.hitDie.substring(1)) + conMod;

      const newCharacter = await createCharacter({
        user_id: userId,
        name: characterData.name,
        class: characterData.class,
        level: 1,
        experience_points: 0,
        species: characterData.species,
        background: characterData.background,
        alignment: characterData.alignment,
        ability_scores: characterData.abilityScores,
        max_hp: maxHp,
        current_hp: maxHp,
        temp_hp: 0,
        armor_class: 10 + calculateModifier(characterData.abilityScores.dex),
        speed: 30,
        hit_die: classInfo.hitDie,
        hit_dice_current: 1,
        proficiency_bonus: profBonus,
        saving_throws: classInfo.saves,
        skills: {},
        passive_perception: 10 + calculateModifier(characterData.abilityScores.wis),
        inspiration: false,
        conditions: [],
        death_saves: { successes: 0, failures: 0 },
        personality_traits: characterData.personality_traits,
        ideals: characterData.ideals,
        bonds: characterData.bonds,
        flaws: characterData.flaws,
        is_active: true
      });

      onComplete(newCharacter.id);
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to create character. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'var(--parchment)',
        border: '3px solid var(--gold)',
        borderRadius: '12px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={24} style={{ color: 'var(--gold)' }} />
            Create New Character
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {steps.map((step, idx) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  height: '4px',
                  background: idx <= stepIndex ? 'var(--gold)' : '#ddd',
                  borderRadius: '2px',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ minHeight: '400px' }}>
          {currentStep === 'basics' && (
            <BasicsStep
              data={characterData}
              onChange={(updates) => setCharacterData({ ...characterData, ...updates })}
            />
          )}
          {currentStep === 'class' && (
            <ClassStep
              selectedClass={characterData.class}
              onChange={(cls) => setCharacterData({ ...characterData, class: cls })}
            />
          )}
          {currentStep === 'species' && (
            <SpeciesStep
              selectedSpecies={characterData.species}
              onChange={(species) => setCharacterData({ ...characterData, species })}
            />
          )}
          {currentStep === 'abilities' && (
            <AbilitiesStep
              scores={characterData.abilityScores}
              onChange={(scores) => setCharacterData({ ...characterData, abilityScores: scores })}
            />
          )}
          {currentStep === 'background' && (
            <BackgroundStep
              selectedBackground={characterData.background}
              onChange={(background) => setCharacterData({ ...characterData, background })}
            />
          )}
          {currentStep === 'details' && (
            <DetailsStep
              data={characterData}
              onChange={(updates) => setCharacterData({ ...characterData, ...updates })}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
          <button
            onClick={stepIndex === 0 ? onCancel : prevStep}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'var(--ink)',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 'bold'
            }}
          >
            <ArrowLeft size={18} />
            {stepIndex === 0 ? 'Cancel' : 'Back'}
          </button>

          {stepIndex === steps.length - 1 ? (
            <button
              onClick={handleComplete}
              disabled={loading || !characterData.name || !characterData.class || !characterData.species || !characterData.background}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--gold)',
                color: 'var(--parchment)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 'bold',
                opacity: loading ? 0.6 : 1
              }}
            >
              <Check size={18} />
              {loading ? 'Creating...' : 'Create Character'}
            </button>
          ) : (
            <button
              onClick={nextStep}
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
                fontWeight: 'bold'
              }}
            >
              Next
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function BasicsStep({ data, onChange }: { data: any; onChange: (updates: any) => void }) {
  return (
    <div>
      <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Basic Information</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
            Character Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Enter character name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
            Alignment
          </label>
          <select
            value={data.alignment}
            onChange={(e) => onChange({ alignment: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          >
            <option value="LG">Lawful Good</option>
            <option value="NG">Neutral Good</option>
            <option value="CG">Chaotic Good</option>
            <option value="LN">Lawful Neutral</option>
            <option value="N">True Neutral</option>
            <option value="CN">Chaotic Neutral</option>
            <option value="LE">Lawful Evil</option>
            <option value="NE">Neutral Evil</option>
            <option value="CE">Chaotic Evil</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ClassStep({ selectedClass, onChange }: { selectedClass: string; onChange: (cls: string) => void }) {
  return (
    <div>
      <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Choose Your Class</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {Object.entries(CLASS_DATA).map(([className, classInfo]) => (
          <div
            key={className}
            onClick={() => onChange(className)}
            style={{
              padding: '1rem',
              border: `2px solid ${selectedClass === className ? 'var(--gold)' : '#ccc'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              background: selectedClass === className ? 'rgba(218, 165, 32, 0.1)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ink)' }}>{className}</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--ink-light)' }}>
              {classInfo.description}
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gold)' }}>
              Hit Die: {classInfo.hitDie}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeciesStep({ selectedSpecies, onChange }: { selectedSpecies: string; onChange: (species: string) => void }) {
  return (
    <div>
      <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Choose Your Species</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {DND_RACES.map((species) => (
          <div
            key={species}
            onClick={() => onChange(species)}
            style={{
              padding: '1rem',
              border: `2px solid ${selectedSpecies === species ? 'var(--gold)' : '#ccc'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              background: selectedSpecies === species ? 'rgba(218, 165, 32, 0.1)' : 'transparent',
              textAlign: 'center',
              fontWeight: selectedSpecies === species ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            {species}
          </div>
        ))}
      </div>
    </div>
  );
}

function AbilitiesStep({ scores, onChange }: { scores: any; onChange: (scores: any) => void }) {
  const abilities = [
    { key: 'str', label: 'Strength' },
    { key: 'dex', label: 'Dexterity' },
    { key: 'con', label: 'Constitution' },
    { key: 'int', label: 'Intelligence' },
    { key: 'wis', label: 'Wisdom' },
    { key: 'cha', label: 'Charisma' }
  ];

  return (
    <div>
      <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Assign Ability Scores</h3>
      <p style={{ marginBottom: '1.5rem', color: 'var(--ink-light)' }}>
        Set your ability scores (3-20). Default is 10 for each ability.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {abilities.map(({ key, label }) => (
          <div key={key}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
              {label}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="number"
                min="3"
                max="20"
                value={scores[key]}
                onChange={(e) => onChange({ ...scores, [key]: parseInt(e.target.value) || 10 })}
                style={{
                  width: '80px',
                  padding: '0.75rem',
                  border: '2px solid var(--gold)',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '1rem', color: 'var(--ink-light)' }}>
                Modifier: {calculateModifier(scores[key]) >= 0 ? '+' : ''}{calculateModifier(scores[key])}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BackgroundStep({ selectedBackground, onChange }: { selectedBackground: string; onChange: (bg: string) => void }) {
  const backgrounds = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor'];

  return (
    <div>
      <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Choose Your Background</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {backgrounds.map((background) => (
          <div
            key={background}
            onClick={() => onChange(background)}
            style={{
              padding: '1rem',
              border: `2px solid ${selectedBackground === background ? 'var(--gold)' : '#ccc'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              background: selectedBackground === background ? 'rgba(218, 165, 32, 0.1)' : 'transparent',
              textAlign: 'center',
              fontWeight: selectedBackground === background ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            {background}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailsStep({ data, onChange }: { data: any; onChange: (updates: any) => void }) {
  return (
    <div>
      <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Character Details</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
            Personality Traits
          </label>
          <textarea
            value={data.personality_traits}
            onChange={(e) => onChange({ personality_traits: e.target.value })}
            rows={2}
            placeholder="Describe your character's personality..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
            Ideals
          </label>
          <textarea
            value={data.ideals}
            onChange={(e) => onChange({ ideals: e.target.value })}
            rows={2}
            placeholder="What drives your character..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
            Bonds
          </label>
          <textarea
            value={data.bonds}
            onChange={(e) => onChange({ bonds: e.target.value })}
            rows={2}
            placeholder="What connections does your character have..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--ink)' }}>
            Flaws
          </label>
          <textarea
            value={data.flaws}
            onChange={(e) => onChange({ flaws: e.target.value })}
            rows={2}
            placeholder="What weaknesses does your character have..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--gold)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>
      </div>
    </div>
  );
}
