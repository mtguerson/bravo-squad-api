import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  VTURB_API_URL: z.url(),
  VTURB_API_TOKEN: z.string().min(1),
});

export const env = envSchema.parse(process.env);
