import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchService } from '../../services/watch.service';

@Component({
  selector: 'app-silhouette-display',
  standalone: true,
  templateUrl: './silhouette-display.component.html',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // 👈 Add this line
})
export class SilhouetteDisplayComponent {
  watchSize = { width: 40, height: 40, wristSize: 180 };

  constructor(private watchService: WatchService) {
    this.watchService.watchSize$.subscribe(size => {
      console.log(size);
      this.watchSize = size;
    });
  }
}
