import { Component } from '@angular/core';
import { WatchInputComponent } from './components/watch-input/watch-input.component';
// import { SilhouetteDisplayComponent } from './components/silhouette-display/silhouette-display.component';
import { ThreeViewerComponent } from './components/three-viewer/three-viewer.component';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    WatchInputComponent,
    // SilhouetteDisplayComponent,
    ThreeViewerComponent
    // RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'fit-my-watch';

  modelParameters: { 
    watch_shape: 'round' | 'square',
    watch_width: number,
    watch_height: number,
    watch_thickness: number,
    strap_width: number,
    wrist_size: number,
  } = {
    watch_shape: 'round',
    watch_width: 34,
    watch_height: 40,
    watch_thickness: 4,
    strap_width: 18,
    wrist_size: 180,
  };  
}
