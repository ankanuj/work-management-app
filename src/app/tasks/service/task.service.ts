import { Injectable } from "@angular/core";
import { Task } from "../model/task.model";
import { Priority, Status } from "../model/task.constants";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [];

    getTasks(): Task[]{
        return [...this.tasks];
    }

    createNewTask(task: string, priority:Priority, status:Status): void{
        const newTask : Task = {
            id: Date.now(),
            title: task,
            priority,
            createDate: new Date(),
            status,
        };
        this.tasks.push(newTask); 
        this.saveToLocalStorage();   
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
}   