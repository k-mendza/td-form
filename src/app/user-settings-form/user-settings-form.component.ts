import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  originalSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Example notes'
  };

  userSettings: UserSettings = {...this.originalSettings};
  public postError = false;
  public postErrorMessage = '';
  public subscriptionTypes: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dataService.postUserSettings(this.userSettings).subscribe(
        result => console.log(result),
       error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix above errors';
    }
  }

  onHttpError(errorResponse: any): void {
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

}
