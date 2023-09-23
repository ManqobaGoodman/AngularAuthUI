import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPasswordValidetor } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validateform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  constructor(private formBuilder: FormBuilder,private activeedRoute: ActivatedRoute, private resetService: ResetPasswordService, private router: Router ,
     private toast: NgToastService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null,Validators.required],
      comfirmPassword: [null,Validators.required]
    },{
      validator: confirmPasswordValidetor("password","comfirmPassword")
    });

    this.activeedRoute.queryParams.subscribe(val =>{
      this.emailToReset = val['email'];3
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g,'+');

      console.log(this.emailToReset);
      console.log(this.emailToken);
    })
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.comfirmPassword = this.resetPasswordForm.value.comfirmPassword;
      this.resetPasswordObj.emailToken =this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"Success", summary: res.message, duration: 3000});
          this.router.navigate(['/'])
        },
        error: (err) =>{
          this.toast.error({detail:"Errorer", summary: err?.error.message, duration: 5000});
        }
      })
    }else{
      ValidateForm.validateAllFormFileds(this.resetPasswordForm);
    }
  }

}
