import { z } from 'zod';

export const createMyMenuSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number().gt(0),
  category: z.string(),
  additional: z.string().optional(),
});

export type CreateMyMenuDto = z.infer<typeof createMyMenuSchema>;
