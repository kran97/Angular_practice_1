import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  /**
   * By default pipes are pure, i.e. pure: true .
   * Pure means the pipe is triggered only when the input reference changes,
   * impure means pipe will be triggered when there is any kind of change (ex: in array or object values).
   */
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
