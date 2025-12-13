import { IPrivileges } from '../../../infrastructure/db/models/admin/SubscriptionPrivileges';

export class SubscriptionPlansEntity {
  public id?: string;
  public name: string;
  public durationInDays: number;
  public price: number;
  public description: string;
  public privileges: IPrivileges;
  public isActive?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: {
    id?: string;
    name: string;
    durationInDays: number;
    description: string;
    privileges: IPrivileges;
    isActive?: boolean;
    createdAt?: Date;
    price: number;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.durationInDays = props.durationInDays;
    this.description = props.description;
    this.privileges = props.privileges;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.price = props.price;
  }
  update(data: Partial<Omit<SubscriptionPlansEntity, 'id'>>) {
    Object.assign(this, data);
    return this;
  }
  markAsActive() {
    this.isActive = true;
  }
  markAsInActive() {
    this.isActive = false;
  }
}
