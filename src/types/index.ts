export interface Character {
  id: string;
  user_id: string;
  name: string;
  class: string;
  level: number;
  race: string;
  background: string;
  alignment: string;
  ability_scores: AbilityScores;
  combat_stats: CombatStats;
  proficiencies: Proficiencies;
  features: string;
  equipment: string;
  spell_slots: SpellSlots;
  created_at: string;
  updated_at: string;
}

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface CombatStats {
  ac: number;
  max_hp: number;
  speed: number;
  hit_dice: string;
}

export interface Proficiencies {
  saves: string[];
  skills: string[];
}

export interface SpellSlots {
  [level: string]: { current: number; max: number };
}

export interface Session {
  id: string;
  code: string;
  dm_name: string;
  dm_id: string;
  is_active: boolean;
  created_at: string;
  ended_at?: string;
}

export interface SessionPlayer {
  id: string;
  session_id: string;
  player_id: string;
  player_name: string;
  character_id?: string;
  character_data: Character;
  current_hp: number;
  temp_hp: number;
  conditions: string[];
  is_connected: boolean;
  joined_at: string;
}

export interface DiceRoll {
  id: string;
  session_id: string;
  player_id: string;
  player_name: string;
  roll_type: string;
  result: number;
  breakdown: DiceBreakdown;
  description: string;
  is_private: boolean;
  created_at: string;
}

export interface DiceBreakdown {
  dice: number[];
  modifier: number;
  expression: string;
}

export interface InitiativeCombatant {
  id: string;
  name: string;
  initiative: number;
  hp: number;
  max_hp: number;
  ac: number;
  conditions: string[];
  is_player: boolean;
  player_id?: string;
}

export interface SessionState {
  id: string;
  session_id: string;
  initiative_tracker: InitiativeCombatant[];
  current_round: number;
  current_turn_index: number;
  activity_feed: ActivityFeedItem[];
  updated_at: string;
}

export interface ActivityFeedItem {
  id: string;
  message: string;
  type: 'message' | 'roll' | 'xp' | 'turn' | 'join' | 'leave';
  data?: any;
  timestamp: string;
}

export const DND_CLASSES = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard'
] as const;

export const DND_RACES = [
  'Human',
  'Elf',
  'Dwarf',
  'Halfling',
  'Dragonborn',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Tiefling'
] as const;

export const ALIGNMENTS = [
  'LG',
  'NG',
  'CG',
  'LN',
  'N',
  'CN',
  'LE',
  'NE',
  'CE'
] as const;

export const CONDITIONS = [
  'Blinded',
  'Charmed',
  'Deafened',
  'Frightened',
  'Grappled',
  'Incapacitated',
  'Invisible',
  'Paralyzed',
  'Petrified',
  'Poisoned',
  'Prone',
  'Restrained',
  'Stunned',
  'Unconscious'
] as const;

export const SKILLS = [
  'Acrobatics',
  'Animal Handling',
  'Arcana',
  'Athletics',
  'Deception',
  'History',
  'Insight',
  'Intimidation',
  'Investigation',
  'Medicine',
  'Nature',
  'Perception',
  'Performance',
  'Persuasion',
  'Religion',
  'Sleight of Hand',
  'Stealth',
  'Survival'
] as const;
