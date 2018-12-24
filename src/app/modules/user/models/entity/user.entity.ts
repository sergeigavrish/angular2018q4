import { User } from '../interface/user.interface';

export class UserEntity implements User {
  id: string;
  firstName: string;
  lastName: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
