import { grpc } from "@improbable-eng/grpc-web";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { CountryServiceBrowser } from "../generated/country.browser_pb_service";
import { CountriesCreationRequest, CountryCreationReply, CountryIdRequest, CountryReply, CountryUpdateRequest } from "../generated/country.shared_pb";
import { CountryCreationModelMapper } from "../mappers/countryCreationModelMapper";
import { CountryReplyMapper } from "../mappers/countryReplyMapper";
import { CountryCreationModel } from "../models/countryCreationModel";
import { CountryModel } from "../models/countryModel";
import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { CountryUpdateModel } from "../models/countryUpdateModel";
import { UploadResultModel } from "../models/uploadResultModel";

@Injectable()
export class CountryService {
  public GetAll(countries: CountryModel[]): void {
      grpc.invoke(CountryServiceBrowser.GetAll, {
        request: new Empty(),
        host: environment.host,
        onMessage: (countryReply: CountryReply) => { 
          let country = new CountryModel();
          CountryReplyMapper.Map(country, countryReply.toObject())
          countries.push(country);
        },
        onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => this.onEnd(code, msg, trailers, "All countries have been downloaded")
      });
  }

  public Create(countriesToCreate: CountryCreationModel[], uploadResult: UploadResultModel, callback: Function): void {
      let countriesCreationRequest = new CountriesCreationRequest();
      CountryCreationModelMapper.Maps(countriesCreationRequest, countriesToCreate);
      grpc.invoke(CountryServiceBrowser.Create, {
        request: countriesCreationRequest,
        host: environment.host,
        onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
          uploadResult.isProcessing = false;
          callback();
          this.onEnd(code, msg, trailers, "All countries have been created")
        }
      });
  }

  public Delete(id: number): void {
    let request = new CountryIdRequest();
    request.setId(id);
    grpc.invoke(CountryServiceBrowser.Delete, {
      request: request,
      host: environment.host,
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => this.onEnd(code, msg, trailers, `Country with Id ${id} has been deleted`)
    });
  }

  public Get(id: number, country: CountryModel): void {
    let request = new CountryIdRequest();
    request.setId(id);
    grpc.invoke(CountryServiceBrowser.Get, {
      request: request,
      host: environment.host,
      onMessage: (countryReply: CountryReply) => {
        CountryReplyMapper.Map(country, countryReply.toObject());
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => this.onEnd(code, msg, trailers, `Country with Id ${id} was successfully found`)
    });
  }

  public Update(countryUpdateModel: CountryUpdateModel): void {
    let request = new CountryUpdateRequest();
    request.setId(countryUpdateModel.id);
    request.setDescription(countryUpdateModel.description);
    grpc.invoke(CountryServiceBrowser.Update, {
      request: request,
      host: environment.host,
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => this.onEnd(code, msg, trailers, `Country with Id ${countryUpdateModel.id} was successfully updated`)
    });
  }

  private onEnd(code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata, endMessage: String): void  {
    if (code == grpc.Code.OK) {
      console.log(endMessage)
    } else {
      console.log(`Hit an error status: ${grpc.Code[code]}`);
      if (msg) {
        console.log(`message: ${msg}`);
      }
       trailers.forEach(trailer => {
        console.log(`With the trailer ${trailer}: ${trailers.get(trailer)}`);
      });
    }
  }
}