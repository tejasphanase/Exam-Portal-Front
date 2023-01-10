import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginData={
    username:'',
    passward:''
}
  constructor(private snack:MatSnackBar, private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){

    console.log('login btn clicked');

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
         this.snack.open('Username is required !!','',{

          duration:3000,
         });

         return;
    }

    if(this.loginData.passward.trim()=='' || this.loginData.passward==null)
    {
         this.snack.open('Passward is required !!','',{

          duration:3000,
         });

         return;
    }

    //request to server to generate token

    this.login.generateToken(this.loginData).subscribe(

      (data:any)=>{

        console.log("success")
        console.log(data);

        //login

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);

            console.log(user);

            //redirect....ADMIN : admin-dashbord
            //redirect....NORMAL:normal-dashbord

            if(this.login.getUserRole()=='ADMIN')
            {
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=='NORMAL'){
     
              //  window.location.href='/user-dashbord';
              this.router.navigate(['user-dashbord/0']);
              this.login.loginStatusSubject.next(true);

            }else{
              this.login.logout();
            }


          });
      },
      (error)=>{

        console.log('error !');
        console.log(error);
        this.snack.open('Invalid details !! try again ','',{

          duration: 3000, 
        });
      }
    );

  }

}
