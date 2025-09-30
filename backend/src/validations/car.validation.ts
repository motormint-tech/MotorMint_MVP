import { z } from 'zod';

export const createCarSchema = z.object({
  body: z.object({
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    price: z.number().positive('Price must be positive'),
    imageUrl: z.string().url('Invalid image URL').optional(),
    description: z.string().optional(),
    categoryId: z.string().uuid('Invalid category ID').optional(),
  }),
});

export const updateCarSchema = z.object({
  body: z.object({
    brand: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    price: z.number().positive().optional(),
    imageUrl: z.string().url().optional(),
    description: z.string().optional(),
    categoryId: z.string().uuid().optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid car ID'),
  }),
});

export const getCarSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid car ID'),
  }),
});

export const getCarsSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    brand: z.string().optional(),
    categoryId: z.string().uuid().optional(),
    minYear: z.string().transform(Number).optional(),
    maxYear: z.string().transform(Number).optional(),
    minPrice: z.string().transform(Number).optional(),
    maxPrice: z.string().transform(Number).optional(),
    search: z.string().optional(),
  }),
});

export const deleteCarSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid car ID'),
  }),
});

