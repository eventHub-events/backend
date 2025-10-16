export interface UpdateCategoryRequestDTO {
  name?: string;
  description?: string,
  tags?: string[];
  color?: string;
  isBlocked?: boolean
}