import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //for error message
  loginErrorMsg:String=''
  loginSucessMsg:String=''

  constructor(private loginFb:FormBuilder ,private api:ApiService,private HomeRouter:Router){}

  loginForm=this.loginFb.group({//group
    //formarray
    acnumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[0-9A-Za-z]*')]]
  })
//form control

login(){

  if(this.loginForm.valid){
    let acno=this.loginForm.value.acnumber;
    let password=this.loginForm.value.password;
    // alert( acno+ " "+ password)
    //make an api for login
    this.api.login(acno,password).subscribe((result:any)=>{

      localStorage.setItem('currentUser',result.currentUser)

      //set token in localstorage

      localStorage.setItem('token',result.token)

      //store acno in localstorage
      localStorage.setItem('currentAcno',result.currentAcno)

      

      

      this.loginSucessMsg=result.message
      setTimeout(()=>{
        this.HomeRouter.navigateByUrl("/dashboard")
      },1800)

 
    },
    //if response is 401
    (result:any)=>{
        //error message
        this.loginErrorMsg=result.error.message
    })

    setTimeout(()=>{
      this.loginForm.reset()
      this.loginErrorMsg=''
    },2000)

  }else{
    alert("Invalid Input");
    
  }

  
}
 

}
