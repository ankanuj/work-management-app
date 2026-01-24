import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Priority, Status } from '../../model/task.constants';

@Component({
  selector: 'app-view-edit-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-edit-task.component.html',
  styleUrl: './view-edit-task.component.css'
})
export class ViewEditTaskComponent {
  @Input() task!: Task;
  @Output() taskUpdate = new EventEmitter<Task>();

  editableTask!: Task;
  originalTask!: Task;
  priority = Priority;
  status = Status;
  ngOnInit(){
    this.editableTask = structuredClone(this.task);
    this.originalTask = structuredClone(this.task);
  }
  save(){
    this.taskUpdate.emit(this.editableTask);
  }
  cancel(){
    this.editableTask = structuredClone(this.task);
  }
  get isDirty(): boolean {
    return JSON.stringify(this.originalTask) !== JSON.stringify(this.editableTask);
  }
}
