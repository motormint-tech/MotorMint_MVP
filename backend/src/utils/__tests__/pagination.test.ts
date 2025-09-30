import { describe, it, expect } from 'vitest';
import { getPagination, getPaginationMeta } from '../pagination';

describe('Pagination Utils', () => {
  describe('getPagination', () => {
    it('should return default pagination when no params provided', () => {
      const result = getPagination({});
      expect(result).toEqual({
        skip: 0,
        take: 10,
        page: 1,
        limit: 10,
      });
    });

    it('should handle custom page and limit', () => {
      const result = getPagination({ page: 2, limit: 20 });
      expect(result).toEqual({
        skip: 20,
        take: 20,
        page: 2,
        limit: 20,
      });
    });

    it('should enforce minimum page of 1', () => {
      const result = getPagination({ page: 0, limit: 10 });
      expect(result.page).toBe(1);
    });

    it('should enforce maximum limit of 100', () => {
      const result = getPagination({ page: 1, limit: 200 });
      expect(result.limit).toBe(100);
    });
  });

  describe('getPaginationMeta', () => {
    it('should calculate pagination meta correctly', () => {
      const result = getPaginationMeta(100, 1, 10);
      expect(result).toEqual({
        total: 100,
        page: 1,
        limit: 10,
        totalPages: 10,
      });
    });

    it('should round up total pages', () => {
      const result = getPaginationMeta(95, 1, 10);
      expect(result.totalPages).toBe(10);
    });
  });
});

