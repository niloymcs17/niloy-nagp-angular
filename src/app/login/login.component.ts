import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGaurdService } from '../service/auth-gaurd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = this.fb.group({
    user: ['', Validators.required],
    pass: ['', Validators.required],
  });

  loginError = false;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthGaurdService) { }

  ngOnInit(): void {
  }

  login() {
    const feilds = this.profileForm;
    if (feilds.valid) {
      if (this.auth.login(feilds.get('user')?.value, feilds.get('pass')?.value)) {
        // const url = localStorage.getItem('redirect');
        // url ? this.router.navigate([url]) : this.router.navigate(['/product']);
        this.router.navigate(['/product']);
      } else {
        this.loginError = true;
      }
    }
  }

  findError(value: string): string {
    if (this.profileForm.get(value)?.hasError) {
      return "Input is required!";
    } else {
      return '';
    }
  }
}
