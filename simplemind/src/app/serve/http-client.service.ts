import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  restServer: string; // 默认为public
  http: any;

  constructor(Http: HttpClient) {
    this.http = Http;
    this.restServer = '';
  }
  public get(url: string, params?: Object, cb?: Function, options?: Object) {
    // console.log('get:start');
    this.http.get(url, { headers: options, params: this.setParams(params) })
      .subscribe((res: any) => {
        // console.log('get:end', res);
        cb(res);
      });
  }

  public post(url: string, data?: Object, cb?: Function, options?: Object) {
    // console.log('post:start', this.setParams(data));
    this.http.post(url, this.setParams(data), options)
      .subscribe((res: any) => {
        // console.log('post:end', res);
        cb(res);
      });
  }

  public put(url: string, data?: Object, cb?: Function, options?: Object) {
    // console.log('put:start');
    this.http.put(url, this.setParams(data), options)
      .subscribe((res: any) => {
        // console.log('put:end', res);
        cb(res);
      });
  }

  public delete(url: string, params?: Object, cb?: Function, options?: Object) {
    this.http.delete(url, { headers: options, params: this.setParams(params) })
      .subscribe((res: any) => {
        // console.log('delete:end', res);
        cb(res);
      });
  }

  setParams(params) {
    let httpParams = new HttpParams();
    const uid = sessionStorage.getItem('access_token');
    if (uid) {
      httpParams = httpParams.set('uid', uid);
    }
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    console.log(httpParams)
    return httpParams
  }
}
