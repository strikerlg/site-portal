import {Pipe, PipeTransform} from '@angular/core';
  
@Pipe({name: 'subtractor'})
export class SubtractPipe implements PipeTransform {
  transform(value:number, args:string[]) : any {
    return 9999-value;
  }
}