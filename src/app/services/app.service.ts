import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { OrderRequest } from './order-request';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = 'https://cbseventmanagement-api-dot-thermal-wonder-200107.appspot.com/api/User/Get';  // URL to web api
  private data: any;

  constructor(private http: Http) { }

  public setDetails(eventData: any) {
    this.data = eventData;
  }

  public getDetails() {
    return this.data;
  }

  getAllData(url){
    return this.http.get(url)
        .map(data => data.json())
        .catch((err) => err);
  }

  getOrderRequests(): Promise<OrderRequest[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().data as OrderRequest[])
      .catch(this.handleError);
  }

  create(orderRequest: OrderRequest): Promise<OrderRequest> {
    return this.http
    .post(this.url, JSON.stringify(orderRequest), { headers: this.headers})
    .toPromise()
    .then(res => res.json().data as OrderRequest)
    .catch(this.handleError);
  }

  update(orderRequest: OrderRequest): Promise<OrderRequest> {
    const url = `${this.url}/${orderRequest.userName}`;
    return this.http
      .put(url, JSON.stringify(orderRequest), { headers: this.headers })
      .toPromise()
      .then(() => orderRequest)
      .catch(this.handleError);
  }

  delete(orderRequest: OrderRequest): Promise<void> {
    const url = `${this.url}/${orderRequest.userName}`;
    return this.http.delete(url,{ headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
