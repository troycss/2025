/*
  # D&D Beyond Content Database Schema

  ## Overview
  This migration creates tables to store comprehensive D&D 5E content from D&D Beyond,
  including player resources, DM tools, and monster information.

  ## New Tables

  ### 1. `dnd_classes`
  Stores character class information with subclasses, features, and spell lists
  - `id` (uuid, primary key)
  - `name` (text) - Class name (e.g., "Wizard", "Fighter")
  - `description` (text) - Full class description
  - `hit_die` (int) - Hit dice type (e.g., 8 for d8)
  - `primary_ability` (text[]) - Primary abilities
  - `saving_throws` (text[]) - Proficient saving throws
  - `armor_proficiencies` (text[]) - Armor proficiencies
  - `weapon_proficiencies` (text[]) - Weapon proficiencies
  - `tool_proficiencies` (text[]) - Tool proficiencies
  - `skill_choices` (int) - Number of skills to choose
  - `skill_options` (text[]) - Available skill options
  - `subclasses` (jsonb) - Array of subclass objects
  - `features` (jsonb) - Class features by level
  - `spell_casting` (jsonb) - Spellcasting information
  - `source_url` (text) - D&D Beyond URL
  - `content` (text) - Full HTML/markdown content
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `dnd_spells`
  Complete spell database for all classes
  - `id` (uuid, primary key)
  - `name` (text) - Spell name
  - `level` (int) - Spell level (0-9)
  - `school` (text) - School of magic
  - `casting_time` (text) - Casting time
  - `range` (text) - Spell range
  - `components` (text[]) - V, S, M components
  - `material` (text) - Material component description
  - `duration` (text) - Duration
  - `concentration` (boolean) - Requires concentration
  - `ritual` (boolean) - Can be cast as ritual
  - `description` (text) - Full spell description
  - `higher_levels` (text) - At higher levels text
  - `classes` (text[]) - Classes that can cast this spell
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `dnd_monsters`
  Monster stat blocks and information
  - `id` (uuid, primary key)
  - `name` (text) - Monster name
  - `size` (text) - Size category
  - `type` (text) - Creature type
  - `alignment` (text) - Alignment
  - `armor_class` (int) - AC
  - `hit_points` (text) - HP (e.g., "45 (6d8 + 18)")
  - `speed` (jsonb) - Speed types and values
  - `ability_scores` (jsonb) - STR, DEX, CON, INT, WIS, CHA
  - `saving_throws` (jsonb) - Saving throw bonuses
  - `skills` (jsonb) - Skill bonuses
  - `damage_resistances` (text[]) - Damage resistances
  - `damage_immunities` (text[]) - Damage immunities
  - `condition_immunities` (text[]) - Condition immunities
  - `senses` (jsonb) - Senses and ranges
  - `languages` (text[]) - Languages
  - `challenge_rating` (text) - CR (e.g., "5", "1/4")
  - `proficiency_bonus` (int) - Proficiency bonus
  - `traits` (jsonb) - Special traits
  - `actions` (jsonb) - Actions
  - `bonus_actions` (jsonb) - Bonus actions
  - `reactions` (jsonb) - Reactions
  - `legendary_actions` (jsonb) - Legendary actions
  - `lair_actions` (text) - Lair actions description
  - `description` (text) - Lore and description
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `dnd_items`
  Equipment, weapons, armor, and magic items
  - `id` (uuid, primary key)
  - `name` (text) - Item name
  - `type` (text) - Item type (weapon, armor, adventuring gear, magic item)
  - `rarity` (text) - Rarity (common, uncommon, rare, etc.)
  - `cost` (text) - Cost (e.g., "50 gp")
  - `weight` (text) - Weight
  - `description` (text) - Full description
  - `properties` (text[]) - Item properties
  - `damage` (text) - Weapon damage (e.g., "1d8")
  - `damage_type` (text) - Damage type
  - `armor_class` (text) - AC for armor
  - `strength_requirement` (int) - STR requirement
  - `stealth_disadvantage` (boolean) - Stealth disadvantage
  - `weapon_mastery` (text) - Weapon mastery property
  - `attunement` (boolean) - Requires attunement
  - `attunement_requirements` (text) - Attunement requirements
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `dnd_species`
  Playable species/ancestry options
  - `id` (uuid, primary key)
  - `name` (text) - Species name
  - `description` (text) - Full description
  - `size` (text) - Size category
  - `speed` (int) - Base walking speed
  - `traits` (jsonb) - Racial traits
  - `ability_score_increases` (jsonb) - ASI options
  - `languages` (text[]) - Languages
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `dnd_backgrounds`
  Character backgrounds
  - `id` (uuid, primary key)
  - `name` (text) - Background name
  - `description` (text) - Full description
  - `skill_proficiencies` (text[]) - Skill proficiencies
  - `tool_proficiencies` (text[]) - Tool proficiencies
  - `languages` (int) - Number of languages
  - `equipment` (text[]) - Starting equipment
  - `feature` (jsonb) - Background feature
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `dnd_feats`
  Feats (origin, general, fighting style, epic boons)
  - `id` (uuid, primary key)
  - `name` (text) - Feat name
  - `category` (text) - Feat category
  - `prerequisites` (text) - Prerequisites
  - `description` (text) - Full description
  - `benefits` (jsonb) - Feat benefits
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. `dnd_rules`
  Rules glossary and game mechanics
  - `id` (uuid, primary key)
  - `title` (text) - Rule title
  - `category` (text) - Category (combat, spellcasting, conditions, etc.)
  - `subcategory` (text) - Subcategory
  - `content` (text) - Full rule description
  - `source_url` (text) - D&D Beyond URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 9. `dnd_content_sync`
  Tracks content synchronization status
  - `id` (uuid, primary key)
  - `content_type` (text) - Type of content
  - `last_synced` (timestamptz) - Last sync timestamp
  - `status` (text) - Sync status
  - `error_message` (text) - Error if sync failed
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - All tables have RLS enabled
  - Public read access for all D&D content (authenticated and anonymous)
  - Only service role can write/update content
*/

