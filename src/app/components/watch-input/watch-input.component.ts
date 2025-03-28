import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-watch-input',
  standalone: true,
  templateUrl: './watch-input.component.html',
  //   styleUrls: ['./watch-input.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class WatchInputComponent {
  modelForm: FormGroup;

  constructor(private fb: FormBuilder, private modelService: ModelService) {
    this.modelForm = this.fb.group({
      watch_shape: ['round'],
      watch_width: [34],
      watch_height: [40],
      watch_thickness: [10],
      strap_width: [20],
      wrist_size: [180],
    });
  }

  submit() {
    console.log(this.modelForm.value);
    this.modelService.updateModelParametersSize(this.modelForm.value);
  }
}
