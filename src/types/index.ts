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

export interface DndClass {
  id: string;
  name: string;
  description: string;
  hit_die: number;
  primary_ability: string[];
  saving_throws: string[];
  armor_proficiencies: string[];
  weapon_proficiencies: string[];
  tool_proficiencies: string[];
  skill_choices: number;
  skill_options: string[];
  subclasses: any[];
  features: Record<string, any>;
  spell_casting?: any;
  source_url: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface DndSpell {
  id: string;
  name: string;
  level: number;
  school: string;
  casting_time: string;
  range: string;
  components: string[];
  material?: string;
  duration: string;
  concentration: boolean;
  ritual: boolean;
  description: string;
  higher_levels?: string;
  classes: string[];
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface DndMonster {
  id: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: number;
  hit_points: string;
  speed: Record<string, any>;
  ability_scores: AbilityScores;
  saving_throws?: Record<string, number>;
  skills?: Record<string, number>;
  damage_resistances?: string[];
  damage_immunities?: string[];
  condition_immunities?: string[];
  senses: Record<string, any>;
  languages: string[];
  challenge_rating: string;
  proficiency_bonus: number;
  traits: any[];
  actions: any[];
  bonus_actions?: any[];
  reactions?: any[];
  legendary_actions?: any[];
  lair_actions?: string;
  description?: string;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface DndItem {
  id: string;
  name: string;
  type: string;
  rarity?: string;
  cost?: string;
  weight?: string;
  description: string;
  properties?: string[];
  damage?: string;
  damage_type?: string;
  armor_class?: string;
  strength_requirement?: number;
  stealth_disadvantage: boolean;
  weapon_mastery?: string;
  attunement: boolean;
  attunement_requirements?: string;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface DndSpecies {
  id: string;
  name: string;
  description: string;
  size: string;
  speed: number;
  traits: any[];
  ability_score_increases?: any;
  languages: string[];
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface DndBackground {
  id: string;
  name: string;
  description: string;
  skill_proficiencies: string[];
  tool_proficiencies: string[];
  languages: number;
  equipment: string[];
  feature?: any;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface DndFeat {
  id: string;
  name: string;
  category: string;
  prerequisites?: string;
  description: string;
  benefits: any[];
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface DndRule {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  content: string;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export type DndContentType = 'classes' | 'spells' | 'monsters' | 'items' | 'species' | 'backgrounds' | 'feats' | 'rules';
