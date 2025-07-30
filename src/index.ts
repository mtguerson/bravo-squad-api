import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { listTodayConversions } from './routes/list-today-conversions';

import 'dotenv/config';
import { env } from '../env';

const fastify = Fastify().withTypeProvider<ZodTypeProvider>();

fastify.register(cors, {
  origin: 'http://localhost:5173',
});

fastify.setSerializerCompiler(serializerCompiler);
fastify.setValidatorCompiler(validatorCompiler);

fastify.register(listTodayConversions);

fastify.listen({ port: 3333 }, () => {
  console.log(`Server is running on port 3333`);
});
