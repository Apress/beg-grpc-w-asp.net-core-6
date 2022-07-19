import { ActionResultModel } from "./actionResultModel";
import { CountryCreationModel } from "./countryCreationModel";

export class UploadResultModel extends ActionResultModel {
    payload: CountryCreationModel[];
    isProcessing: boolean;
}