// GraphQL schema as defined by @fva on the Cypher unlimited discord
import { readFileSync } from 'fs';
import path from 'path';

export const typeDefs = readFileSync(path.join(__dirname, 'csrd-schema.gql'), { encoding: 'utf8' });
export { resolvers } from './resolvers';
