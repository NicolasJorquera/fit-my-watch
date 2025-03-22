import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatchService {
  private watchSizeSubject = new BehaviorSubject({ width: 40, height: 40, wristSize: 180 });
  watchSize$ = this.watchSizeSubject.asObservable();

  updateWatchSize(size: { width: number; height: number; wristSize: number }) {
    this.watchSizeSubject.next(size);
  }
}