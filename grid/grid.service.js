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
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
let GridService = class GridService {
    constructor(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.websitesUrl = 'app/websites'; // URL to web api
    }
    getWebsites() {
        return this.http.get(this.websitesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    getWebsite(id) {
        return this.getWebsites()
            .then((websites) => websites.find((website) => website.id === id));
    }
    create(website) {
        return this.http
            .post(this.websitesUrl, JSON.stringify(website), { headers: this.headers })
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    update(website) {
        let url = `${this.websitesUrl}/${website.id}`;
        return this.http
            .put(url, JSON.stringify(website), { headers: this.headers })
            .toPromise()
            .then(() => website)
            .catch(this.handleError);
    }
    delete(id) {
        let url = `${this.websitesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    // TODO: bulk operations not supported by in mermory api
    /*
    updateAll(websites: Website[]): Promise<Website[]> {
        let url = `${this.websitesUrl}/all`;
        console.log(url);
        return this.http
        .put(url, JSON.stringify(websites), {headers: this.headers})
        .toPromise()
        .then(() => websites)
        .catch(this.handleError);
    }
    */
    handleError(error) {
        alert("An error has occurred attempting to perform the operation: " + error.message || error);
        return Promise.reject(error.message || error);
    }
};
GridService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], GridService);
exports.GridService = GridService;
//# sourceMappingURL=grid.service.js.map