import { z } from 'zod';

export const ProductsZodSchema = z.object({
  _id: z.string().optional(),
  produto: z.string().min(3).max(50),
  valor: z.number().gt(0),
  descricao: z.string().optional(),
  tipo: z.string().max(20),
  created: z.date().optional(),
  updated: z.date().optional(),
});

export type IProduct = z.infer<typeof ProductsZodSchema>;
