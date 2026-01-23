import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskData, TaskFormComponent } from '../task-form/task-form.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task.model';
import { Priority, Status } from '../../model/task.constants';
import { TaskColumnComponent } from '../task-column/task-column.component';

@Component({
  selector: 'app-task-board',
  imports: [
    TaskFormComponent, 
    TaskModalComponent, 
    CommonModule, 
    TaskColumnComponent
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {
  isModalOpen: boolean = false;
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  backlogTasks: Task[] = [];
  taskStatus = Status;
  Priority = Priority;

  connectedLists = [
    this.taskStatus.todo,
    this.taskStatus.inProgress,
    this.taskStatus.done,
    this.taskStatus.backlog
  ];

  constructor(private TaskService: TaskService) {}

  ngOnInit(){
    // this.TaskService.loadLocalStorgae();
    this.refreshApiLists();
    this.TaskService.fetchTasks().subscribe((tasks) => {
      const todoTasks = tasks.filter( t => t.status === this.taskStatus.todo);
      const inProgressTasks = tasks.filter( t => t.status === this.taskStatus.inProgress);
      const doneTasks = tasks.filter( t => t.status === this.taskStatus.done);
      const backlogTasks = tasks.filter( t => t.status === this.taskStatus.backlog);
    });
  }
  
  taskCreated(data: NewTaskData){
    const newTask : Task = {
            id: Date.now(),
            title: data.title,
            priority: data.priority,
            createDate: new Date(),
            status: data.status,
            completedDate: data.status === Status.done ? new Date() : undefined,
        };
    this.TaskService.createNewTask(newTask).subscribe(() => {
      // this.refreshFromAPI();
      this.closeModal();
      this.refreshApiLists();
    });
  }
  private refreshApiLists() {
    this.TaskService.fetchTasks().subscribe((tasks) => {
      this.todoTasks = tasks.filter(t => t.status === this.taskStatus.todo);
      this.inProgressTasks = tasks.filter(t => t.status === this.taskStatus.inProgress);
      this.doneTasks = tasks.filter(t => t.status === this.taskStatus.done);
      this.backlogTasks = tasks.filter(t => t.status === this.taskStatus.backlog);
    });

    // this.todoTasks = tasks.filter(t => t.status === this.taskStatus.todo);
    // this.inProgressTasks = tasks.filter(t => t.status === this.taskStatus.inProgress);
    // this.doneTasks = tasks.filter(t => t.status === this.taskStatus.done);
    // this.backlogTasks = tasks.filter(t => t.status === this.taskStatus.backlog);
  }

  getTodoList(): Task[]{
    return this.todoTasks;
  }
  getInprogressList(): Task[]{
    return this.inProgressTasks;
  }
  getDoneList(): Task[]{
    return this.doneTasks;
  }
  getBacklogList(): Task[]{
    return this.backlogTasks;
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
  
  updateTask(event:{task: Task, newStatus: Task['status']}){
    if(event.task.status === event.newStatus) return;
    const task = this.TaskService.getTasks().find(t => t.id === event.task.id);
    if(!task) return;
    this.TaskService.updateTaskStatus(task).subscribe(() => {
      this.refreshApiLists();
    })
    // this.TaskService.updateTaskStatus(
    //   event.task.id,
    //   event.newStatus
    // );
    // this.refreshLists();
  }
}
