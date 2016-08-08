import { Component, EventEmitter } from 'angular2/core'; // 1. In BOTH components, import our tools
import { TaskListComponent } from './task-list.component';
import { Task } from './task.model';

// Parent component: MyApp
@Component({
  selector: 'my-app',
  directives: [TaskListComponent], // tell the parent that the child exists
  template: `
    <div class="container">
      <h1>To-Do List</h1>
      <task-list
        [taskList]="tasks"
        (onTaskSelect)="taskWasSelected($event)">
      </task-list>
    </div>
  ` // 7. With [taskList] we are setting up the input for the child component (the list of   tasks)
    // 8. Then with (onTaskSelect) we are setting up its output, our event emitter.
    // We declare that the 'vehicles' will exit our bridge by going into a new method in the parent class called taskWasSelected
})

export class AppComponent {
  public tasks: Task[];
  constructor() {
    this.tasks = [
      new Task("Create ToDo List app.", 0, "normal"),
      new Task("Learn Kung Fu.", 1, "normal"),
      new Task("Rewatch some movies.", 2, "normal"),
      new Task("Do the laundry.", 3, "normal")
    ];
  }
  // 9. Declare the method in the parent class so that we can use the task we have passed up from the child:
  taskWasSelected(clickedTask: Task): void {
    console.log('parent', clickedTask);
    // Do stuff here with the task we clicked!
  }
}
