import { Component } from '@angular/core';
import { WatchInputComponent } from './components/watch-input/watch-input.component';
import { SilhouetteDisplayComponent } from './components/silhouette-display/silhouette-display.component';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    WatchInputComponent,
    SilhouetteDisplayComponent,
    // RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'fit-my-watch';
}
