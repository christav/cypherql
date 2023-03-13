import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import pingPongRoutes from './routes/ping-pong';

const server = Fastify({
  logger: true
});

server.register(pingPongRoutes);

const start = async () => {
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

start();
