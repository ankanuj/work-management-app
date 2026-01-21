import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoardComponent } from "./tasks/components/task-board/task-board.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'work-management-app';
}
