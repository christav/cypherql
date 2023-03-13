import { FastifyInstance, RouteShorthandOptions } from 'fastify';

const pingPongOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
};

async function routes (fastify: FastifyInstance, options: RouteShorthandOptions ) {
  fastify.get('/ping', { ...pingPongOpts, ...options }, async (req, res) => {
    return { pong: 'It works!' };
  });
}

export default routes;
