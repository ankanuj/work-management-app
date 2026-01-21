import {Status, Priority} from '../model/task.constants';   

export interface Task {
    id: number,
    title: string,
    status: Status,
    createDate: Date,
    priority: Priority,
}