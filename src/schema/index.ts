// GraphQL schema as defined by @fva on the Cypher unlimited discord

export const typeDefs = `#graphql
type Ability {
  id: ID!
  title: String!
  description: String!
  cost: AbilityCost
  actionDescription: String
  type: AbilityType!
}

type AbilityCost {
  stat: Stat!
  value: Int!
  startFrom: Boolean!
}

type Category {
  id: ID!
  name: String!
  low: [Ability]!
  mid: [Ability]!
  high: [Ability]!
}

type Query {
  abilities: [Ability!]!
#  ability(id: ID!): Ability
#  abilities(ofType: AbilityType, ids: [ID]): [Ability!]!
#  categories: [Category!]!
}

enum Stat {
  Might
  Speed
  Intellect
}

enum AbilityType {
  Enabler
  Action
}
`;

export { resolvers } from './resolvers';
