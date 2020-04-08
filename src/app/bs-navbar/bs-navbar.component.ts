import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;

  constructor(private auth: AuthService, private router: Router) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    // TODO: if current route is not guarded, then stay in the current location;
    // if it is protected, then redirect to login page
    this.router.navigate(['/login']);
  }
}
