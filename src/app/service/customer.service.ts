import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { Customer } from '../model/customer';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService {

    constructor(private http: Http) { }

    public save(customer: Customer): Observable<any> {
        const url: string = environment.host + '/customers'

        return this.http.post(url, customer, null);
    }

    public edit(id: string, customer: Customer): Observable<any> {
        const url: string = environment.host + '/customers/' + id;

        return this.http.put(url, customer, null);
    }

    public get(id: string): Observable<Customer> {
        const url: string = environment.host + "/customers/" + id;

        return this.http.get(url, null).pipe(map((data: any) => {
            return data.json() as Customer;
        }));
    }

    public list(): Observable<any> {
        const url: string = environment.host + "/customers";
        const options: RequestOptions = new RequestOptions();

        return this.http.get(url, null).pipe(map((data: any) => {
            return data.json() as Customer;
        }));
    }

}
