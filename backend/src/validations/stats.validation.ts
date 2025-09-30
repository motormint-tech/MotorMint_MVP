import { z } from 'zod';

export const createStatsSchema = z.object({
  body: z.object({
    carId: z.string().uuid('Invalid car ID'),
    horsepower: z.number().int().positive().optional(),
    torque: z.number().int().positive().optional(),
    zeroTo100: z.number().positive().optional(),
    topSpeed: z.number().int().positive().optional(),
    batteryRange: z.number().int().positive().optional(),
  }),
});

export const updateStatsSchema = z.object({
  body: z.object({
    horsepower: z.number().int().positive().optional(),
    torque: z.number().int().positive().optional(),
    zeroTo100: z.number().positive().optional(),
    topSpeed: z.number().int().positive().optional(),
    batteryRange: z.number().int().positive().optional(),
  }),
  params: z.object({
    carId: z.string().uuid('Invalid car ID'),
  }),
});

export const getStatsSchema = z.object({
  params: z.object({
    carId: z.string().uuid('Invalid car ID'),
  }),
});

export const deleteStatsSchema = z.object({
  params: z.object({
    carId: z.string().uuid('Invalid car ID'),
  }),
});

