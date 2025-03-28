import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private modelParametersSubject = new BehaviorSubject<{ 
    watch_shape: 'round' | 'square',
    watch_width: number,
    watch_height: number,
    watch_thickness: number,
    strap_width: number,
    wrist_size: number,
   }>({ 
    watch_shape: 'round',
    watch_width: 34,
    watch_height: 40,
    watch_thickness: 10,
    strap_width: 20,
    wrist_size: 180,
   });

  modelParameters$ = this.modelParametersSubject.asObservable();

  updateModelParametersSize(size: { 
    watch_shape: 'round' | 'square',
    watch_width: number,
    watch_height: number,
    watch_thickness: number,
    strap_width: number,
    wrist_size: number,
   }) {
    this.modelParametersSubject.next(size);
  }
}
