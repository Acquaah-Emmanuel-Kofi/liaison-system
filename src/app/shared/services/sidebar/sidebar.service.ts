import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isInternTypeSwitchedSubject = new BehaviorSubject<boolean>(true);
  private isCollapsedSubject = new BehaviorSubject<boolean>(false);
  interTypeSubject =  new BehaviorSubject<string>('')

  isSwitched$ = this.isInternTypeSwitchedSubject.asObservable()
  isCollapsed$ = this.isCollapsedSubject.asObservable();
  internType$ = this.interTypeSubject.asObservable()


  toggleInterType(){
    const currentState = this.isInternTypeSwitchedSubject.value;
    this.isInternTypeSwitchedSubject.next(!currentState);
    if (this.isSwitched$){
      this.interTypeSubject.next('Attachment view')
    }
  }


  toggleCollapse(): void {
    const currentState = this.isCollapsedSubject.value;
    this.isCollapsedSubject.next(!currentState);
  }


  setInternTypeState(state: boolean): void {
    this.isInternTypeSwitchedSubject.next(state);
  }

  getInternState() {
    return this.interTypeSubject.value;
  }

  getInternTypeState(): boolean {
    return this.isInternTypeSwitchedSubject.value;
  }

  setCollapseState(state: boolean): void {
    this.isCollapsedSubject.next(state);
  }


  getCollapseState(): boolean {
    return this.isCollapsedSubject.value;
  }


}
