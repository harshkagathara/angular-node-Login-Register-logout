import {	Router } from '@angular/router';
import {  Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {	FormGroup,	FormBuilder,	Validators,	FormControl } from '@angular/forms';
import {	AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
	submitted = false;
	loginForm: FormGroup;
	serverErrorMassege: any;
	constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private AuthenticationService: AuthenticationService) {}

  	ngOnInit() {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
		if(this.AuthenticationService.isLoggedIn()) this.router.navigateByUrl('/');
	}
  	get f() { return this.loginForm.controls; }

	submitLoginForm() {
		this.submitted = true;
		if(this.loginForm.valid) {
			this.AuthenticationService.checkUser(this.loginForm.value).subscribe(
				(res) => {
					this.AuthenticationService.setToken(res['token']);
					this.AuthenticationService.setLogedUser(res['userData']._id);
					this.ngZone.run(() => this.router.navigateByUrl('/'));
				}, (err) => {
					this.serverErrorMassege = err;
				});
		}
	}
}