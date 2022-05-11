import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../../shared/utils/validators';

@Component({
  selector: 'form-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      // this.authService.createUser(value.email, value.password)
      // .then(() => {
      //   this.router.navigate(['/auth/login']);
      // });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword, Validators.pattern(/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/)]],
      confirmPassword: ['', Validators.required],
      type: ['company', [ Validators.required]],
      companyName: ['', [ Validators.required]]
    },
    {
      Validators: MyValidators.matchPassword,
    });

      this.typeField.valueChanges
      .subscribe(value =>{
        console.log(value);
        if(value === 'company'){
          this.companyNameField.setValidators([Validators.required]);
        }else{
          this.companyNameField.setValidators(null);
        }
        this.companyNameField.updateValueAndValidity();
      });

  }

  get typeField(){
    return this.form.get('type');
  }

  get companyNameField() {
    return this.form.get('companyName');
  }

}