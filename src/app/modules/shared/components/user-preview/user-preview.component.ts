import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user/models/interface/user.interface';
import { UserEntity } from 'src/app/modules/user/models/entity/user.entity';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user = new UserEntity('1', 'Han', 'Solo');
  }

  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

}
