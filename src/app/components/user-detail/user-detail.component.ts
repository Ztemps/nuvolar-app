import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  public userName: string;
  public userInfo;
  public task$ = [];
  public userRepos;

  constructor(public actRoute: ActivatedRoute,
              public search: SearchService) {
    this.actRoute.params
      .subscribe(params => {
        this.userName = params['username'];
        this.getPageInfo(this.userName).subscribe(values => {
          console.log('values ', values);
          this.setUserInfo([values[0]]);
          this.setUserRepo(values[1]);
        });
      });
   }

   getPageInfo(userName) {
    return Observable.forkJoin(
      this.search.getGitHubUser(userName),
      this.search.getUserRepos(userName)
    );
   }

   setUserInfo(userInfo) {
        this.userInfo = userInfo;
   }

   setUserRepo(userRepos) {
      this.userRepos = userRepos;
   }

}
