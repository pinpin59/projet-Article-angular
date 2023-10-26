import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.dataService.login(username, password).subscribe(
        (response:any) => {
          if (response.success) {
            console.log(response)
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.router.navigate(['/']);

          } else {
            console.log('erreur de connection')
          }
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }
}
