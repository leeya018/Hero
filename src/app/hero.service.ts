import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  private headers = new Headers({ 'content-type': 'application-json' });

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    // const log = console.log;
    // log(this);//HeroService {http: Http, heroesUrl: "api/heroes"}
    // log(this.http);//Http {_backend: InMemoryBackendService, _defaultOptions: BaseRequestOptions}
    // log(this.http._backend);//InMemoryBackendService {injector: AppModuleInjector, inMemDbService: inMemoryDataService, config: InMemoryBackendConfig, db: Object, passThruBackend: undefined}
    // log(this.http._backend.inMemDbService)//inMemoryDataService {}
    // log(this.http.get(this.heroesUrl));//return object with source (Observable) property and in the source ._subscribe function

    return this.http.get(this.heroesUrl).toPromise().then((response) => {
      const log = console.log;
      // log(response);//Response {_body: Object, status: 200, ok: true, statusText: "OK", headers: Headers…}
      //response._body is same as response.json() ->   Object {data: Array(10)}
      //response.headers return : Headers {_headers: Map(1), _normalizedNames: Map(1)}
      //response.headers._headers returnn :   Map(1) {"content-type" => ["application/json"]}
      // log("-------------------------------------------------------------------------");
      // log(response.json());//Object {data: Array(10)}
      // log("-------------------------------------------------------------------------")
      log(response.json().data);//[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]
      log("-------------------------------------------------------------------------")
      // log(response.json().data as Hero[]);//[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]
      // log("-------------------------------------------------------------------------")
      return response.json().data as Hero[];
    }

    )
      .catch(this.handleError);
    // this.http.get(this.heroesUrl)  -   this is an observable because of the get()
    //toPromise()  -   is converting the Observable to a Promise
    // then()  -  is acallback extracting data from json -> response.json().data

  }

  handleError(error: any): Promise<any> {
    console.error('an error occure', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url).toPromise().then(response => response.json().data as Hero).catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), { headers: this.headers }).toPromise().
      then((res) => { //no need the res here
        const log = console.log;
        log(res);//do not return data in body
        log("-------------------------------------------------------------------------")
        log(hero);
        log("-------------------------------------------------------------------------")
        return hero;
      }).catch(this.handleError);
    //put -  function  that gets 3 parameters : url(for identification),json of obj(for body response), headers(for content-type of response)   
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => {
        var log = console.log;
        log(res);
        log("================================================================================");
        log(res.json());
        log("================================================================================");
        log(res.json().data);
        log("================================================================================");
        log(this.getHeroes());
        return res.json().data as Hero;
        //when I am invoking POST method the data is saved in sever no matterwhat I did in the then() function (in case I returning null)
        //the code in the then() function is only to return the calling method add(name) in Heroes.component the Hero
        // return { id: 11, name: 'LEE' };  // if I will use this so the LEE Hero will be pushed to array
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers }).
      toPromise().then((res) => {
        return null;
      }).catch(this.handleError);
  }
  //then()  - inside the '()' we get the responese from the http request - thie response will come back as a null



}