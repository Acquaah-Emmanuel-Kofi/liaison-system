import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AngularQueryDevtools} from '@tanstack/angular-query-devtools-experimental';
import {environment} from '../environments/environment.development';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  devEnvironment: boolean = environment.DEVELOPMENT;
}
