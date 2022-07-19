import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ActionResultModel } from '../models/actionResultModel';
import { CountryModel } from '../models/countryModel';
import { CountryUpdateModel } from '../models/countryUpdateModel';
import { CountryService } from '../services/countryService';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public country: CountryModel = new CountryModel();
  public actionResult: ActionResultModel = null;
  private static readonly _errorValidationMessage = "Description is must be between 20 and 200 characters";

  constructor(private _countryService: CountryService, 
              private _route: ActivatedRoute, 
              private _router: Router) {
  }

  ngOnInit(): void {
    this._route.params.subscribe(p => {
      let id = p["id"] as number;
      this._countryService.Get(id, this.country);
    });
  }

  public onChange(event: Event): void {
    let description = event as unknown as string;
    this.country.description = description
  }

  public onUpdate(): void {
    if (this.country.description.length > 200 || this.country.description.length < 20) {
      this.actionResult = <ActionResultModel>({
        success: false,
        errorMessage: EditComponent._errorValidationMessage
      });
    }
    else {
      this.actionResult = <ActionResultModel>({
        success: true,
        errorMessage: ""
      });
      this._countryService.Update(<CountryUpdateModel>({
        id: this.country.id,
        description: this.country.description
      }));
      this._router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
  }
}