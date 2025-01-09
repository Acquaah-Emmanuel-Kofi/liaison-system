import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { GlobalVariablesStore } from '../../store/global-variables.store';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly globalStore = inject(GlobalVariablesStore);

  private uploadProgressSubject = new BehaviorSubject<UploadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
    isCompleted: false,
  });

  uploadProgress$ = this.uploadProgressSubject.asObservable();

  constructor(private http: HttpClient) {}

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString());
  }

  upload(url: string, file: File): Observable<HttpEvent<any>> {
    // Reset progress when starting new upload
    this.resetProgress();

    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(url, formData, {
        reportProgress: true,
        observe: 'events',
        params: this.httpParams(),
      })
      .pipe(
        finalize(() => {
          // Reset progress when upload completes or errors
          this.resetProgress();
        })
      );
  }

  uploadWithProgress(url: string, file: File): Observable<any> {
    return new Observable((subscriber) => {
      this.upload(url, file).subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total || event.loaded,
              percentage: event.total
                ? Math.round((event.loaded / event.total) * 100)
                : 0,
              isCompleted: false,
            };
            this.uploadProgressSubject.next(progress);
          }

          if (event.type === HttpEventType.Response) {
            const response = event as HttpResponse<any>;
            this.uploadProgressSubject.next({
              loaded: 100,
              total: 100,
              percentage: 100,
              isCompleted: true,
            });
            subscriber.next(response.body);
            subscriber.complete();
          }
        },
        error: (error) => {
          subscriber.error(error);
        },
      });
    });
  }

  private resetProgress(): void {
    this.uploadProgressSubject.next({
      loaded: 0,
      total: 0,
      percentage: 0,
      isCompleted: false,
    });
  }
}
