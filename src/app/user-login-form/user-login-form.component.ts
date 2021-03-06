// Core modules
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// custom components
import { FetchDataApiService } from '../fetch-api-data.service';

// Material components
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Required fields for the login form
   */
  @Input() userData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchDataApiService,
    public router: Router,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Sends a login request,
   * - saves username to local storage 
   * - saves token to local storage
   * - redirects to the '/movies' endpoint
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log(response)
      localStorage.setItem('username', response.user.Username);
      localStorage.setItem('token', response.token);
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Login successful', 'OK', {
        duration: 3000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000
      })
    })
  }

}
