import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority, Status } from '../../model/task.constants';

export interface NewTaskData {
  title: string;
  priority: Priority;
  status: Status;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  title: string = '';
  priority: Priority = Priority.low
  status: Status = Status.todo; 
  taskStatus = Status;
  taskPriority = Priority;  

  @Output() taskCreate = new EventEmitter<NewTaskData>();

  createTask() {
    if(!this.title.trim()) return;

    this.taskCreate.emit({
      title: this.title,
      priority: this.priority,
      status: this.status
    })
    this.title = '';
    this.priority = Priority.low;
    this.status = Status.todo;
  }
}
