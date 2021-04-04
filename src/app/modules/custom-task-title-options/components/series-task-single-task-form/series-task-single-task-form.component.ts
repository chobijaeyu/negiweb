import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { priorities } from 'src/app/models/field.model';
import { titleOption } from 'src/app/models/task-options.model';
import { CustomTaskTitleOptionService } from 'src/app/services/custom-task.service';

@Component({
  selector: 'negi-series-task-single-task-form',
  templateUrl: './series-task-single-task-form.component.html',
  styleUrls: ['./series-task-single-task-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesTaskSingleTaskFormComponent implements OnInit {
  filteredOptions$!: Observable<string[]>;
  priorities = priorities
  titleOptions: titleOption[] = []

  @Input() SingleTaskForm: RxFormGroup = new RxFormGroup({}, {}, {})
  constructor(
    public taskTitleOptionService: CustomTaskTitleOptionService,
  ) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.SingleTaskForm.controls['title'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.taskTitleOptionService.entities$.subscribe(to => {
      this.titleOptions = to
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.titleOptions.filter(option => option.title.toLowerCase().includes(filterValue)).map(titleOption => titleOption.title);
  }
}
