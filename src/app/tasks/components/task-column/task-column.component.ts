import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../model/task.model';
import { Status } from '../../model/task.constants';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, CommonModule, DragDropModule],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css'
})
export class TaskColumnComponent {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Input() status!: Status;
  @Input() connectedDropLists: string[] = [];

  get dropListId(): string{
    return this.status;
  }

  @Output() taskDropped = new EventEmitter<{
    task: Task,
    newStatus: Task['status'], 
  }>();

  onDrop(event: CdkDragDrop<Status>){

    const task = event.item.data as Task;
    
    const fromStatus = event.previousContainer.data;
    const toStatus = event.container.data;

    if(fromStatus === toStatus) return;
    this.taskDropped.emit({
      task,
      newStatus: toStatus
    });
  }
}
