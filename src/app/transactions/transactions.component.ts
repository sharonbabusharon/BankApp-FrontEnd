import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import  jspdf from 'jspdf'; 
import 'jspdf-autotable'


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{

  transaction:any=[]
  searchTerm:string=''
  
  constructor(private api:ApiService){}

  ngOnInit(): void {
      this.api.getTransactionHistory().subscribe((result:any)=>{
        console.log(result);
        this.transaction=result.transaction
        
      },
      
    (result:any)=>{
      console.log(result.error.message);
      
    }
      )
  }


  //generate pdf

  generatePdf(){
    //step 1:create an object for jspdf
    var pdf =new jspdf
    //2:setup title row for the table
    let thead=['Type','From Account' , 'To Account','Amount']

    let tbody=[]
    //3:setup pdf properties
    pdf.setFontSize(16)
    pdf.text('Mini Statement',15,10)
    pdf.setFontSize(12)
    pdf.setTextColor(99)

    //4:to display as table, need  to convert array of objects to nested array
    for (let item of this.transaction){
      let temp=[item.type,item.fromAcno,item.toAcno,item.amount]
      tbody.push(temp)//nested array

    }

    //5:convert nested array to table using
    (pdf as any).autoTable(thead,tbody,{startY:15})

    //6:tomopen pdf in new tab
    pdf.output('dataurlnewwindow')

    //7:to download as pdf file
    pdf.save('Transaction History.pdf')
  }

}
