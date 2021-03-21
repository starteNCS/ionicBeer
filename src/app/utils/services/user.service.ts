import { Observable } from 'rxjs';
import { CreateUserModel } from './../../pages/auth/models/create-user.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from '../models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private readonly http: HttpClient){}

    createUser(id: string, user: CreateUserModel): Observable<ApiResponse<void>> {
        const url = `${environment.apiBaseUrl}/user/${id}`;
        return this.http.post<ApiResponse<void>>(url, user);
    }

}