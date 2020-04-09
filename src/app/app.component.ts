import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-shop';
  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    auth.user$.subscribe(user => {
      if (!user) return;
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
