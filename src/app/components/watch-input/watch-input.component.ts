import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WatchService } from '../../services/watch.service';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-watch-input',
    standalone: true,
  templateUrl: './watch-input.component.html',
//   styleUrls: ['./watch-input.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class WatchInputComponent {
  watchForm: FormGroup;

  constructor(private fb: FormBuilder, private watchService: WatchService) {
    this.watchForm = this.fb.group({
      width: [40],
      height: [40],
      wristSize: [180]
    });
  }

  submit() {
    console.log(this.watchForm.value);
    this.watchService.updateWatchSize(this.watchForm.value);
  }
}