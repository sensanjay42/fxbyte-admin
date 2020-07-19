import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,private alertService: AlertService,  private router: Router,  private formBuilder: FormBuilder,private Http: HttpClientModule) { }
    registerForm: FormGroup;
    isSubmitted  =  false; 
    submitted = false;
    returnUrl: string;
      

    ngOnInit(): void {

        this.registerForm  =  this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
             mobile: ['', Validators.required]
        });
  }

  get formControls() { return this.registerForm.controls; }
    register() { }

    onSubmit() {
        this.showLoaderImg = true;
        this.submitted = true;
        this.alertService.clear();

        if (this.registerForm.invalid) {
            return;
        }
         else {            
            this.authService.register(this.formControls.username.value, this.formControls.email.value, this.formControls.password.value,this.formControls.mobile.value, )
                .pipe(first())
                .subscribe(
                    data => {
                        if (data.status === true) {
                            this.alertService.success(data.message, 'Success');
                            this.router.navigateByUrl('/');
                        } else {
                            this.alertService.error(data.message, 'Error');
                        }
                    },

                    error => {
                        console.log(error.message);
                        this.alertService.error(error.message, 'Error');                        
                    });
        }


    }

}



