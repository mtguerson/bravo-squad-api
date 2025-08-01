import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { env } from '../../env';

export const listAllStatsByDay: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    '/list-all-stats-by-day',
    {
      schema: {
        body: z.object({
          startDate: z.string(),
          endDate: z.string(),
          playerId: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { playerId, endDate, startDate } = request.body;

      const response = await fetch(
        `${env.VTURB_API_URL}/sessions/stats_by_day`,
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
            player_id: playerId,
          }),
        }
      );

      const data = await response.json();

      return reply.status(200).send(data);
    }
  );
};
