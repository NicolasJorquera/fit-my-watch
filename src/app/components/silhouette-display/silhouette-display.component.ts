import { Component } from '@angular/core';
import { WatchService } from '../../services/watch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-silhouette-display',
  standalone: true,
  templateUrl: './silhouette-display.component.html',
//   styleUrls: ['./silhouette-display.component.css'],
  imports: [CommonModule]
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