import { inject, Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { GlobalVariablesStore } from '../../store/global-variables.store';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isInternTypeSwitchedSubject = new BehaviorSubject<boolean>(true);
  private isCollapsedSubject = new BehaviorSubject<boolean>(false);
  interTypeSubject =  new BehaviorSubject<string>('')

  isSwitched$ = this.isInternTypeSwitchedSubject.asObservable()
  isCollapsed$ = this.isCollapsedSubject.asObservable();
  internType$ = this.interTypeSubject.asObservable();

  private globalStore = inject(GlobalVariablesStore);


  toggleInterType(){
    const currentState = this.isInternTypeSwitchedSubject.value;
    this.isInternTypeSwitchedSubject.next(!currentState);
    this.globalStore.setInternshipType(!currentState);
    if (this.isSwitched$){
      this.interTypeSubject.next('Attachment view')
    }
  }


  toggleCollapse(): void {
    const currentState = this.isCollapsedSubject.value;
    this.isCollapsedSubject.next(!currentState);
  }

  getInternTypeState(): boolean {
    return this.isInternTypeSwitchedSubject.value;
  }

}
