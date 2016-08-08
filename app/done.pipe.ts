import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from './task.model';

@Pipe({
  name: "done",
  pure: false // this causes it to update as soon as we have changed something about a task.
})
export class DonePipe implements PipeTransform {
  transform(input: Task[], args) {
    var desiredDoneState = args[0]; // We retrieve the first argument from args, placing it in a new variable called desiredDoneState.
    if(desiredDoneState === "done") {
      return input.filter((task) => {
        return task.done;
      }); // Then, if it is equal to the string "done", we return tasks that are done.
    } else if (desiredDoneState === "notDone") {
      return input.filter((task) => {
        return !task.done;
      }); // If it is equal to "notDone", we return tasks whose done property is set to false.
    } else {
      return input;
    } // If neither of these states are selected, we return the input array unchanged.
  }
}
