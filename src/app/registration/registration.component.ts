import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  
  RegisterErrorMEessage:String='';
  RegisterSuccessMessage:String='';

  constructor(private registerFb:FormBuilder,private api:ApiService, private RegisterRouter:Router){}

  registerForm=this.registerFb.group({//group
  //formArray
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[0-9A-Za-z]*')]]

})
//form control
register(){
 
if(this.registerForm.valid){
  console.log(this.registerForm.value)
   let uname=this.registerForm.value.username;
   let acno=this.registerForm.value.acno;
   let password=this.registerForm.value.password;
  
   this.api.register(acno,uname,password).subscribe((result:any)=>{
    //alert(result.message)
    this.RegisterSuccessMessage=result.message
    //loading timeout
    setTimeout(()=>{
      this.RegisterRouter.navigateByUrl("")
    },1800)
   
   },
   (result:any)=>{
    this.RegisterErrorMEessage=result.error.message;
    
   })

   //time interval
   setTimeout(()=>{
    this.registerForm.reset()
    this.RegisterErrorMEessage=''
   },2000)
}
else{
alert("invalid inputs")
}


}

}
