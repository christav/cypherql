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

// The top level database
export interface CsrdDb {
  types: Type[];
}
