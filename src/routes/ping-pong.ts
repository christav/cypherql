import { FastifyInstance, RouteShorthandOptions } from 'fastify';

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

interface PingPongBody {
  msg: string;
}

async function routes(fastify: FastifyInstance, options: RouteShorthandOptions, done: (err?: Error) => void) {
  fastify.post('/ping', { ...pingPongOpts, ...options }, async (req) => {
    const { msg } = req.body as PingPongBody;
    return { pong: `pong: ${msg}`};
  });
  done();
}

export default routes;
