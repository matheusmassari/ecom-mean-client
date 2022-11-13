import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
declare const require: any;
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    // BASE URL DE USUARIOS
    apiUrlUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrlUsers);
    }

    getSingleUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrlUsers + '/register', user);
    }

    updateUser(user: any, userId: any): Observable<User> {
        return this.http.put<User>(`${this.apiUrlUsers}/${userId}`, user);
    }

    deleteUser(userId: any) {        
        return this.http.delete(`${this.apiUrlUsers}/${userId}`);
    }

    getCountries(): {name: string; id: string}[] {
        return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
                name: entry[1],
                id: entry[0]
            }
        });
    }

    getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'en')
    }

    getUsersCount(): Observable<any> {
        return this.http.get(`${this.apiUrlUsers}/get/count`);
    }
}
