import * as schema from './csrd-schema';
import rawDb from '../Cypher-System-JSON-DB/CSRD.json';

const db = rawDb as schema.CsrdDb;

export function readTypes(): schema.Type[] {
  return db.types;
}
