import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input() users;
  @Output() selectUser = new EventEmitter<Object>();

  constructor() { }

  onClickUser(user: Object) {
    this.selectUser.emit(user);
  }

}
