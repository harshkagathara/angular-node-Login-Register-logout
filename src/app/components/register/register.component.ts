import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	serverErrorMassege: any;
	submitted = false;
	constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private AuthenticationService: AuthenticationService, ) {}
	ngOnInit() {
		this.registerForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			confirm_password: ['', [Validators.required]],
		});
	}
  get f() { return this.registerForm.controls; }

	submitRegisterForm() {
		this.submitted = true;
		if(this.registerForm.valid) {
			this.AuthenticationService.createUser(this.registerForm.value).subscribe(
				(res) => {
					this.ngZone.run(() => this.router.navigateByUrl('/login'));
				}, (err) => {
					this.serverErrorMassege = err;
				});
		}
	}
}
