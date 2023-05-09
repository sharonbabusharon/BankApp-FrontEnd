import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransactions:any[],searchTerm:string,propertyname:string):any[] {
    const result:any=[]
    if(!allTransactions||searchTerm==''||propertyname==''){
      return allTransactions
    }else{
      allTransactions.forEach((item:any)=>{
        if(item[propertyname].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
          result.push(item)
        }
      })
    }

    return result;
  }

}
