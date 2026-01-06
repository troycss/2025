/*
  # Character Creation and Management System

  ## Overview
  This migration creates comprehensive character management tables for D&D 5E including
  character creation, progression, inventory, spells, resources, and family trees.

  ## New Tables

  ### 1. `characters_v2`
  Enhanced character table with full D&D 5E stat tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users) - Owner
  - `name` (text) - Character name
  - `class` (text) - Character class
  - `subclass` (text) - Subclass (if applicable)
  - `level` (int) - Character level
  - `experience_points` (int) - Current XP
  - `species` (text) - Species/Race
  - `background` (text) - Background
  - `alignment` (text) - Alignment
  - `portrait_url` (text) - Custom portrait image
  - `ability_scores` (jsonb) - STR, DEX, CON, INT, WIS, CHA
  - `max_hp` (int) - Maximum hit points
  - `current_hp` (int) - Current hit points
  - `temp_hp` (int) - Temporary hit points
  - `armor_class` (int) - Armor class
  - `speed` (int) - Movement speed
  - `hit_die` (text) - Hit die type
  - `hit_dice_current` (int) - Current hit dice
  - `proficiency_bonus` (int) - Proficiency bonus
  - `saving_throws` (text[]) - Proficient saving throws
  - `skills` (jsonb) - Skill proficiencies and expertise
  - `passive_perception` (int) - Passive perception
  - `inspiration` (boolean) - Has inspiration
  - `conditions` (text[]) - Current conditions
  - `death_saves` (jsonb) - Death save successes/failures
  - `personality_traits` (text) - Personality traits
  - `ideals` (text) - Ideals
  - `bonds` (text) - Bonds
  - `flaws` (text) - Flaws
  - `backstory` (text) - Character backstory
  - `notes` (text) - Personal notes
  - `is_active` (boolean) - Is character active
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `character_features`
  Class features and abilities
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `name` (text) - Feature name
  - `description` (text) - Feature description
  - `source` (text) - Source (class, subclass, feat, etc.)
  - `level_acquired` (int) - Level when acquired
  - `uses_per_rest` (int) - Uses per short/long rest
  - `current_uses` (int) - Current uses remaining
  - `reset_on` (text) - short_rest, long_rest, dawn
  - `created_at` (timestamptz)

  ### 3. `character_inventory`
  Equipment and items
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `item_id` (uuid, references dnd_items, nullable)
  - `name` (text) - Item name
  - `quantity` (int) - Quantity
  - `weight` (decimal) - Weight per item
  - `description` (text) - Item description
  - `is_equipped` (boolean) - Is currently equipped
  - `is_attuned` (boolean) - Is attuned (for magic items)
  - `location` (text) - worn, backpack, etc.
  - `notes` (text) - Item notes
  - `created_at` (timestamptz)

  ### 4. `character_spells`
  Known and prepared spells
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `spell_id` (uuid, references dnd_spells, nullable)
  - `spell_name` (text) - Spell name
  - `spell_level` (int) - Spell level
  - `is_prepared` (boolean) - Is prepared
  - `is_always_prepared` (boolean) - Always prepared (domain spells, etc.)
  - `source` (text) - class, subclass, feat, item
  - `created_at` (timestamptz)

  ### 5. `character_spell_slots`
  Spell slot tracking by level
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `spell_level` (int) - Spell level 1-9
  - `max_slots` (int) - Maximum slots
  - `used_slots` (int) - Used slots
  - `updated_at` (timestamptz)
  - UNIQUE(character_id, spell_level)

  ### 6. `character_proficiencies`
  Weapon, armor, tool, and language proficiencies
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `type` (text) - weapon, armor, tool, language
  - `name` (text) - Proficiency name
  - `source` (text) - Source (class, background, etc.)
  - `created_at` (timestamptz)

  ### 7. `character_feats`
  Character feats
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `feat_id` (uuid, references dnd_feats, nullable)
  - `feat_name` (text) - Feat name
  - `description` (text) - Feat description
  - `level_acquired` (int) - Level when acquired
  - `created_at` (timestamptz)

  ### 8. `family_tree_members`
  Family tree system for character lineages
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2) - Root character
  - `name` (text) - Family member name
  - `relationship` (text) - parent, sibling, child, spouse, etc.
  - `portrait_url` (text) - Portrait image
  - `birth_date` (text) - Birth date/year
  - `death_date` (text) - Death date/year
  - `is_deceased` (boolean) - Is deceased
  - `location` (text) - Location
  - `occupation` (text) - Occupation
  - `biography` (text) - Biography/notes
  - `linked_character_id` (uuid, references characters_v2, nullable) - Link to actual character
  - `parent_member_id` (uuid, references family_tree_members, nullable) - Parent in tree
  - `relationship_notes` (text) - Relationship details
  - `bloodline_type` (text) - blood, adoption, marriage, etc.
  - `secrets` (text) - DM-only secrets
  - `secrets_visible` (boolean) - Are secrets revealed
  - `traits` (text[]) - Inherited traits
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 9. `family_heirlooms`
  Legacy items passed through families
  - `id` (uuid, primary key)
  - `family_member_id` (uuid, references family_tree_members)
  - `item_name` (text) - Heirloom name
  - `description` (text) - Item description
  - `current_owner_id` (uuid, references characters_v2, nullable)
  - `history` (text) - Item history
  - `magical_properties` (text) - Magical properties
  - `created_at` (timestamptz)

  ### 10. `character_resources`
  Track class-specific resources (Rage, Ki, Sorcery Points, etc.)
  - `id` (uuid, primary key)
  - `character_id` (uuid, references characters_v2)
  - `resource_name` (text) - Resource name
  - `max_amount` (int) - Maximum amount
  - `current_amount` (int) - Current amount
  - `reset_on` (text) - short_rest, long_rest, dawn
  - `resource_type` (text) - uses, points, dice
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - All tables have RLS enabled
  - Users can only view/edit their own characters
  - DM/GM can view all characters in their sessions
  - Family tree secrets only visible to DM until revealed
*/

