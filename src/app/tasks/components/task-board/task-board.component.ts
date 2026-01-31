import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskData, TaskFormComponent } from '../task-form/task-form.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task.model';
import { Priority, Status } from '../../model/task.constants';
import { TaskColumnComponent } from '../task-column/task-column.component';
import { ViewEditTaskComponent } from '../view-edit-task/view-edit-task.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-board',
  imports: [
    TaskFormComponent, 
    TaskModalComponent, 
    CommonModule, 
    TaskColumnComponent,
    ViewEditTaskComponent
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css'
})
export class TaskBoardComponent {
  constructor(
    private TaskService: TaskService,
    private authService: AuthService,
    private router: Router
  ){}

  isModalOpen: boolean = false;
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  backlogTasks: Task[] = [];
  taskStatus = Status;
  Priority = Priority;
  mode: 'create' | 'edit' = 'create';
  selectedTask: Task | null = null;

  connectedLists = [
    this.taskStatus.todo,
    this.taskStatus.inProgress,
    this.taskStatus.done,
    this.taskStatus.backlog
  ];

  ngOnInit(){
    this.refreshApiLists();
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
    this.mode = 'create';
    this.refreshApiLists();
  }
  
  updateTask(event:{task: Task, newStatus: Task['status']}){
    if(event.task.status === event.newStatus) return;
    const updatedTask: Task ={
      ...event.task,
      status : event.newStatus,
    };
    this.TaskService.updateTask(updatedTask).subscribe(() => {
      this.refreshApiLists();
    })
  }
  taskUpdate(task: Task){
    this.TaskService.updateTask(task).subscribe(() =>{
      this.closeModal();
      this.refreshApiLists;
    });
  }

  editTask(task : Task){
    this.mode = 'edit';
    this.selectedTask = task;
    this.openModal();
  }
  logout(){
    this.authService.logoutUser();
    this.router.navigate(['']);
  }
}
