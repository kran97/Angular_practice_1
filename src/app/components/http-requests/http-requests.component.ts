import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { map, Subscription, tap } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { DynamicComponentHelperDirective } from 'src/app/directives/dynamic-component-helper.directive';

@Component({
  selector: 'app-http-requests',
  templateUrl: './http-requests.component.html',
  styleUrls: ['./http-requests.component.scss']
})
export class HttpRequestsComponent implements OnInit, OnDestroy {

  title!: string;
  content!: string;

  loadedPosts: Post[] = [];
  isFetching = false;
  isError = null;
  postError?: string;

  @ViewChild(DynamicComponentHelperDirective) dynamicCompHelper?: DynamicComponentHelperDirective;

  private errSubscription?: Subscription;
  private closeSub?: Subscription;

  constructor(private postService: PostService, private compFacRes: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.errSubscription = this.postService.error.subscribe(errMsg => {
      this.postError = errMsg;
      this.showErrorAlert(errMsg);
    })
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData.title, postData.content)
    .subscribe(response => {
      // console.log(response);
    }, error => {
      this.postService.error.next(error.message);
    });
  }

  onFetchPosts(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.isFetching = true;
    this.postService.fetchPosts()
    // .pipe(map((data) => {
    //   data.map((d) => d.id+="---HuHa")
    //   return data
    // }))
    // .pipe(tap((data) => console.log(data)))
    .subscribe(posts => {
      this.isFetching = false;
      this.isError = null;
      this.loadedPosts = posts;
    }, (error) => {
      console.error("Error occurred: ", error);
      this.isFetching = false;
      this.isError = error;
    });
  }

  onClearPosts(): void {
    this.postService.clearPosts().subscribe((response) => {
      // console.log(response); // returns null
      this.loadedPosts = [];
    }, (error) => {
      console.error(error);
    }, () => {
      this.fetchPosts();
    });
  }

  deletePost(id: string) {
    this.postService.deleteOnePost(id).subscribe((res) => {
      console.log(res); // returns null
      this.fetchPosts();
    }, (err) => {
      console.error(err);
    });
  }

  handleError(): void {
    this.isError = null;
    this.postError = '';
  }

  private showErrorAlert(message: string) {
    /** Wrong way as it doesn't wire it with View of Angular and Component factory. */
    // const alertComp = new AlertComponent();

    /** Right way (USED IN ANGULAR 9 AND ABOVE) */
    // const componentRef = this.dynamicCompHelper?.viewContRef.createComponent(AlertComponent);

    /** Right way (USED TILL ANGULAR 8) */
    const compFactory = this.compFacRes.resolveComponentFactory(AlertComponent);
    this.dynamicCompHelper?.viewContRef.clear();
    const componentRef = this.dynamicCompHelper?.viewContRef.createComponent(compFactory);

    componentRef!.instance.message = message;
    this.closeSub = componentRef!.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      this.dynamicCompHelper?.viewContRef.clear();
    })
  }

  ngOnDestroy(): void {
    this.errSubscription?.unsubscribe();
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
