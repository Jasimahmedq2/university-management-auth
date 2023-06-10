import { SortOrder } from 'mongoose';

export type IPaginationTypes = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
