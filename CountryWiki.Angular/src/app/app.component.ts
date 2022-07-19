import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UploadResultModel } from './models/uploadResultModel';
import { CountryModel } from './models/countryModel';
import { CountryService } from './services/countryService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'CountryWiki.Angular';
  public countries: CountryModel[] = [];
  public errorMessage: string = null;
  public uploadResult: UploadResultModel = null;
  public isUploading: boolean = false;
  private _file: File = null;
  
  constructor(private _countryService: CountryService, private _router: Router) {

  }

  public ngOnInit() {
    this._countryService.GetAll(this.countries);
  }

  public onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._file = (target.files as FileList)[0];
  }

  public onUpload(): void {
    this.isUploading = this._file != null;
    const worker = new Worker(new URL('./workers/upload-file.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      this.uploadResult = data;
      if (this.uploadResult.success) {
        this._countryService.Create(this.uploadResult.payload, this.uploadResult, () => {
          this.countries = [];
          this._countryService.GetAll(this.countries);
        });
      } else {
        this.uploadResult.isProcessing = false;
      }
      this.isUploading = false;
      this._router.navigate(['']);
    };
    worker.postMessage(this._file);
  }

  public onUpdate(id: number): void {
      this._router.navigate(['edit', id]);
  }

  public onDelete(country: CountryModel): void {
    this._countryService.Delete(country.id);
    this.countries = this.countries.filter(c => c !== country);
  }
}