-- Create tables
CREATE TABLE IF NOT EXISTS dnd_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  hit_die int,
  primary_ability text[],
  saving_throws text[],
  armor_proficiencies text[],
  weapon_proficiencies text[],
  tool_proficiencies text[],
  skill_choices int,
  skill_options text[],
  subclasses jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '{}'::jsonb,
  spell_casting jsonb,
  source_url text,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dnd_spells (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level int NOT NULL,
  school text NOT NULL,
  casting_time text NOT NULL,
  range text NOT NULL,
  components text[],
  material text,
  duration text NOT NULL,
  concentration boolean DEFAULT false,
  ritual boolean DEFAULT false,
  description text NOT NULL,
  higher_levels text,
  classes text[],
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, level)
);

CREATE TABLE IF NOT EXISTS dnd_monsters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  size text NOT NULL,
  type text NOT NULL,
  alignment text,
  armor_class int NOT NULL,
  hit_points text NOT NULL,
  speed jsonb NOT NULL,
  ability_scores jsonb NOT NULL,
  saving_throws jsonb,
  skills jsonb,
  damage_resistances text[],
  damage_immunities text[],
  condition_immunities text[],
  senses jsonb,
  languages text[],
  challenge_rating text NOT NULL,
  proficiency_bonus int NOT NULL,
  traits jsonb DEFAULT '[]'::jsonb,
  actions jsonb DEFAULT '[]'::jsonb,
  bonus_actions jsonb DEFAULT '[]'::jsonb,
  reactions jsonb DEFAULT '[]'::jsonb,
  legendary_actions jsonb DEFAULT '[]'::jsonb,
  lair_actions text,
  description text,
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dnd_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  rarity text,
  cost text,
  weight text,
  description text NOT NULL,
  properties text[],
  damage text,
  damage_type text,
  armor_class text,
  strength_requirement int,
  stealth_disadvantage boolean DEFAULT false,
  weapon_mastery text,
  attunement boolean DEFAULT false,
  attunement_requirements text,
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, type)
);

CREATE TABLE IF NOT EXISTS dnd_species (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  size text NOT NULL,
  speed int NOT NULL,
  traits jsonb DEFAULT '[]'::jsonb,
  ability_score_increases jsonb,
  languages text[],
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dnd_backgrounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  skill_proficiencies text[],
  tool_proficiencies text[],
  languages int,
  equipment text[],
  feature jsonb,
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dnd_feats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  prerequisites text,
  description text NOT NULL,
  benefits jsonb DEFAULT '[]'::jsonb,
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dnd_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  subcategory text,
  content text NOT NULL,
  source_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(title, category)
);

CREATE TABLE IF NOT EXISTS dnd_content_sync (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL UNIQUE,
  last_synced timestamptz,
  status text DEFAULT 'pending',
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_spells_level ON dnd_spells(level);
CREATE INDEX IF NOT EXISTS idx_spells_school ON dnd_spells(school);
CREATE INDEX IF NOT EXISTS idx_spells_classes ON dnd_spells USING gin(classes);
CREATE INDEX IF NOT EXISTS idx_monsters_cr ON dnd_monsters(challenge_rating);
CREATE INDEX IF NOT EXISTS idx_monsters_type ON dnd_monsters(type);
CREATE INDEX IF NOT EXISTS idx_items_type ON dnd_items(type);
CREATE INDEX IF NOT EXISTS idx_items_rarity ON dnd_items(rarity);
CREATE INDEX IF NOT EXISTS idx_rules_category ON dnd_rules(category);
CREATE INDEX IF NOT EXISTS idx_feats_category ON dnd_feats(category);

-- Enable Row Level Security
ALTER TABLE dnd_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_spells ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_monsters ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_backgrounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_feats ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE dnd_content_sync ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for all D&D content
CREATE POLICY "Anyone can view classes"
  ON dnd_classes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view spells"
  ON dnd_spells FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view monsters"
  ON dnd_monsters FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view items"
  ON dnd_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view species"
  ON dnd_species FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view backgrounds"
  ON dnd_backgrounds FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view feats"
  ON dnd_feats FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view rules"
  ON dnd_rules FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view content sync status"
  ON dnd_content_sync FOR SELECT
  USING (true);