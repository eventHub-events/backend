export interface CreateCategoryRequestDTO {
  name: string;
  color: string;
  tags: string[];
  description?: string;
}
