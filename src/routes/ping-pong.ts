import { FastifyInstance, RouteShorthandOptions, FastifyPluginCallback } from 'fastify';

const pingPongOpts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        msg: { type: 'string' }
      },
      required: [ 'msg' ]
    },
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

async function routes(fastify: FastifyInstance, options: RouteShorthandOptions, done: (err?: Error) => void) {
  fastify.post('/ping', { ...pingPongOpts, ...options }, async (req, res) => {
    const { msg } = req.body as any;
    return { pong: `pong: ${msg}`};
  });
  done();
}

export default routes;
