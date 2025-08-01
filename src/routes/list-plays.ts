import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { env } from '../../env';

const listPlaysResponseSchema = z.array(
  z.object({
    event: z.string(),
    total: z.number(),
    total_uniq_sessions: z.number(),
    total_uniq_device: z.number(),
  })
);

type ListPlaysResponse = z.infer<typeof listPlaysResponseSchema>;

export const listPlays: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    '/list-plays',
    {
      schema: {
        response: {
          200: listPlaysResponseSchema,
        },
        body: z.object({
          startDate: z.string(),
          endDate: z.string(),
          events: z.array(z.enum(['started', 'viewed', 'finished'])).min(1),
          playerId: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { playerId, endDate, startDate, events } = request.body;

      const response = await fetch(
        `${env.VTURB_API_URL}/events/total_by_company`,
        {
          method: 'POST',
          headers: {
            'X-Api-Token': env.VTURB_API_TOKEN,
            'X-Api-Version': 'v1',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start_date: startDate,
            end_date: endDate,
            events,
            player_id: playerId,
          }),
        }
      );

      const data: ListPlaysResponse = await response.json();

      return reply.status(200).send(data);
    }
  );
};
