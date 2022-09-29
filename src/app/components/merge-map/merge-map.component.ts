import { Component, OnInit } from '@angular/core';
import { from, map, mergeAll, mergeMap, Observable, of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {

  source = from(['Tech', 'Comedy', 'News']);

  constructor(private serv: PostService) { }

  getData(data: string): Observable<string> {
    return of(data + ' Video Uploaded');
  }

  ngOnInit(): void {
    // Ex - 01 Map
    this.source.pipe(
      map(res => this.getData(res))
    )
    .subscribe(res => {
      // res.subscribe(res2 => {
      // });
      // console.log(res)
      this.serv.printOnScreen(res, 'elContainer1');
    });

    // Ex - 02 Map + MergeAll
    this.source.pipe(
      map(res => this.getData(res)),
      mergeAll()
    )
    .subscribe(res => {
      // console.log(res)
      this.serv.printOnScreen(res, 'elContainer2');
    });

    // Ex - 03 MergeMap
    this.source.pipe(
      mergeMap(res => this.getData(res))
    )
    .subscribe(res => {
      console.log(res)
      this.serv.printOnScreen(res, 'elContainer3');
    });
  }

}
