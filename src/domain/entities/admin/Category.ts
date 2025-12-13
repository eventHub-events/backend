export class CategoryEntity {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly tags: string[],
    public readonly description?: string,
    public readonly isBlocked?: boolean,
    public readonly isDeleted?: boolean,
    public readonly id?: string,
    public readonly createdAt?: Date
  ) {}
}
