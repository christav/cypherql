import * as schema from './csrd-schema';
import rawDb from '../Cypher-System-JSON-DB/CSRD.json';

const db = rawDb as schema.CsrdDb;

export function readTypes(): schema.Type[] {
  return db.types;
}

export function getAbilities(): schema.Ability[] {
  return db.abilities;
}

export * from './csrd-schema';
