import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { listAllStats } from './routes/list-all-stats';
import { listAllStatsByDay } from './routes/list-all-stats-by-day';

const fastify = Fastify({
  logger: {
    level: 'info',
  },
}).withTypeProvider<ZodTypeProvider>();

fastify.register(cors, {
  origin: 'http://localhost:5173',
});

fastify.setSerializerCompiler(serializerCompiler);
fastify.setValidatorCompiler(validatorCompiler);

fastify.register(listAllStats);
fastify.register(listAllStatsByDay);

fastify.listen({ port: 3333, host: '0.0.0.0' }, () => {
  console.log(`Server is running on port 3333`);
});
