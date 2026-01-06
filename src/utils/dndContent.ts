import { supabase } from '../lib/supabase';
import type {
  DndClass,
  DndSpell,
  DndMonster,
  DndItem,
  DndSpecies,
  DndBackground,
  DndFeat,
  DndRule,
  DndContentType
} from '../types';

export async function fetchClasses(): Promise<DndClass[]> {
  const { data, error } = await supabase
    .from('dnd_classes')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchSpells(filters?: {
  level?: number;
  school?: string;
  class?: string;
}): Promise<DndSpell[]> {
  let query = supabase
    .from('dnd_spells')
    .select('*');

  if (filters?.level !== undefined) {
    query = query.eq('level', filters.level);
  }

  if (filters?.school) {
    query = query.eq('school', filters.school);
  }

  if (filters?.class) {
    query = query.contains('classes', [filters.class]);
  }

  const { data, error } = await query.order('level').order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchMonsters(filters?: {
  type?: string;
  cr?: string;
}): Promise<DndMonster[]> {
  let query = supabase
    .from('dnd_monsters')
    .select('*');

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.cr) {
    query = query.eq('challenge_rating', filters.cr);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchItems(filters?: {
  type?: string;
  rarity?: string;
}): Promise<DndItem[]> {
  let query = supabase
    .from('dnd_items')
    .select('*');

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.rarity) {
    query = query.eq('rarity', filters.rarity);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchSpecies(): Promise<DndSpecies[]> {
  const { data, error } = await supabase
    .from('dnd_species')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchBackgrounds(): Promise<DndBackground[]> {
  const { data, error } = await supabase
    .from('dnd_backgrounds')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchFeats(category?: string): Promise<DndFeat[]> {
  let query = supabase
    .from('dnd_feats')
    .select('*');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query.order('name');

  if (error) throw error;
  return data || [];
}

export async function fetchRules(category?: string): Promise<DndRule[]> {
  let query = supabase
    .from('dnd_rules')
    .select('*');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query.order('category').order('title');

  if (error) throw error;
  return data || [];
}

export async function searchContent(searchTerm: string, contentType?: DndContentType) {
  const tables: DndContentType[] = contentType
    ? [contentType]
    : ['classes', 'spells', 'monsters', 'items', 'species', 'backgrounds', 'feats', 'rules'];

  const results = await Promise.all(
    tables.map(async (table) => {
      const { data, error } = await supabase
        .from(`dnd_${table}`)
        .select('*')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(10);

      if (error) {
        console.error(`Error searching ${table}:`, error);
        return { type: table, items: [] };
      }

      return { type: table, items: data || [] };
    })
  );

  return results.filter(r => r.items.length > 0);
}

export const SPELL_SCHOOLS = [
  'Abjuration',
  'Conjuration',
  'Divination',
  'Enchantment',
  'Evocation',
  'Illusion',
  'Necromancy',
  'Transmutation'
] as const;

export const ITEM_TYPES = [
  'Weapon',
  'Armor',
  'Adventuring Gear',
  'Magic Item',
  'Tool',
  'Mount',
  'Vehicle'
] as const;

export const ITEM_RARITIES = [
  'Common',
  'Uncommon',
  'Rare',
  'Very Rare',
  'Legendary',
  'Artifact'
] as const;

export const MONSTER_TYPES = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead'
] as const;

export const CHALLENGE_RATINGS = [
  '0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '30'
] as const;
