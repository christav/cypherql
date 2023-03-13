// TS Schema for the CSRD json database from https://github.com/Jon-Davis/Cypher-System-JSON-DB
// Derived from the Readme file in that repo.

export type AbilityTier = 'Low' | 'Mid' | 'High';

// Ability represents special abilities found in Types, Flavors and Focuses
export interface Ability {
  name: string;             // Name of the ability
  cost?: number;            // Minimum point cost if any
  pool: string[];           // The pools ability can use
  additional_cost?: string; // Other costs such as XP
  tier?: AbilityTier;       // General tier: low, mid, high
  category: string[];       // Categories found in Chapter 9
  description: string;      // Description of the ability
  references: string[];     // Locations this ability pops up
}

// AbilityRefs used by Types, Flavors, and Focuses to reference an ability
export interface AbilityRef {
  name: string;         // Name of the ability
  tier: number;         // What tier the ability is unlocked
  preselected: boolean; // Is ability preselected or optional
}

// BasicAbility are abilities granted by types or descriptors, but aren't in the abilities section.
export interface BasicAbility {
  name: string;
  description: string;
}

// Amount tracks how many abilities each type gains at each tier.
interface Amount {
  tier: number;
  special_abilities: number;
}

// A cypher system type
export interface Type {
  name: string;                 // Name of the type
  intrusions: BasicAbility[];   // Intrusion suggestions
  stat_pool: {                  // Starting stat pool values
    [poolName: string]: number;
  },
  special_abilities_per_tier: Amount[];   // Special abilities unlocked at each tier
  abilities: BasicAbility[];              // Basic abilities like starting equipment and effort
  special_abilities: AbilityRef[];        // Abilities found at each tier
}

// A Cypher system Flavor
export interface Flavor {
  name: string;             // The name of the flavor
  abilities: AbilityRef[];  // Abilities found at each tier
}

// Descriptor type
export interface Descriptor {
  name: string;                     // Name of the descriptor
  description: string;              // The provided description
  characteristics: BasicAbility[];  // Basic abilities such as skills and pool points
  links: string[];                  // Starting adventure links
}

// Focus
export interface Focus {
  name: string;             // Name of the focus
  description: string;      // the provided description
  abilities: AbilityRef[];  // Abilities at each tier
  intrusions: string;       // GM Intrusion suggestion
}

// Entry in a random table
export interface RollEntry {
  start: number;  // starting range inclusive
  end: number;    // ending range inclusive
  entry: string;  // name/description
}

export type CypherKind = 'MANIFEST' | 'SUBTLE' | 'FANTASTIC';

// Cyphers
export interface Cypher {
  name: string;             // Name of the cypher
  level_dice?: string;      // The dice used to determine the level
  level_mod: number;        // The additional modification to the level
  effect: string;           // The effect of the cypher
  options: RollEntry[];     // A random roll table if applicable
  kinds: CypherKind[];      // MANFEST, SUBTLE, FANTASTIC
}

// CypherTable for teh random roll tables for cyphers
export interface CypherTable {
  kind: CypherKind;     // MANIFEST, SUBTLE, FANTASTIC
  options: RollEntry[]; // Range and name of cypher
}

// Artifact entry
export interface Artifact {
  name: string;         // Name of the Artifact
  level_dice?: string;  // Dice used to determine level
  level_mod: number;    // Additional mondifications to the level
  form: string;         // The form of the artifact
  depletion: string;    // The depletion range
  effect: string;       // The description
}

export type CreatureKind = 'Creature' | 'NPC' | 'Super Villian';

// Creatures
export interface Creature {
  name: string;             // The name of the creature
  kind: CreatureKind;       // Creature, NPS, or Super Villian
  level: number;            // Level 1-10
  description: string;      // provided description
  motive: string;           // provided motive
  environment?: string;     // environment if any
  health: number;           // health
  damage: string;           // damage dealt
  armor: number;            // armor, 0 if none
  movement: string;         // movement speed
  modifications: string[];  // list of modifications
  combat?: string;          // combat options
  interactions: string;     // interactions
  uses?: string;            // use if any
  loot?: string;            // loot if any
  intrusions?: string;      // GM intrusions if any
}

// The top level database
export interface CsrdDb {
  types: Type[];
  flavors: Flavor[];
  descriptors: Descriptor[];
  foci: Focus[];
  abilities: Ability[];
  cyphers: Cypher[];
  cypher_tables: CypherTable[];
  artifacts: Artifact[];
  creatures: Creature[];
}
