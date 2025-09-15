export interface PaginationDTO{
  page:number;
  limit:number;
  search?:string;
  role?:string;
  status?:string;
}