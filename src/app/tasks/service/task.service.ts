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

    fetchTasks(){
        return this.http.get<Task[]>(this.API);
    }

    createNewTask(task: Task){
        return this.http.post<Task>(this.API, task); 
    }

    updateTask(task: Task){
        return this.http.put<Task>(`${this.API}/${task.id}`,{
            ...task,
            completedDate: task.status === Status.done ? new Date() : undefined,
        });    
    }      
}   