import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionControlService {
  // Observable string sources
  private invokeComponentFunction = new Subject();
  componentFunctionCalled$ = this.invokeComponentFunction.asObservable();

  private messageSource = new Subject();
  messageSource$ = this.messageSource.asObservable();

  test: any = {};

  constructor(private router: Router) {}

  actionController(payload: any) {
    if (payload.action == 'changeRoute') {
      this.changeRoute(payload.payload.path, JSON.stringify(payload.payload));
    } else if (payload.action == 'moveGhost') {
      this.invokeComponentFunction.next('');
    } else if (payload.action == 'randomGhost') {
      this.messageSource.next('');
    } else if (payload.action == 'selectSymbol') {
      this.messageSource.next(payload);
    }
  }

  changeRoute(path: string, params: any = {}) {
    const navigationExtras: NavigationExtras = {
      queryParams: { data: params },
    };
    this.router.navigate([path], navigationExtras);
  }
}
