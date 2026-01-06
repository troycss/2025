import { supabase } from '../lib/supabase';

export interface CharacterV2 {
  id: string;
  user_id: string;
  name: string;
  class: string;
  subclass?: string;
  level: number;
  experience_points: number;
  species: string;
  background: string;
  alignment?: string;
  portrait_url?: string;
  ability_scores: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  max_hp: number;
  current_hp: number;
  temp_hp: number;
  armor_class: number;
  speed: number;
  hit_die: string;
  hit_dice_current: number;
  proficiency_bonus: number;
  saving_throws: string[];
  skills: Record<string, { proficient: boolean; expertise: boolean }>;
  passive_perception: number;
  inspiration: boolean;
  conditions: string[];
  death_saves: { successes: number; failures: number };
  personality_traits?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
  backstory?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const CLASS_DATA = {
  Barbarian: {
    hitDie: 'd12',
    primaryAbility: ['Strength'],
    saves: ['Strength', 'Constitution'],
    skills: { choose: 2, from: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'] },
    description: 'A fierce warrior who can enter a battle rage'
  },
  Bard: {
    hitDie: 'd8',
    primaryAbility: ['Charisma'],
    saves: ['Dexterity', 'Charisma'],
    skills: { choose: 3, from: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'] },
    description: 'An inspiring magician whose power echoes the music of creation'
  },
  Cleric: {
    hitDie: 'd8',
    primaryAbility: ['Wisdom'],
    saves: ['Wisdom', 'Charisma'],
    skills: { choose: 2, from: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'] },
    description: 'A priestly champion who wields divine magic in service of a higher power'
  },
  Druid: {
    hitDie: 'd8',
    primaryAbility: ['Wisdom'],
    saves: ['Intelligence', 'Wisdom'],
    skills: { choose: 2, from: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'] },
    description: 'A priest of nature who wields primal magic'
  },
  Fighter: {
    hitDie: 'd10',
    primaryAbility: ['Strength', 'Dexterity'],
    saves: ['Strength', 'Constitution'],
    skills: { choose: 2, from: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'] },
    description: 'A master of martial combat, skilled with a variety of weapons and armor'
  },
  Monk: {
    hitDie: 'd8',
    primaryAbility: ['Dexterity', 'Wisdom'],
    saves: ['Strength', 'Dexterity'],
    skills: { choose: 2, from: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'] },
    description: 'A master of martial arts, harnessing ki to achieve perfection'
  },
  Paladin: {
    hitDie: 'd10',
    primaryAbility: ['Strength', 'Charisma'],
    saves: ['Wisdom', 'Charisma'],
    skills: { choose: 2, from: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'] },
    description: 'A holy warrior bound to a sacred oath'
  },
  Ranger: {
    hitDie: 'd10',
    primaryAbility: ['Dexterity', 'Wisdom'],
    saves: ['Strength', 'Dexterity'],
    skills: { choose: 3, from: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'] },
    description: 'A warrior who uses martial prowess and nature magic to combat threats'
  },
  Rogue: {
    hitDie: 'd8',
    primaryAbility: ['Dexterity'],
    saves: ['Dexterity', 'Intelligence'],
    skills: { choose: 4, from: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'] },
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles'
  },
  Sorcerer: {
    hitDie: 'd6',
    primaryAbility: ['Charisma'],
    saves: ['Constitution', 'Charisma'],
    skills: { choose: 2, from: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'] },
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline'
  },
  Warlock: {
    hitDie: 'd8',
    primaryAbility: ['Charisma'],
    saves: ['Wisdom', 'Charisma'],
    skills: { choose: 2, from: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'] },
    description: 'A wielder of magic derived from a bargain with an otherworldly entity'
  },
  Wizard: {
    hitDie: 'd6',
    primaryAbility: ['Intelligence'],
    saves: ['Intelligence', 'Wisdom'],
    skills: { choose: 2, from: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'] },
    description: 'A scholarly magic-user capable of manipulating reality'
  }
};

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function calculateProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export function calculatePassivePerception(wisdomScore: number, proficiencyBonus: number, isProficient: boolean): number {
  const modifier = calculateModifier(wisdomScore);
  return 10 + modifier + (isProficient ? proficiencyBonus : 0);
}

export async function createCharacter(characterData: Partial<CharacterV2>) {
  const { data, error } = await supabase
    .from('characters_v2')
    .insert([characterData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchUserCharacters(userId: string) {
  const { data, error } = await supabase
    .from('characters_v2')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateCharacter(characterId: string, updates: Partial<CharacterV2>) {
  const { data, error } = await supabase
    .from('characters_v2')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', characterId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCharacter(characterId: string) {
  const { error } = await supabase
    .from('characters_v2')
    .delete()
    .eq('id', characterId);

  if (error) throw error;
}

export async function addCharacterSpell(characterId: string, spellData: {
  spell_id?: string;
  spell_name: string;
  spell_level: number;
  is_prepared?: boolean;
  is_always_prepared?: boolean;
  source?: string;
}) {
  const { data, error } = await supabase
    .from('character_spells')
    .insert([{ character_id: characterId, ...spellData }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchCharacterSpells(characterId: string) {
  const { data, error } = await supabase
    .from('character_spells')
    .select('*')
    .eq('character_id', characterId)
    .order('spell_level')
    .order('spell_name');

  if (error) throw error;
  return data;
}

export async function updateSpellSlots(characterId: string, spellLevel: number, usedSlots: number) {
  const { data, error } = await supabase
    .from('character_spell_slots')
    .upsert({
      character_id: characterId,
      spell_level: spellLevel,
      used_slots: usedSlots,
      updated_at: new Date().toISOString()
    }, { onConflict: 'character_id,spell_level' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addInventoryItem(characterId: string, itemData: {
  item_id?: string;
  name: string;
  quantity?: number;
  weight?: number;
  description?: string;
  is_equipped?: boolean;
  is_attuned?: boolean;
  location?: string;
  notes?: string;
}) {
  const { data, error } = await supabase
    .from('character_inventory')
    .insert([{ character_id: characterId, ...itemData }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchCharacterInventory(characterId: string) {
  const { data, error } = await supabase
    .from('character_inventory')
    .select('*')
    .eq('character_id', characterId)
    .order('name');

  if (error) throw error;
  return data;
}

export async function addFamilyMember(characterId: string, memberData: {
  name: string;
  relationship: string;
  portrait_url?: string;
  birth_date?: string;
  death_date?: string;
  is_deceased?: boolean;
  location?: string;
  occupation?: string;
  biography?: string;
  linked_character_id?: string;
  parent_member_id?: string;
  relationship_notes?: string;
  bloodline_type?: string;
  secrets?: string;
  traits?: string[];
}) {
  const { data, error } = await supabase
    .from('family_tree_members')
    .insert([{ character_id: characterId, ...memberData }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchFamilyTree(characterId: string) {
  const { data, error } = await supabase
    .from('family_tree_members')
    .select('*')
    .eq('character_id', characterId)
    .order('created_at');

  if (error) throw error;
  return data;
}

export const XP_THRESHOLDS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

export function getXPForLevel(level: number): number {
  return level > 0 && level <= 20 ? XP_THRESHOLDS[level - 1] : 0;
}

export function getLevelFromXP(xp: number): number {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}
