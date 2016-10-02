import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Website } from './website';

@Injectable()
export class GridService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private websitesUrl = 'app/websites';  // URL to web api
    
    constructor(private http: Http) { }
    
    getWebsites(): Promise<Website[]> {
        return this.http.get(this.websitesUrl)
               .toPromise()
               .then(response => response.json().data as Website[])
               .catch(this.handleError);
    }
    
    getWebsite(id: number): Promise<Website> {
        return this.getWebsites()
            .then((websites: Website[]) => websites.find((website: Website) => website.id === id));
    }

    create(website: Website): Promise<Website> {
      return this.http
        .post(this.websitesUrl, JSON.stringify(website), {headers: this.headers})
        .toPromise()
        .then(response => response.json().data as Website)
        .catch(this.handleError);
    }
    
    update(website: Website): Promise<Website> {
        let url = `${this.websitesUrl}/${website.id}`;
        return this.http
        .put(url, JSON.stringify(website), {headers: this.headers})
        .toPromise()
        .then(() => website)
        .catch(this.handleError);
    }
            
    delete(id: number): Promise<void> {
      let url = `${this.websitesUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
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
    
    private handleError(error: any): Promise<any> {
        alert("An error has occurred attempting to perform the operation: " + error.message || error);
        return Promise.reject(error.message || error);
    }

}