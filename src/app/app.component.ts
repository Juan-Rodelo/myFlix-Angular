// Core modules
import { Component } from '@angular/core';

// components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

// material components
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Film-Spelunker-Angular-client';

}
  // constructor(public dialog: MatDialog) { }
  // // This is the function that will open the dialog when the signup button is clicked  
  // openUserRegistrationDialog(): void {
  //   this.dialog.open(UserRegistrationFormComponent, {
  //     // Assigning the dialog a width
  //     width: '280px'
  //   });
  // }
}
