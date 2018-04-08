import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  private gitHubUrl: string = 'https://api.github.com/';
  private usersQuery: string = 'search/users?q=';
  private users: string = 'users/';
  private repos: string = '/repos';
  private loginNameUsersQueryFilter: string = '+in:>login+type:>user';

  debounceSearch(searchTerm$) {
    return searchTerm$.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(user => {
         if (!user) {
           return Observable.of();
         } else {
          return this.getGitHubMembers(user);
         }
      });
  }

  getGitHubMembers(user) {
        return this.http
          .get(`${this.gitHubUrl}${this.usersQuery}${user}${this.loginNameUsersQueryFilter}`);
  }

  getGitHubUser(userName) {
    return this.http
          .get(`${this.gitHubUrl}${this.users}${userName}`);
  }

  getUserRepos(userName) {
    return this.http
          .get(`${this.gitHubUrl}${this.users}${userName}${this.repos}`);
  }
}
