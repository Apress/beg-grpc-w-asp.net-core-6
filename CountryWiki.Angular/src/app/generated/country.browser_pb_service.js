// package: CountryService.Browser.v1
// file: country.browser.proto

var country_browser_pb = require("./country.browser_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var country_shared_pb = require("./country.shared_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CountryServiceBrowser = (function () {
  function CountryServiceBrowser() {}
  CountryServiceBrowser.serviceName = "CountryService.Browser.v1.CountryServiceBrowser";
  return CountryServiceBrowser;
}());

CountryServiceBrowser.GetAll = {
  methodName: "GetAll",
  service: CountryServiceBrowser,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: country_shared_pb.CountryReply
};

CountryServiceBrowser.Get = {
  methodName: "Get",
  service: CountryServiceBrowser,
  requestStream: false,
  responseStream: false,
  requestType: country_shared_pb.CountryIdRequest,
  responseType: country_shared_pb.CountryReply
};

CountryServiceBrowser.Update = {
  methodName: "Update",
  service: CountryServiceBrowser,
  requestStream: false,
  responseStream: false,
  requestType: country_shared_pb.CountryUpdateRequest,
  responseType: google_protobuf_empty_pb.Empty
};

CountryServiceBrowser.Delete = {
  methodName: "Delete",
  service: CountryServiceBrowser,
  requestStream: false,
  responseStream: false,
  requestType: country_shared_pb.CountryIdRequest,
  responseType: google_protobuf_empty_pb.Empty
};

CountryServiceBrowser.Create = {
  methodName: "Create",
  service: CountryServiceBrowser,
  requestStream: false,
  responseStream: true,
  requestType: country_shared_pb.CountriesCreationRequest,
  responseType: country_shared_pb.CountryCreationReply
};

exports.CountryServiceBrowser = CountryServiceBrowser;

function CountryServiceBrowserClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CountryServiceBrowserClient.prototype.getAll = function getAll(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CountryServiceBrowser.GetAll, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CountryServiceBrowserClient.prototype.get = function get(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CountryServiceBrowser.Get, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CountryServiceBrowserClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CountryServiceBrowser.Update, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CountryServiceBrowserClient.prototype.delete = function pb_delete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CountryServiceBrowser.Delete, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CountryServiceBrowserClient.prototype.create = function create(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CountryServiceBrowser.Create, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.CountryServiceBrowserClient = CountryServiceBrowserClient;

