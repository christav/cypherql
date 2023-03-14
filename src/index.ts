import Fastify, { FastifyInstance } from 'fastify';
import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify';
import pingPongRoutes from './routes/ping-pong.js';
import { typeDefs, resolvers } from './books/index.js';

async function createServer() {
  const server = Fastify({
    logger: true
  });

  server.register(pingPongRoutes);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [fastifyApolloDrainPlugin(server)]
  });

  await apollo.start();
  await server.register(fastifyApollo(apollo));
  return server;
}

async function start(server: FastifyInstance) {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(`Server listening on http://localhost/${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

createServer()
  .then(start)
  .catch(err => console.error(err));
