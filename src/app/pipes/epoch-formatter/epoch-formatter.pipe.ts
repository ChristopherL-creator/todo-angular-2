import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochFormatter'
})
export class EpochFormatterPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string { 
    // ha una sola funione che prende una value, e degli arogmenti, e reisituisce un ritorno 
    const milliseconds = value * 1000; 
    const date = new Date(milliseconds); 
    // return date.getDate() + '/' + (date.getMonth()+ 1)  + '/' + date.getFullYear(); 
    const options = {weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric'} as any; 
                    
    return date.toLocaleDateString(undefined, options);
  }

}
