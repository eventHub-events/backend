export class CategoryEntity {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly tags: string[],
    public readonly isBlocked: boolean = false,
    public readonly isDeleted:boolean = false,
    public readonly description?: string,
    public readonly id?: string
  ){}
}