import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { playersTable } from '../db/schema';

export const createPlayer: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    '/create-player',
    {
      schema: {
        body: z.object({
          id: z.string(),
          name: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id, name } = request.body;

      const playerAlreadyExists = await db.query.playersTable.findFirst({
        where: eq(playersTable.id, id),
      });

      if (playerAlreadyExists) {
        return reply.status(400).send({ error: 'Player already exists' });
      }

      db.insert(playersTable).values({
        id,
        name,
      });

      return reply.status(201).send();
    }
  );
};
