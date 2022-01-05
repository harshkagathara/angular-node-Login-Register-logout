import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private AuthenticationService: AuthenticationService

  ) { }

  ngOnInit(): void {
    
  }
  onLogout(){
    this.AuthenticationService.deleteToken();
    this.router.navigate(['/login']);
  }

}
