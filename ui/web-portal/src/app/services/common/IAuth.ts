import { Observable } from 'rxjs';
import { SignupInfo } from './SignupInfo';

export interface IAuth {
	signup(info: SignupInfo): Observable<object>;
}
