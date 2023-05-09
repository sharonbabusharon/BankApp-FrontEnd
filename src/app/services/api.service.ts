import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //api call for register

  register(acno:any,username:any,password:any){
    const body={
      acno,username,password
    }
    return this.http.post("http://localhost:5000/register",body)

  }
  //api call for login
  login(acno:any,password:any){
    const body={
      acno,password
    }
    return this.http.post("http://localhost:5000/login",body)
  }

    //apppend token to the req header
    appendToken()
    {
  
    //get token from localstorage
    let token=localStorage.getItem('token')
  
    //create http headers
    let headers =new HttpHeaders()
    if(token){
      headers=headers.append('verify-token',token)
      options.headers=headers//overloading
    }
  return options
  }

  //api call to get balance
  getBalance(acno:any){
    return this.http.get('http://localhost:5000/getbalance/'+acno,this.appendToken())
  }

  //api call for fund transfer

  fundTransfer(toAcno:any,password:any,amount:any){
    const body={
    toAcno,
    password,
    amount
    }
    return this.http.post('http://localhost:5000/fund-transfer',body,this.appendToken())

  }

  //api call for getTransaction History

  getTransactionHistory(){
    return this.http.get('http://localhost:5000/getTransactionHistory',this.appendToken())
  }

  //delete user account
  deleteUserAccount(){
    return this.http.delete("http://localhost:5000/delete-account",this.appendToken())
  }

}
