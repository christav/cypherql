import R from 'ramda';

import { getAbilities, Ability } from '../csrd';

function abilityCostFromAbility(ability: Ability) {
  if (!ability.pool || ability.pool.length === 0) {
    return null;
  }
  return {
    stat: ability.pool[0],
    value: ability.cost ?? 0,
    startFrom: true // Not sure what this field is for?
  };
}

const abilityIsEnabler = (ability: Ability): boolean =>
  ability.description.endsWith('Enabler.');

const jsonToGraphqlAbiilty = (ability: Ability): any => ({
  id: ability.name,
    title: ability.name,
    description: ability.description,
    cost: abilityCostFromAbility(ability),
    actionDescription: ability.description,
    type: abilityIsEnabler(ability) ? 'Enabler' : 'Action'
});

function ability(parent, args) {
  const jsonAbility = R.find((a: Ability) => a.name === args.id)(getAbilities());
  return jsonAbility !== null ? jsonToGraphqlAbiilty(jsonAbility) : null;
}

function abilities(parent, args) {
  let typeFilter: (a: Ability) => boolean;
  switch (args.ofType) {
    case 'Enabler':
      console.log(`Looking for enabler`);
      typeFilter = abilityIsEnabler;
      break;
    case 'Action':
      console.log(`Looking for actions`);
      typeFilter = (a: Ability) => !abilityIsEnabler(a);
      break;
    default:
      console.log(`No type specified, returning everything`);
      typeFilter = R.T;
      break;
  }

  let idFilter: (a: Ability) => boolean = R.T;
  if (R.is(Array, args.ids)) {
    idFilter = (a: Ability) => R.includes(a.name, args.ids);
  }

  const foundAbilities = R.filter((a: Ability) => {
    return typeFilter(a) && idFilter(a);
  })(getAbilities());
  return R.map(jsonToGraphqlAbiilty, foundAbilities);
}

export const resolvers = {
  Query: {
    ability,
    abilities
  }
};
