import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { env } from '../../env';

const listConversionsSchema = z.object({
  total_events: z.number(),
  total_uniq_session_events: z.number(),
  total_uniq_device_events: z.number(),
  total_amount_usd: z.number(),
  total_amount_brl: z.number(),
  total_amount_eur: z.number(),
  events_by_day: z.array(
    z.object({
      day: z.string(),
      total: z.number(),
      total_uniq_sessions: z.number(),
      total_uniq_device: z.number(),
    })
  ),
});

type ListConversionsResponse = z.infer<typeof listConversionsSchema>;

export const listConversions: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    '/list-conversions',
    {
      schema: {
        body: z.object({
          startDate: z.string(),
          endDate: z.string(),
          playerId: z.string(),
        }),
        response: {
          200: listConversionsSchema,
        },
      },
    },
    async (request, reply) => {
      const { playerId, endDate, startDate } = request.body;

      const response = await fetch(
        `${env.VTURB_API_URL}/conversions/stats_by_day`,
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

      const data: ListConversionsResponse = await response.json();

      return reply.status(200).send(data);
    }
  );
};
