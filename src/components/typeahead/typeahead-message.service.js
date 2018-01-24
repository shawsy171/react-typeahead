import { BehaviorSubject } from 'rxjs';

export const country$ = new BehaviorSubject('');
export const activeItem$ = new BehaviorSubject(-1);

export default country$; 