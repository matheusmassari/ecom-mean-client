import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@eshop/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',  
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
