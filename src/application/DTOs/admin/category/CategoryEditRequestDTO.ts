export interface CategoryEditRequestDTO {
  name: string;
  color: string;
  tags: string[];
  description?: string;
  isBlocked?: boolean;
}
