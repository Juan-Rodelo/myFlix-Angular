import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FetchDataApiService } from '../fetch-api-data.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiData: FetchDataApiService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  /**
   * gets the user
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * backend
   */
  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * opens a modal 
   */
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px'
    })
  }



}