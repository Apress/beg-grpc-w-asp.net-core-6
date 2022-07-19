// package: CountryService.Browser.v1
// file: country.browser.proto

import * as country_browser_pb from "./country.browser_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as country_shared_pb from "./country.shared_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CountryServiceBrowserGetAll = {
  readonly methodName: string;
  readonly service: typeof CountryServiceBrowser;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof country_shared_pb.CountryReply;
};

type CountryServiceBrowserGet = {
  readonly methodName: string;
  readonly service: typeof CountryServiceBrowser;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof country_shared_pb.CountryIdRequest;
  readonly responseType: typeof country_shared_pb.CountryReply;
};

type CountryServiceBrowserUpdate = {
  readonly methodName: string;
  readonly service: typeof CountryServiceBrowser;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof country_shared_pb.CountryUpdateRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type CountryServiceBrowserDelete = {
  readonly methodName: string;
  readonly service: typeof CountryServiceBrowser;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof country_shared_pb.CountryIdRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type CountryServiceBrowserCreate = {
  readonly methodName: string;
  readonly service: typeof CountryServiceBrowser;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof country_shared_pb.CountriesCreationRequest;
  readonly responseType: typeof country_shared_pb.CountryCreationReply;
};

export class CountryServiceBrowser {
  static readonly serviceName: string;
  static readonly GetAll: CountryServiceBrowserGetAll;
  static readonly Get: CountryServiceBrowserGet;
  static readonly Update: CountryServiceBrowserUpdate;
  static readonly Delete: CountryServiceBrowserDelete;
  static readonly Create: CountryServiceBrowserCreate;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class CountryServiceBrowserClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAll(requestMessage: google_protobuf_empty_pb.Empty, metadata?: grpc.Metadata): ResponseStream<country_shared_pb.CountryReply>;
  get(
    requestMessage: country_shared_pb.CountryIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: country_shared_pb.CountryReply|null) => void
  ): UnaryResponse;
  get(
    requestMessage: country_shared_pb.CountryIdRequest,
    callback: (error: ServiceError|null, responseMessage: country_shared_pb.CountryReply|null) => void
  ): UnaryResponse;
  update(
    requestMessage: country_shared_pb.CountryUpdateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  update(
    requestMessage: country_shared_pb.CountryUpdateRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: country_shared_pb.CountryIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  delete(
    requestMessage: country_shared_pb.CountryIdRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  create(requestMessage: country_shared_pb.CountriesCreationRequest, metadata?: grpc.Metadata): ResponseStream<country_shared_pb.CountryCreationReply>;
}

