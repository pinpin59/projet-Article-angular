import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private currentUserKey = 'currentUser';
  currentUser:any;
  constructor(private router: Router){}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem(this.currentUserKey);
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
      console.log(this.currentUser);
    }
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }
}
