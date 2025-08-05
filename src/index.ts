import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { listAllStats } from './routes/list-all-stats';
import { listAllStatsByDay } from './routes/list-all-stats-by-day';
import { env } from './env';
import { listDomains } from './routes/list-domains';

const fastify = Fastify({
  logger: {
    level: 'info',
  },
}).withTypeProvider<ZodTypeProvider>();

fastify.register(cors, {
  origin: ['http://localhost:5173', 'https://bravo-squad-dash.vercel.app'],
});

fastify.setSerializerCompiler(serializerCompiler);
fastify.setValidatorCompiler(validatorCompiler);

fastify.register(listAllStats);
fastify.register(listAllStatsByDay);
fastify.register(listDomains);

fastify.listen({ port: env.PORT, host: '0.0.0.0' }, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
