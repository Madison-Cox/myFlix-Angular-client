import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /**
   * Send the form inputs to the backend via API call
   * @function registerUser
   */

  registerUser(): void {
    console.log('User Data', this.userData)
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        console.log('Success', result);
        this.dialogRef.close();
        console.log('Login Success', result);
        this.snackBar.open(result.Email, "Email", {
          duration: 2000,
        });
      }, (err) => {
        console.log('Error while login', err)
        this.snackBar.open(err, 'OK', {
          duration: 2000,
        });
      });
  }


}
