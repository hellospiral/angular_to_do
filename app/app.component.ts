import { Component, EventEmitter } from 'angular2/core'; // 1. In BOTH components, import our tools

@Component({
  selector: 'task-display',
  inputs: ['task'],
  template: `
    <h3>{{ task.description }}</h3>
  `
})
export class TaskComponent {
  public task: Task;
}

// Child Component: TaskList
@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'], // 2. Decide the name of our event emitter
  directives: [TaskComponent],
  template: `
  <task-display *ngFor="#currentTask of taskList"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
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
}

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
      new Task("Create ToDo List app.", 0),
      new Task("Learn Kung Fu.", 1),
      new Task("Rewatch some movies.", 2),
      new Task("Do the laundry.", 3)
    ];
  }
  // 9. Declare the method in the parent class so that we can use the task we have passed up from the child:
  taskWasSelected(clickedTask: Task): void {
    console.log('parent', clickedTask);
    // Do stuff here with the task we clicked!
  }
}

export class Task {
  public done: boolean = false;
  constructor(public description: string, public id: number) {

  }
}
