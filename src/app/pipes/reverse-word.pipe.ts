import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseWord'
})
export class ReverseWordPipe implements PipeTransform {

  transform(value: string): string {
    let strArr = value.split('').reverse();
    let str = strArr.join('');
    return str;
  }

}
