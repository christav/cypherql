import * as schema from './csrd-schema.js';
import rawDb from '../Cypher-System-JSON-DB/CSRD.json';

const db = rawDb as schema.CsrdDb;

export function readTypes(): schema.Type[] {
  return db.types;
}
