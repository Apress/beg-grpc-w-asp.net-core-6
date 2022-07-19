/// <reference lib="webworker" />

import { CountryCreationModel } from "../models/countryCreationModel";
import { UploadResultModel } from "../models/uploadResultModel";

addEventListener('message', ({ data }) => {     

  const file = data as File;
  const reader = new FileReader();
  let result:UploadResultModel = {
    success:false,
    errorMessage: "",
    payload: null,
    isProcessing: true
  };

  let ext = file.name.substr(file.name.lastIndexOf('.') + 1);

  if (ext === "json" && file.type === "application/json") {
      // Read the file
      reader.onloadend = e => {
        try{
          let content = JSON.parse(reader.result.toString());
          result.success = true;
          result.payload = (content as any[]).map(x => new CountryCreationModel(x));
        }
        catch {
          result.errorMessage = "Cannot parse the file or the file is empty";
        }
        finally {
          postMessage(result);
        }
      };
      reader.readAsText(file);
  }
  else {
    result.errorMessage = "Only JSON files are allowed";
    postMessage(result);
  }
});