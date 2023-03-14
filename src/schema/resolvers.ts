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

function abilities(parent, args, context, info) {
  const abilities = getAbilities();

  return R.map((jsonAbility: Ability) => ({
    id: jsonAbility.name,
    title: jsonAbility.name,
    description: jsonAbility.description,
    cost: abilityCostFromAbility(jsonAbility),
    actionDescription: jsonAbility.description,
    type: abilityIsEnabler(jsonAbility) ? 'Enabler' : 'Action'
  }))(abilities);
}

export const resolvers = {
  Query: {
    abilities
  }
};
