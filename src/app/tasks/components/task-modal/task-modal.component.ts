import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  imports: [],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  @Output() close = new EventEmitter<void>();  

  onClose(){
    this.close.emit();
  }
}
