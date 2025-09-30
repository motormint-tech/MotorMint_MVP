import { z } from 'zod';

export const addFavoriteSchema = z.object({
  body: z.object({
    carId: z.string().uuid('Invalid car ID'),
  }),
});

export const removeFavoriteSchema = z.object({
  params: z.object({
    carId: z.string().uuid('Invalid car ID'),
  }),
});

