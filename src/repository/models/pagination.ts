export interface PaginationInfo {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  lastId?: string | null;
}
