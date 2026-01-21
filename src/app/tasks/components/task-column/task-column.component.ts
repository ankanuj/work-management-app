import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../model/task.model';
import { Status } from '../../model/task.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css'
})
export class TaskColumnComponent {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Input() status!: Status;
}
