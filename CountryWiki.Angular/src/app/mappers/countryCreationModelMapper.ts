import { CountriesCreationRequest, CountryCreationRequest } from "../generated/country.shared_pb";
import { CountryCreationModel } from "../models/countryCreationModel";

export class CountryCreationModelMapper {
    public static Map(countryCreationRequest: CountryCreationRequest, countryCreationModel: CountryCreationModel) {
        if(countryCreationModel === null || countryCreationModel === undefined) 
            return;
        
        countryCreationRequest.setName(countryCreationModel.name);
        countryCreationRequest.setDescription(countryCreationModel.description);
        countryCreationRequest.setAnthem(countryCreationModel.anthem);
        countryCreationRequest.setCapitalcity(countryCreationModel.capitalCity);
        countryCreationRequest.setFlaguri(countryCreationModel.flagUri);
        countryCreationRequest.setLanguagesList(countryCreationModel.languages);
    }

    public static Maps(countriesCreationrequest: CountriesCreationRequest, countriesCreationModel: CountryCreationModel[]) {
        if(countriesCreationModel === null || countriesCreationModel === undefined) 
            return;
        
            countriesCreationModel.map(x => {
                let countryCreationRequest = new CountryCreationRequest();
                CountryCreationModelMapper.Map(countryCreationRequest, x)
                countriesCreationrequest.addCountries(countryCreationRequest);
            });
    }
}