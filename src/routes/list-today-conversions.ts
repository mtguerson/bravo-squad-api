import { endOfToday, startOfToday } from 'date-fns';
import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { env } from '../../env';

export const listTodayConversions: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    '/teste',
    {
      schema: {
        body: z.object({
          playerId: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { playerId } = request.body;

      const startOfTodayFormatted =
        startOfToday().toISOString().slice(0, 10) + ' 00:00:00';
      const endOfTodayFormatted =
        endOfToday().toISOString().slice(0, 10) + ' 00:00:00';

      const response = await fetch(
        'https://analytics.vturb.net/conversions/stats_by_day',
        {
          method: 'POST',
          headers: {
            'X-Api-Token':
              '7ca0546c41c62986d23393d351c6ba47d15bc3a069fb3630e3efb4a53c340b11',
            'X-Api-Version': 'v1',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start_date: startOfTodayFormatted,
            end_date: endOfTodayFormatted,
            player_id: playerId,
            timezone: 'America/Sao_Paulo',
          }),
        }
      );

      const data = await response.json();

      return reply.status(200).send(data);
    }
  );
};
