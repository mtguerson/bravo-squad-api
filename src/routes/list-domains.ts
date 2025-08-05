import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { env } from '../env';

export const listDomains: FastifyPluginCallbackZod = (fastify) => {
  fastify.get(
    '/list-domains/:playerId',
    {
      schema: {
        params: z.object({
          playerId: z.string(),
        }),
        response: {
          200: z.array(
            z
              .object({
                domain: z.string(),
                live_users: z.number(),
              })
              .optional()
          ),
        },
      },
    },
    async (request, reply) => {
      const { playerId } = request.params;

      const response = await fetch(
        `${env.VTURB_API_URL}/sessions/live_users?player_id=${playerId}&minutes=30`,
        {
          method: 'GET',
          headers: {
            'X-Api-Token': env.VTURB_API_TOKEN,
            'X-Api-Version': 'v1',
          },
        }
      );

      const data = await response.json();

      return reply.status(200).send(data);
    }
  );
};
