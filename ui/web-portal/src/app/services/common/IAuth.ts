import { Observable } from 'rxjs';
import { SignupInfo } from './SignupInfo';
import { Credential } from './credentials';

export interface IAuth {
	signup(info: SignupInfo): Observable<object>;

	login(credential: Credential): Observable<object>;
}
