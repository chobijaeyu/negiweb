import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { negifield } from 'src/app/models/field.model';
import { NegifieldService } from 'src/app/services/negifield.service';
import { FieldAddComponent } from '../components/field-add/field-add.component';
import { FieldEditComponent } from '../components/field-edit/field-edit.component';

@Component({
  selector: 'negi-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.sass']
})
export class FieldContainerComponent implements OnInit {

  constructor(
    private negifieldService:NegifieldService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  openNewFieldDialog(fieldData: any){
    const dr = this.dialog.open(FieldAddComponent,{})

    dr.afterClosed().subscribe(field => {
      if (field) {
        //ng data add new field to server
        this.negifieldService.add(field)
      }
    }
    )
  }

  openEditDialog(){
    const dr  = this.dialog.open(FieldEditComponent,{})

    dr.afterClosed().subscribe(field => {
      if (field) {
        //ng data edit field to server
        this.negifieldService.update(field)
      }
    })
  }
}