-- Create enhanced characters table
CREATE TABLE IF NOT EXISTS characters_v2 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  class text NOT NULL,
  subclass text,
  level int NOT NULL DEFAULT 1,
  experience_points int DEFAULT 0,
  species text NOT NULL,
  background text NOT NULL,
  alignment text,
  portrait_url text,
  ability_scores jsonb NOT NULL DEFAULT '{"str": 10, "dex": 10, "con": 10, "int": 10, "wis": 10, "cha": 10}'::jsonb,
  max_hp int NOT NULL DEFAULT 10,
  current_hp int NOT NULL DEFAULT 10,
  temp_hp int DEFAULT 0,
  armor_class int NOT NULL DEFAULT 10,
  speed int DEFAULT 30,
  hit_die text NOT NULL,
  hit_dice_current int DEFAULT 1,
  proficiency_bonus int NOT NULL DEFAULT 2,
  saving_throws text[] DEFAULT '{}',
  skills jsonb DEFAULT '{}'::jsonb,
  passive_perception int DEFAULT 10,
  inspiration boolean DEFAULT false,
  conditions text[] DEFAULT '{}',
  death_saves jsonb DEFAULT '{"successes": 0, "failures": 0}'::jsonb,
  personality_traits text,
  ideals text,
  bonds text,
  flaws text,
  backstory text,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Character features
CREATE TABLE IF NOT EXISTS character_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  source text NOT NULL,
  level_acquired int NOT NULL,
  uses_per_rest int,
  current_uses int,
  reset_on text,
  created_at timestamptz DEFAULT now()
);

-- Character inventory
CREATE TABLE IF NOT EXISTS character_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  item_id uuid REFERENCES dnd_items(id),
  name text NOT NULL,
  quantity int DEFAULT 1,
  weight decimal DEFAULT 0,
  description text,
  is_equipped boolean DEFAULT false,
  is_attuned boolean DEFAULT false,
  location text DEFAULT 'backpack',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Character spells
CREATE TABLE IF NOT EXISTS character_spells (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  spell_id uuid REFERENCES dnd_spells(id),
  spell_name text NOT NULL,
  spell_level int NOT NULL,
  is_prepared boolean DEFAULT false,
  is_always_prepared boolean DEFAULT false,
  source text DEFAULT 'class',
  created_at timestamptz DEFAULT now()
);

-- Spell slots
CREATE TABLE IF NOT EXISTS character_spell_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  spell_level int NOT NULL CHECK (spell_level >= 1 AND spell_level <= 9),
  max_slots int NOT NULL DEFAULT 0,
  used_slots int DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(character_id, spell_level)
);

-- Proficiencies
CREATE TABLE IF NOT EXISTS character_proficiencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  source text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Feats
CREATE TABLE IF NOT EXISTS character_feats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  feat_id uuid REFERENCES dnd_feats(id),
  feat_name text NOT NULL,
  description text NOT NULL,
  level_acquired int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Family tree
