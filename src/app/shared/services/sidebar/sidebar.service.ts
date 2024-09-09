import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isCollapsedSubject = new BehaviorSubject<boolean>(false);

  // Observable to track the collapsed state
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  // Toggle the collapsed state
  toggleCollapse(): void {
    const currentState = this.isCollapsedSubject.value;
    this.isCollapsedSubject.next(!currentState);
  }

  // Method to set the collapsed state explicitly
  setCollapseState(state: boolean): void {
    this.isCollapsedSubject.next(state);
  }

  // Method to get the current state
  getCollapseState(): boolean {
    return this.isCollapsedSubject.value;
  }


}
