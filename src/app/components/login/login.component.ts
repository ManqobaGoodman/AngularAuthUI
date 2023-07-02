import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string ="fa-eye-slash";
  loginForm!: FormGroup;
  

  constructor(private fb:  FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) { 

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  HideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text":this.type ="password";
  }

  onLogIn(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.logIn(this.loginForm.value)
      .subscribe({
        next: (res) => {
         // alert(res.message)
          this.toast.success({detail:'Succes',summary:res.message,duration:3000});
          this.loginForm.reset();
          this.router.navigate(['dashbard']);
        },
        error:(err) => {
          //alert(err?.error.message);
          this.toast.error({detail:'Error',summary:err?.error.message,duration:3000});
        }
      })
    }else{
      console.log("Form is invalid");
      ValidateForm.validateAllFormFileds(this.loginForm);
      alert("Your form is invalid");
    }
  }


}
