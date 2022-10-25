import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    // BASE URL DE USUARIOS
    apiUrlUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient) {}

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
}
