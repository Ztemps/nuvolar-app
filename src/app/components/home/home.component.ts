import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('searchInput') searchInput: ElementRef;

  users: any = [];
  userName$ = new Subject<string>();

  constructor(public search: SearchService,
              public router: Router) {
    this.search.debounceSearch(this.userName$)
      .subscribe( ({items}) => {
        this.users = items;
      });
  }

  goToUserDetail(user) {
    this.router.navigate(['/user-detail', user.login]);
  }

  checkInput(value) {
    if (!value) {
      this.users = [];
    }
  }

}
