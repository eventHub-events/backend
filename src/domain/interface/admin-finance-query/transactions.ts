export interface TransactionsFilter {
  page: number;
  limit: number;
  from?: Date;
  to?: Date;
  status?: string;
  eventTitle?: string;
  organizerName?: string;
  userName?: string;

}