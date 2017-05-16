"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var common_1 = require("../../../model/common");
var APIService = APIService_1 = (function () {
    function APIService(http) {
        this.http = http;
    }
    APIService.handleError = function (error) {
        if (error instanceof Error) {
            console.error(error);
            return Promise.reject(new Error('API service internal error'));
        }
        var message = error.status && (error.status === 403 && 'Действие запрещено политикой приложения' ||
            error.json instanceof Function && error.json().error ||
            error.text instanceof Function && error.text() ||
            error.status + " - " + error.statusText) || "Unknown API service error: " + error;
        console.error(message);
        return Promise.reject(new Error(message));
    };
    APIService.getAPIurl = function (api, item) {
        if (api === void 0) { api = ''; }
        if (item === void 0) { item = null; }
        var id = item instanceof common_1.Model && item.id.uuid ||
            item instanceof common_1.UUID && item.uuid ||
            item && String(item).trim() || '';
        return (APIService_1.apiRoot + "/" + api + "/" + id).replace(/\/\//, '/');
    };
    APIService.prototype.get = function (model, item) {
        if (item === void 0) { item = null; }
        var api = APIService_1.getAPIurl(model.__api, item);
        return this.http.get(api)
            .toPromise()
            .then(function (response) { return response.json() || null; })
            .then(function (value) { return value && value || Promise.reject({ message: 'Response is empty' }); })
            .then(function (value) {
            if (value instanceof Array)
                return value.map(function (value) { return new model(value); });
            return new model(value);
        })
            .catch(APIService_1.handleError);
    };
    APIService.prototype.update = function (model, item) {
        var api = APIService_1.getAPIurl(model.__api, item);
        return this.http.post(api, item.toString(), APIService_1.options)
            .toPromise()
            .then(function (response) { return response.json() || null; })
            .then(function (value) { return value && value || Promise.reject({ message: 'Response is empty' }); })
            .then(function (value) { return new model(value); })
            .catch(APIService_1.handleError);
    };
    APIService.prototype.delete = function (model, item) {
        var api = APIService_1.getAPIurl(model.__api, item);
        return this.http.delete(api, APIService_1.options)
            .toPromise()
            .then(function (response) { return response.json() || null; })
            .then(function (value) { return value && value || Promise.reject({ message: 'Response is empty' }); })
            .then(function (value) { return (value.sucess !== 'deleted' || value.id !== item.id.uuid) && Promise.reject(value) || void 0; })
            .catch(APIService_1.handleError);
    };
    APIService.prototype.command = function (model, item, command, data) {
        if (data === void 0) { data = null; }
        var api = APIService_1.getAPIurl(model.__api, item) + ("/" + command);
        return this.http.post(api, data && JSON.stringify(data) || item.toString(), APIService_1.options)
            .toPromise()
            .then(function (response) { return response.json() || null; })
            .then(function (value) { return value && value || Promise.reject({ message: 'Response is empty' }); })
            .catch(APIService_1.handleError);
    };
    APIService.prototype.config = function (data) {
        if (data === void 0) { data = null; }
        var api = APIService_1.getAPIurl('config');
        if (!data)
            return this.http.get(api)
                .toPromise()
                .then(function (response) { return response.json() || null; })
                .then(function (value) { return value && value || {}; })
                .catch(APIService_1.handleError);
        return this.http.post(api, data && JSON.stringify(data), APIService_1.options)
            .toPromise()
            .then(function (response) { return response.json() || null; })
            .then(function (value) { return value && value || {}; })
            .catch(APIService_1.handleError);
    };
    return APIService;
}());
APIService.apiRoot = '/api';
APIService.options = new http_1.RequestOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
APIService = APIService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], APIService);
exports.APIService = APIService;
var APIService_1;
//# sourceMappingURL=api.service.js.map