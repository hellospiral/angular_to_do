import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';

// Child Component: TaskList
@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'], // 2. Decide the name of our event emitter
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template: `
  <task-display *ngFor="#currentTask of taskList"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  ` // 5. The timing(click); trigger the correct 'vehicles' to go across the 'bridge'; use the built-in click event emitter to trigger a method called taskClicked
})
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>; // 3. Tell angular what type of 'vehicle' will go over the 'bridge'; Use the same name decided on in step 2.
  public selectedTask: Task;
  constructor() {
    this.onTaskSelect = new EventEmitter(); // 4. Tell angular to actually build the 'bridge'
  }
  taskClicked(clickedTask: Task): void {
    console.log('child', clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask); // 6. Use the emit method from inside the correct method to tell the vehicle (our task) to go. That emit method belongs to our onTaskSelect bridge.
  }
  createTask(description: string): void {
    this.taskList.push(
      new Task(description, this.taskList.length)
    );
  }
}
