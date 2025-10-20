export interface CategoryResponseDTO {
  name: string;
  color: string;
  tags: string[];
   id?: string;
   description?: string;
   isBlocked?: boolean;
   createdAt?: Date;
   upDatedAt?: Date
}