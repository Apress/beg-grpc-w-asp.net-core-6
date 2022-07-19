import { CountryReply } from "../generated/country.shared_pb";
import { CountryModel } from "../models/countryModel";

export class CountryReplyMapper {
    public static Map(country: CountryModel, countryReply: CountryReply.AsObject) {
        if (countryReply === null || countryReply === null)
        return;
    
        country.id = countryReply.id;
        country.name = countryReply.name;
        country.description = countryReply.description;
        country.capitalCity = countryReply.capitalcity;
        country.flagUri = countryReply.flaguri;
        country.anthem = countryReply.anthem;
        country.languages = countryReply.languagesList;
    }
}