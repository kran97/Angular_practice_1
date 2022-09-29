import { Component, OnInit } from '@angular/core';
import { concatAll, concatMap, delay, from, map, mergeMap, Observable, of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit {

  source = from(['Tech', 'Comedy', 'News']);

  constructor(private serv: PostService) { }

  getData(data: string): Observable<string> {
    return of(data + ' Video Uploaded').pipe(delay(2000));
  }

  ngOnInit(): void {
    // Ex - 01 Concat
    this.source.pipe(
      map(res => this.getData(res))
    )
    .subscribe(res => {
      // console.log(res);
      this.serv.printOnScreen(res, 'elContainer1');
    });

    // Ex - 02 Map + ConcatAll
    // this.source.pipe(
    //   map(res => this.getData(res)),
    //   concatAll()
    // )
    // .subscribe(res => {
    //   console.log(res);
    //   this.serv.printOnScreen(res, 'elContainer2');
    // });

    // Ex - 03 MergeMap
    this.source.pipe(
      mergeMap(res => this.getData(res))
    )
    .subscribe(res => {
      console.log(res);
      this.serv.printOnScreen(res, 'elContainer2');
    });

    // Ex - 03 ConcatMap
    this.source.pipe(
      concatMap(res => this.getData(res))
    )
    .subscribe(res => {
      console.log(res);
      this.serv.printOnScreen(res, 'elContainer3');
    });
  }

}
