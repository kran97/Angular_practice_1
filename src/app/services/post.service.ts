import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, Observable, Subject, take, tap, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<string>();

  constructor(private http: HttpClient, private authServ: AuthenticationService) { }

  printOnScreen(data: any, containerId: string): void {
    let element = document.createElement('li');
    element.innerText = data;
    document.getElementById(containerId)?.appendChild(element);
  }

  createAndStorePosts(inputTitle: string, inputContent: string): Observable<any> {
    const postData: Post = { title: inputTitle, content: inputContent };
    let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty');
    queryParams = queryParams.append('set', 'map');
    queryParams = queryParams.append('key', 'value');
    return this.http.post(
      'https://ng-complete-guide-5f495-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        headers: new HttpHeaders({
          'custom-content-type': 'application/json'
        }),
        params: queryParams,
        observe: 'response'
      }
    ).pipe(catchError(errorData => {
      // console.log("Default error message for post error --> ", errorData.message);
      return throwError(() => new Error("Unable to post data, server error!"));
    }));
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<{ [key: string]: Post}>(
      'https://ng-complete-guide-5f495-default-rtdb.firebaseio.com/posts.json',
      {
        // params: new HttpParams().set('print', 'pretty'),
        responseType: 'json' // by default
      }
    )
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    }),
    catchError(errorData => {
      console.log("Entered CATCHERROR! Here we can process the error and do whatever we want to do with that error.")
      return throwError(() => new Error(errorData.message));
    }));
  }

  clearPosts() {
    return this.http.delete('https://ng-complete-guide-5f495-default-rtdb.firebaseio.com/posts.json');
  }

  deleteOnePost(id: string) {
    return this.http.delete(
      'https://ng-complete-guide-5f495-default-rtdb.firebaseio.com/posts/' + id + '.json',
      {
        observe: 'events'
      }
    ).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          // console.log(event.type);
        } else if (event.type === HttpEventType.Response) {
          // console.log(event.body);
        }
      })
    );
  }

  getBreakingBadCharacrters() {
    return this.http.get('https://www.breakingbadapi.com/api/characters')
  }
}

// function fetchPosts(): Observable<Post[]> {
  // return this.authServ.userSubject.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<{ [key: string]: Post}>(
    //       'https://ng-complete-guide-5f495-default-rtdb.firebaseio.com/posts.json',
    //       {
    //         params: new HttpParams().set('auth', user?.token!),
    //         responseType: 'json' // by default
    //       }
    //     )
    //   }),
    //   map(responseData => {
    //     const postsArray: Post[] = [];
    //     for (const key in responseData) {
    //       if (responseData.hasOwnProperty(key)) {
    //         postsArray.push({ ...responseData[key], id: key });
    //       }
    //     }
    //     return postsArray;
    //   }),
    //   catchError(errorData => {
    //     console.log("Entered CATCHERROR! Here we can process the error and do whatever we want to do with that error.")
    //     return throwError(() => new Error(errorData.message));
    //   })
    // );
// }