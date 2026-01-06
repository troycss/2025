# D&D 5E Companion App

A beautiful book-themed Dungeons & Dragons 5th Edition companion app with real-time multiplayer functionality.

## What Was Built (Phase 1 - MVP)

### ✅ Database Schema (Supabase)
Complete backend infrastructure with:
- **sessions** table for managing game sessions
- **characters** table for D&D 5E character sheets
- **session_players** table for active session participants
- **dice_rolls** table for roll history
- **session_state** table for initiative tracking and activity feed
- Row Level Security policies configured
- Real-time sync capabilities enabled

### ✅ Book-Themed UI
Medieval fantasy aesthetic featuring:
- **Parchment texture backgrounds** with aged paper look
- **Leather-bound book appearance** with embossed edges
- **Gold accents** and illuminated manuscript styling
- **Custom fonts**: Cinzel (headings), EB Garamond (body)
- **Page turn animations** for smooth transitions
- Color scheme: Aged parchment (#F4E8D0), dark leather (#3E2723), gold (#D4AF37)

### ✅ Core Navigation
**Book Cover Home Page** with four main options:
1. Join/Create Session
2. My Characters
3. Dice Roller
4. Quick Reference

### ✅ Session Management
- **Create Session** - DM creates sessions with auto-generated 6-character codes (e.g., "DRAG0N")
- **Join Session** - Players enter code and name to join
- Clean form interfaces with medieval styling
- Code generation utility functions

### ✅ Quick Reference
Basic D&D rules reference including:
- Ability checks and DC table
- Combat actions
- Advantage/Disadvantage rules

### ✅ Placeholder Pages
Structure ready for:
- Character creation and management
- Dice roller with animations
- Full quick reference guide

## Tech Stack

- **React 18** with TypeScript
- **Supabase** for database, authentication, and real-time sync
- **Vite** for fast development and building
- **Lucide React** for icons
- Custom CSS with medieval fantasy theming

## Project Structure

```
src/
├── components/
│   └── book/
│       ├── BookCover.tsx          # Main menu/home page
│       ├── BookCover.css
│       ├── PageLayout.tsx         # Reusable page wrapper
│       └── PageLayout.css
├── pages/
│   ├── SessionPage.tsx            # Session create/join
│   ├── SessionPage.css
│   ├── CharactersPage.tsx         # Character management (placeholder)
│   ├── DicePage.tsx               # Dice roller (placeholder)
│   └── ReferencePage.tsx          # Quick reference rules
├── lib/
│   └── supabase.ts                # Supabase client setup
├── types/
│   └── index.ts                   # TypeScript interfaces for D&D data
├── utils/
│   └── dnd.ts                     # D&D helper functions (dice, modifiers, etc.)
├── styles/
│   └── global.css                 # Global book theme styles
├── App.tsx                        # Main app with page routing
└── main.tsx                       # React entry point
```

## Database Schema

### Tables Created

**sessions**
- `id` (uuid, PK)
- `code` (text, unique 6-char code)
- `dm_name`, `dm_id`
- `is_active` (boolean)
- `created_at`, `ended_at`

**characters**
- `id` (uuid, PK)
- `user_id` (owner)
- `name`, `class`, `level`, `race`, `background`, `alignment`
- `ability_scores` (jsonb) - STR, DEX, CON, INT, WIS, CHA
- `combat_stats` (jsonb) - AC, HP, speed, hit dice
- `proficiencies` (jsonb) - saves, skills
- `features`, `equipment`, `spell_slots`

**session_players**
- `id` (uuid, PK)
- `session_id` (FK to sessions)
- `player_id`, `player_name`
- `character_id` (FK to characters)
- `current_hp`, `temp_hp`
- `conditions` (jsonb array)
- `is_connected` (boolean)

**session_state**
- `id` (uuid, PK)
- `session_id` (FK to sessions)
- `initiative_tracker` (jsonb array)
- `current_round`, `current_turn_index`
- `activity_feed` (jsonb array)

**dice_rolls**
- `id` (uuid, PK)
- `session_id` (FK to sessions)
- `player_id`, `player_name`
- `roll_type`, `result`, `breakdown`
- `description`
- `is_private` (boolean)

## Key Features Ready for Expansion

1. **Real-time multiplayer** - Supabase configured for live updates via subscriptions
2. **Character creation** - Full D&D 5E stat system defined with TypeScript types
3. **Dice rolling** - Utility functions for d4, d6, d8, d10, d12, d20, d100
4. **Initiative tracking** - Data structure and schema ready
5. **Activity feed** - Schema in place for messages and events
6. **User management** - User ID generation for tracking players

## TypeScript Types Defined

Complete interfaces for:
- `Character` - Full D&D 5E character sheet
- `Session` - Game session data
- `SessionPlayer` - Player in active session
- `DiceRoll` - Roll results and history
- `InitiativeCombatant` - Combat tracker entry
- `SessionState` - Initiative and activity feed
- D&D constants: classes, races, alignments, conditions, skills

## Utility Functions

D&D helper functions in `utils/dnd.ts`:
- `calculateModifier()` - Convert ability score to modifier
- `formatModifier()` - Format modifier with +/- sign
- `calculateProficiencyBonus()` - Calculate from level
- `generateSessionCode()` - Create random 6-character code
- `rollDice()` - Roll single die
- `parseDiceExpression()` - Parse "2d6+3" format
- `rollDiceExpression()` - Execute dice expression

## Design System

### Color Palette
- **Parchment**: #F4E8D0 (light), #E8DCC4 (dark)
- **Leather Brown**: #3E2723 (main), #4E3028 (light)
- **Gold**: #D4AF37 (main), #B8941F (dark)
- **Ink**: #2C1810 (dark), #5D4037 (light)
- **Red Seal**: #8B0000

### Typography
- **Headings**: Cinzel (serif, bold, medieval)
- **Body**: EB Garamond (serif, elegant)
- Font sizes: 1rem - 2.5rem

### Components
- `.book-page` - Parchment background with texture
- `.illuminated-header` - Gold headers with decorated first letter
- `.btn-primary` - Gold gradient buttons
- `.btn-secondary` - Parchment buttons with border
- `.btn-danger` - Red seal colored button
- `.form-input` - Styled inputs with leather border
- `.hp-bar` - Health bar with gradient fill
- `.condition-badge` - Status effect badges
- `.dice-icon` - Gold colored dice icons

## Build Info

- Production build: **~48KB gzipped**
- CSS: ~3.7KB gzipped
- Clean, optimized bundle
- Ready for deployment

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Next Steps (Future Development)

### Phase 2: Character Management
- Character creation form with all D&D 5E stats
- Character list with edit/delete
- Character sheet display
- Import/export as JSON

### Phase 3: Dice Roller
- Visual dice buttons (d4, d6, d8, d10, d12, d20, d100)
- Advanced rolling (3d6+5, advantage/disadvantage)
- Roll history
- Shared public rolls
- DM private rolls
- Roll animations

### Phase 4: DM Tools
- Party overview with all player characters
- Initiative tracker with combat management
- Quick NPC creator
- HP tracking for party
- Content sharing (notes, images)
- XP awards

### Phase 5: Real-Time Features
- Live session sync with Supabase real-time
- Player join/leave notifications
- Shared dice rolls visible to all
- Activity feed updates
- HP changes sync across devices
- Initiative tracker updates

### Phase 6: Enhanced Features
- Conditions tracker
- Spell slot management
- Equipment tracking
- Notes and features
- Session history
- Character portraits

## Design Philosophy

The app embraces a **medieval fantasy aesthetic** to immerse players in the tabletop experience:

- **Book metaphor** - The interface resembles opening a leather-bound tome
- **Parchment pages** - All content appears on aged paper
- **Illuminated manuscripts** - Headers styled like medieval texts
- **Gold accents** - Royal, fantasy feel
- **Smooth animations** - Page turns and transitions
- **Thematic consistency** - Every element reinforces the fantasy theme

Modern functionality wrapped in timeless fantasy presentation.

## Why Supabase?

Supabase provides:
- **Real-time sync** - Perfect for multiplayer sessions
- **PostgreSQL** - Powerful relational database
- **Row Level Security** - Built-in access control
- **TypeScript support** - Type-safe database queries
- **Free tier** - Generous limits for small groups
- **Easy setup** - No server configuration needed

## Success Criteria Met

✅ DM can create a session and share code
✅ Beautiful book-themed interface
✅ Database schema supports full D&D functionality
✅ TypeScript types defined for type safety
✅ Utility functions ready for D&D mechanics
✅ Clean component architecture
✅ Production build successful (~48KB)
✅ Mobile responsive design

## Future Vision

A fully-featured D&D companion that allows groups to:
- Run complete game sessions digitally
- Track multiple characters
- Share dice rolls in real-time
- Manage combat with initiative tracker
- Reference rules quickly
- Save session history
- Play seamlessly on any device

All while maintaining the immersive, book-themed fantasy aesthetic!
