import {JSONObject} from 'ts-json-object'

export class CountryCreationModel extends JSONObject {
    @JSONObject.required
    name: string;

    @JSONObject.required
    description: string;

    @JSONObject.required
    capitalCity: string;

    @JSONObject.required
    anthem: string;

    @JSONObject.required
    flagUri: string;

    @JSONObject.required
    languages: number[];
}