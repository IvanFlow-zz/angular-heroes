import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private rotuer: Router,
    private authService: AuthService ) { }

  login(){
    //Ir a backend
    //Un usuario
    this.authService.login()
    .subscribe( auth =>{
      console.log(auth);
      if(auth.id){
        this.rotuer.navigate(['./heroes'])
      }
    });
  };

  ingresarSinLogin(){
    this.authService.logout();
    this.rotuer.navigate(['./heroes']);
  }

}
