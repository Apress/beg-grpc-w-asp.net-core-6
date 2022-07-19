// package: 
// file: country.shared.proto

import * as jspb from "google-protobuf";

export class CountryReply extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getFlaguri(): string;
  setFlaguri(value: string): void;

  getAnthem(): string;
  setAnthem(value: string): void;

  getCapitalcity(): string;
  setCapitalcity(value: string): void;

  clearLanguagesList(): void;
  getLanguagesList(): Array<string>;
  setLanguagesList(value: Array<string>): void;
  addLanguages(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountryReply.AsObject;
  static toObject(includeInstance: boolean, msg: CountryReply): CountryReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountryReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountryReply;
  static deserializeBinaryFromReader(message: CountryReply, reader: jspb.BinaryReader): CountryReply;
}

export namespace CountryReply {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
    flaguri: string,
    anthem: string,
    capitalcity: string,
    languagesList: Array<string>,
  }
}

export class CountryIdRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountryIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CountryIdRequest): CountryIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountryIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountryIdRequest;
  static deserializeBinaryFromReader(message: CountryIdRequest, reader: jspb.BinaryReader): CountryIdRequest;
}

export namespace CountryIdRequest {
  export type AsObject = {
    id: number,
  }
}

export class CountryUpdateRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountryUpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CountryUpdateRequest): CountryUpdateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountryUpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountryUpdateRequest;
  static deserializeBinaryFromReader(message: CountryUpdateRequest, reader: jspb.BinaryReader): CountryUpdateRequest;
}

export namespace CountryUpdateRequest {
  export type AsObject = {
    id: number,
    description: string,
  }
}

export class CountriesCreationRequest extends jspb.Message {
  clearCountriesList(): void;
  getCountriesList(): Array<CountryCreationRequest>;
  setCountriesList(value: Array<CountryCreationRequest>): void;
  addCountries(value?: CountryCreationRequest, index?: number): CountryCreationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountriesCreationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CountriesCreationRequest): CountriesCreationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountriesCreationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountriesCreationRequest;
  static deserializeBinaryFromReader(message: CountriesCreationRequest, reader: jspb.BinaryReader): CountriesCreationRequest;
}

export namespace CountriesCreationRequest {
  export type AsObject = {
    countriesList: Array<CountryCreationRequest.AsObject>,
  }
}

export class CountryCreationRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getFlaguri(): string;
  setFlaguri(value: string): void;

  getAnthem(): string;
  setAnthem(value: string): void;

  getCapitalcity(): string;
  setCapitalcity(value: string): void;

  clearLanguagesList(): void;
  getLanguagesList(): Array<number>;
  setLanguagesList(value: Array<number>): void;
  addLanguages(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountryCreationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CountryCreationRequest): CountryCreationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountryCreationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountryCreationRequest;
  static deserializeBinaryFromReader(message: CountryCreationRequest, reader: jspb.BinaryReader): CountryCreationRequest;
}

export namespace CountryCreationRequest {
  export type AsObject = {
    name: string,
    description: string,
    flaguri: string,
    anthem: string,
    capitalcity: string,
    languagesList: Array<number>,
  }
}

export class CountryCreationReply extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountryCreationReply.AsObject;
  static toObject(includeInstance: boolean, msg: CountryCreationReply): CountryCreationReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountryCreationReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountryCreationReply;
  static deserializeBinaryFromReader(message: CountryCreationReply, reader: jspb.BinaryReader): CountryCreationReply;
}

export namespace CountryCreationReply {
  export type AsObject = {
    id: number,
    name: string,
  }
}

