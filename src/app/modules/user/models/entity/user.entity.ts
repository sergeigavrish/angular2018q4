import { User } from "../interface/user.interface";

export class UserEntity implements User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string
  ) { }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
