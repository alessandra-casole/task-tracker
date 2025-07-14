import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit  {
  @Output() onAddTask = new EventEmitter();
  taskForm!: FormGroup;
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private uiService: UiService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      dayTime: ['', Validators.required],
      reminder: ['']
    });

    this.subscription = this.uiService.onToggle().subscribe(value => {
      this.showAddTask = value;
      if (this.showAddTask) {
        this.taskForm.reset();
      }
    });
  }

  onsubmit(form: FormGroup) {
    if (this.taskForm.valid) {
      const taskObj = {
        text: form.value.task,
        day: form.value.dayTime,
        reminder: form.value.reminder
      }

      this.onAddTask.emit(taskObj);
    }
  }

}
