import { useState, useEffect } from 'react';
import { Search, Book, Scroll, Users, Sword, Shield, Sparkles, BookOpen, Trophy, ExternalLink } from 'lucide-react';
import PageLayout from '../components/book/PageLayout';
import {
  fetchClasses,
  fetchSpells,
  fetchMonsters,
  fetchItems,
  fetchSpecies,
  fetchBackgrounds,
  fetchFeats,
  fetchRules,
  searchContent,
  SPELL_SCHOOLS,
  ITEM_TYPES,
  MONSTER_TYPES,
  CHALLENGE_RATINGS
} from '../utils/dndContent';
import type {
  DndClass,
  DndSpell,
  DndMonster,
  DndItem,
  DndSpecies,
  DndBackground,
  DndFeat,
  DndRule
} from '../types';

interface ReferencePageProps {
  onBack: () => void;
}

type ContentSection = 'classes' | 'spells' | 'monsters' | 'items' | 'species' | 'backgrounds' | 'feats' | 'rules';

export default function ReferencePage({ onBack }: ReferencePageProps) {
  const [activeSection, setActiveSection] = useState<ContentSection>('classes');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [classes, setClasses] = useState<DndClass[]>([]);
  const [spells, setSpells] = useState<DndSpell[]>([]);
  const [monsters, setMonsters] = useState<DndMonster[]>([]);
  const [items, setItems] = useState<DndItem[]>([]);
  const [species, setSpecies] = useState<DndSpecies[]>([]);
  const [backgrounds, setBackgrounds] = useState<DndBackground[]>([]);
  const [feats, setFeats] = useState<DndFeat[]>([]);
  const [rules, setRules] = useState<DndRule[]>([]);

  useEffect(() => {
    loadContent();
  }, [activeSection]);

  async function loadContent() {
    setLoading(true);
    try {
      switch (activeSection) {
        case 'classes':
          const classData = await fetchClasses();
          setClasses(classData);
          break;
        case 'spells':
          const spellData = await fetchSpells();
          setSpells(spellData);
          break;
        case 'monsters':
          const monsterData = await fetchMonsters();
          setMonsters(monsterData);
          break;
        case 'items':
          const itemData = await fetchItems();
          setItems(itemData);
          break;
        case 'species':
          const speciesData = await fetchSpecies();
          setSpecies(speciesData);
          break;
        case 'backgrounds':
          const backgroundData = await fetchBackgrounds();
          setBackgrounds(backgroundData);
          break;
        case 'feats':
          const featData = await fetchFeats();
          setFeats(featData);
          break;
        case 'rules':
          const ruleData = await fetchRules();
          setRules(ruleData);
          break;
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  }

  const sections = [
    { id: 'classes', label: 'Classes', icon: Book },
    { id: 'spells', label: 'Spells', icon: Sparkles },
    { id: 'monsters', label: 'Monsters', icon: Users },
    { id: 'items', label: 'Items', icon: Sword },
    { id: 'species', label: 'Species', icon: Shield },
    { id: 'backgrounds', label: 'Backgrounds', icon: BookOpen },
    { id: 'feats', label: 'Feats', icon: Trophy },
    { id: 'rules', label: 'Rules', icon: Scroll }
  ] as const;

  function getCurrentData() {
    switch (activeSection) {
      case 'classes': return classes;
      case 'spells': return spells;
      case 'monsters': return monsters;
      case 'items': return items;
      case 'species': return species;
      case 'backgrounds': return backgrounds;
      case 'feats': return feats;
      case 'rules': return rules;
    }
  }

  const currentData = getCurrentData();
  const filteredData = searchTerm
    ? currentData.filter((item: any) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentData;

  return (
    <PageLayout title="D&D Reference" onBack={onBack}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          padding: '0 1rem',
          borderBottom: '2px solid var(--gold)',
          paddingBottom: '0.5rem'
        }}>
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as ContentSection)}
              style={{
                padding: '0.5rem 1rem',
                background: activeSection === id ? 'var(--gold)' : 'transparent',
                color: activeSection === id ? 'var(--parchment)' : 'var(--ink)',
                border: '1px solid var(--gold)',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: activeSection === id ? 'bold' : 'normal',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div style={{ padding: '0 1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--ink-light)'
              }}
            />
            <input
              type="text"
              placeholder={`Search ${activeSection}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                border: '2px solid var(--gold)',
                borderRadius: '8px',
                background: 'rgba(255, 248, 230, 0.5)',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 1rem 1rem'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-light)' }}>
              Loading {activeSection}...
            </div>
          ) : filteredData.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--ink-light)'
            }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                No {activeSection} found.
              </p>
              <p style={{ fontSize: '0.9rem' }}>
                Content from D&D Beyond will be synced here. Visit{' '}
                <a
                  href="https://www.dndbeyond.com/sources/dnd/br-2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--gold)', textDecoration: 'underline' }}
                >
                  D&D Beyond Basic Rules
                </a>
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {filteredData.map((item: any) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  type={activeSection}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          type={activeSection}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </PageLayout>
  );
}

function ContentCard({ item, type, onClick }: { item: any; type: ContentSection; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '1rem',
        background: 'rgba(255, 248, 230, 0.3)',
        border: '1px solid var(--gold)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(218, 165, 32, 0.1)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 248, 230, 0.3)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ink)', fontSize: '1.1rem' }}>
            {item.name || item.title}
          </h4>
          {type === 'spells' && (
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-light)', marginBottom: '0.5rem' }}>
              Level {item.level} {item.school} {item.ritual && '(Ritual)'}
            </div>
          )}
          {type === 'monsters' && (
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-light)', marginBottom: '0.5rem' }}>
              CR {item.challenge_rating} • {item.size} {item.type}
            </div>
          )}
          {type === 'items' && item.rarity && (
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-light)', marginBottom: '0.5rem' }}>
              {item.rarity} {item.type}
            </div>
          )}
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: 'var(--ink-light)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ item, type, onClose }: { item: any; type: ContentSection; onClose: () => void }) {
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
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.8rem' }}>
            {item.name || item.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1rem',
              background: 'var(--gold)',
              color: 'var(--parchment)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Close
          </button>
        </div>

        <div style={{ color: 'var(--ink)', lineHeight: '1.6' }}>
          {item.description && (
            <p style={{ marginBottom: '1.5rem' }}>{item.description}</p>
          )}

          {item.source_url && (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold)',
                textDecoration: 'none',
                marginTop: '1rem',
                fontSize: '0.9rem'
              }}
            >
              View on D&D Beyond <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
