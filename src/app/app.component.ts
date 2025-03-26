import { Component } from '@angular/core';
import { WatchInputComponent } from './components/watch-input/watch-input.component';
import { SilhouetteDisplayComponent } from './components/silhouette-display/silhouette-display.component';
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

  watchConfig: { 
    width: number; 
    height: number; 
    thickness: number; 
    strapWidth: number; 
    shape: "round" | "square"; 
  } = {
    width: 40,
    height: 50,
    thickness: 10,
    strapWidth: 20,
    shape: "round" // Valor válido
  };  
}
