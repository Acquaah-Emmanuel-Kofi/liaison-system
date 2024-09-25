import { Component, isDevMode, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { AuthService } from './pages/auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  devEnvironment: boolean = isDevMode();

  constructor(private _authService: AuthService) {}

  ngOnDestroy() {
    this._authService.destroyStorageListener();
  }
}
