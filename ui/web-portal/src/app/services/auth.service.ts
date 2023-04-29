import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as EndPoint from '../../constants/endpoints';
import type { Credential, IAuth, SignupInfo } from './common';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuth {
	private readonly http: HttpClient;

	public constructor(http: HttpClient) {
		this.http = http;
	}

	public signup(data: SignupInfo): Observable<object> {
		return this.http.post(EndPoint.SIGNUP, data);
	}

	public login(credential: Credential): Observable<object> {
		return this.http.post(EndPoint.LOGIN, credential);
	}
}
