import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../db';

export const listPlayers: FastifyPluginCallbackZod = (fastify) => {
  fastify.get(
    '/list-players',
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
            })
          ),
        },
      },
    },
    async () => {
      const players = await db.query.playersTable.findMany();

      return players;
    }
  );
};
