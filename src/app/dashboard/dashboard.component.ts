import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{

  user:string=''
  currentAcno:string=''
  balance:number=0
  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''
  logoutStatus:boolean=false
  //for delete account
  acno:any
  deleteConformStatus:boolean=false
  


  constructor(private TransferFb:FormBuilder,private api:ApiService ,private dashboardRouter:Router){}

//to get current user name

  ngOnInit(): void {

    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.dashboardRouter.navigateByUrl('')
    }

    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||''
    }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem("currentAcno")||''
    }
  }

  TransferForm=this.TransferFb.group({
    acnumber:["",[Validators.required,Validators.pattern('[0-9]*')]],
    amount:["",[Validators.required,Validators.pattern('[0-9]*')]],
    password:["",[Validators.required,Validators.pattern('[0-9A-Za-z]*')]]
  })

  isCollapse:boolean=true;

collapse(){
  this.isCollapse=!this.isCollapse
}

//get balance
getBalance(){
  //api call to get balance
  this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
    this.balance=result.balance
    console.log(this.balance);
    
  })

}

  //calling fundtransfer function defined in the api
  fundTransfer(){

    //check if the transfer form is valid
    if(this.TransferForm.valid){

      //get details from fund transfer group
      let creditAcno=this.TransferForm.value.acnumber
      let amount=this.TransferForm.value.amount
      let password=this.TransferForm.value.password


       this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
          console.log(result);
          this.fundTransferSuccessMsg=result.message

          setTimeout(()=>{
            this.TransferForm.reset()
            this.fundTransferSuccessMsg=''
            },2000)
          
       },
       (result:any)=>{
        console.log(result.error.message);
        this.fundTransferErrorMsg=result.error.message

        setTimeout(()=>{
        this.TransferForm.reset()
        this.fundTransferErrorMsg=''
        },1000)
        
       }

       //reset form
    

       )
    }else{
      alert("please provide valid data")
    }
    
  }

  resetForm(){
    this.TransferForm.reset()
  }

  //for logout
  logout(){
    this.logoutStatus=true
    localStorage.clear()
    setTimeout(()=>{
      this.dashboardRouter.navigateByUrl('')

    },2000)
  }

  deleteAccount(){
    //data to be shared with child
    this.acno=localStorage.getItem('currentAcno')
     this.deleteConformStatus=true
  }


  canceldelete(){
    this.acno=''
    this.deleteConformStatus=false
  }

  deleteFromParent(){
    this.api.deleteUserAccount().subscribe((result:any)=>{
      localStorage.clear()
      this.dashboardRouter.navigateByUrl('')
    })
  }

}