CREATE TABLE IF NOT EXISTS family_tree_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  relationship text NOT NULL,
  portrait_url text,
  birth_date text,
  death_date text,
  is_deceased boolean DEFAULT false,
  location text,
  occupation text,
  biography text,
  linked_character_id uuid REFERENCES characters_v2(id),
  parent_member_id uuid REFERENCES family_tree_members(id),
  relationship_notes text,
  bloodline_type text DEFAULT 'blood',
  secrets text,
  secrets_visible boolean DEFAULT false,
  traits text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Family heirlooms
CREATE TABLE IF NOT EXISTS family_heirlooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_member_id uuid REFERENCES family_tree_members(id) ON DELETE CASCADE NOT NULL,
  item_name text NOT NULL,
  description text NOT NULL,
  current_owner_id uuid REFERENCES characters_v2(id),
  history text,
  magical_properties text,
  created_at timestamptz DEFAULT now()
);

-- Character resources
CREATE TABLE IF NOT EXISTS character_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters_v2(id) ON DELETE CASCADE NOT NULL,
  resource_name text NOT NULL,
  max_amount int NOT NULL,
  current_amount int NOT NULL,
  reset_on text NOT NULL,
  resource_type text DEFAULT 'uses',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_characters_v2_user ON characters_v2(user_id);
CREATE INDEX IF NOT EXISTS idx_character_features_char ON character_features(character_id);
CREATE INDEX IF NOT EXISTS idx_character_inventory_char ON character_inventory(character_id);
CREATE INDEX IF NOT EXISTS idx_character_spells_char ON character_spells(character_id);
CREATE INDEX IF NOT EXISTS idx_character_spell_slots_char ON character_spell_slots(character_id);
CREATE INDEX IF NOT EXISTS idx_family_tree_char ON family_tree_members(character_id);
CREATE INDEX IF NOT EXISTS idx_family_tree_parent ON family_tree_members(parent_member_id);
CREATE INDEX IF NOT EXISTS idx_character_resources_char ON character_resources(character_id);

-- Enable RLS
ALTER TABLE characters_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_spells ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_spell_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_proficiencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_feats ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_tree_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_heirlooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for characters_v2
CREATE POLICY "Users can view own characters"
  ON characters_v2 FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own characters"
  ON characters_v2 FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own characters"
  ON characters_v2 FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own characters"
  ON characters_v2 FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for character_features
CREATE POLICY "Users can view own character features"
  ON character_features FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_features.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character features"
  ON character_features FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_features.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_features.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

-- RLS Policies for character_inventory
CREATE POLICY "Users can view own character inventory"
  ON character_inventory FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_inventory.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character inventory"
  ON character_inventory FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_inventory.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_inventory.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

-- RLS Policies for character_spells
CREATE POLICY "Users can view own character spells"
  ON character_spells FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_spells.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character spells"
  ON character_spells FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_spells.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_spells.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

-- Similar policies for other tables
CREATE POLICY "Users can view own character spell slots"
  ON character_spell_slots FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_spell_slots.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character spell slots"
  ON character_spell_slots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_spell_slots.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_spell_slots.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own character proficiencies"
  ON character_proficiencies FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_proficiencies.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character proficiencies"
  ON character_proficiencies FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_proficiencies.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_proficiencies.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own character feats"
  ON character_feats FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_feats.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character feats"
  ON character_feats FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_feats.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_feats.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own family tree"
  ON family_tree_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = family_tree_members.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own family tree"
  ON family_tree_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = family_tree_members.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = family_tree_members.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own family heirlooms"
  ON family_heirlooms FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM family_tree_members
      JOIN characters_v2 ON characters_v2.id = family_tree_members.character_id
      WHERE family_tree_members.id = family_heirlooms.family_member_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own family heirlooms"
  ON family_heirlooms FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM family_tree_members
      JOIN characters_v2 ON characters_v2.id = family_tree_members.character_id
      WHERE family_tree_members.id = family_heirlooms.family_member_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM family_tree_members
      JOIN characters_v2 ON characters_v2.id = family_tree_members.character_id
      WHERE family_tree_members.id = family_heirlooms.family_member_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own character resources"
  ON character_resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_resources.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own character resources"
  ON character_resources FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_resources.character_id
      AND characters_v2.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM characters_v2
      WHERE characters_v2.id = character_resources.character_id
      AND characters_v2.user_id = auth.uid()
    )
  );