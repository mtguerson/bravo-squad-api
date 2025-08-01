import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { listConversions } from './routes/list-conversions';
import { listPlays } from './routes/list-plays';

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

fastify.register(listConversions);
fastify.register(listPlays);

fastify.listen({ port: 3333 }, () => {
  console.log(`Server is running on port 3333`);
});
