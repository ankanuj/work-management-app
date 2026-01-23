import { Injectable, inject } from "@angular/core";
import { Task } from "../model/task.model";
import { Priority, Status } from "../model/task.constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private http = inject(HttpClient);
    private API = 'http://localhost:3000/tasks';
    private tasks: Task[] = [];

    getTasks(): Task[]{
        return [...this.tasks];
    }
    fetchTasks(){
        return this.http.get<Task[]>(this.API);
    }

    createNewTask(task: Task){
        return this.http.post<Task>(this.API, task);
        // this.saveToLocalStorage();   
    }
    saveToLocalStorage(){
        localStorage.setItem('task', JSON.stringify(this.tasks));
    }
    loadLocalStorgae(){
        const taskData = localStorage.getItem('task');
        if(taskData){
            this.tasks = JSON.parse(taskData);
        }
    }
    updateTaskStatus(task: Task){
        const updateTask = {
            ...task,
            status: task.status,
            completedDate: task.status === Status.done ? new Date() : undefined,
        };
        return this.http.put<Task>(`${this.API}/${task.id}`, updateTask);
        // this.saveToLocalStorage();        
    }      
}   