import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { negifield } from 'src/app/models/field.model';
import { neigiCalendarService } from 'src/app/services/calendar.service';
import { NegifieldService } from 'src/app/services/negifield.service';
import { FieldAddComponent } from '../components/field-add/field-add.component';
import { FieldEditComponent } from '../components/field-edit/field-edit.component';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PageSize } from 'pdfmake/interfaces';
import { ConfirmDialogComponent } from '../../share/components/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

// pdfMake.vfs  = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'negi-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FieldContainerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['field_name', 'group_name', 'img', 'action', 'address', 'active'];
  dataSource!: MatTableDataSource<negifield>;
  expandedElement!: negifield | null;

  imgUrl: string = environment.imgUrl

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isAdmin: boolean = false

  constructor(
    private nf: NegifieldService,
    public nc: neigiCalendarService,
    private dialog: MatDialog,
    public snackbar: MatSnackBar,
    public afa: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.nf.getAll()
    // this.nc.getAll()
    this.nf.entities$.subscribe(r => {
      this.dataSource = new MatTableDataSource(r)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.afa.idTokenResult.subscribe(r => {
      this.isAdmin = r?.claims.role <= 3
    })
  }
  ngAfterViewInit() {
  }

  openNewFieldDialog() {
    const dr = this.dialog.open(FieldAddComponent, {})

    dr.afterClosed().subscribe(field => {
      if (field) {
        //ng data add new field to server
        this.nf.add(field).subscribe(r => {
          this.snackbar.open(`${r.field_name}>>${r.group_name}登録しました`, "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("登録失敗", "X", { duration: 5000 })
          })
      }
    }
    )
  }

  onEdit(nf: negifield, ev: MouseEvent) {
    ev.stopPropagation()
    const dr = this.dialog.open(FieldEditComponent, { data: nf })

    dr.afterClosed().subscribe(field => {
      if (field) {
        //ng data edit field to server
        this.nf.update(field).subscribe(r => {
          this.snackbar.open(`${r.field_name}>>${r.group_name}更新しました`, "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("更新失敗", "X", { duration: 5000 })
          })
      }
    })
  }

  onDelete(nf: negifield, ev: MouseEvent) {
    ev.stopPropagation()
    this.dialog.open(ConfirmDialogComponent, { data: { title: "フィールドを削除する" } }).afterClosed().subscribe(r => {
      if (r) {
        this.nf.delete(nf).subscribe(r => {
          this.snackbar.open(`${r}削除しました`, "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("削除失敗", "X", { duration: 5000 })
          })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generatePdf(nf: negifield, ev: MouseEvent) {
    ev.stopPropagation()
    let pageSize: PageSize = "A4"
    let pageMargins: [number, number, number, number] = [5, 9, 6, 8]

    const documentDefinition = {
      pageSize: pageSize,
      pageMargins: pageMargins,
      content: [
        {
          text: ``
        },
        {

          stack: [
            { qr: JSON.stringify(nf), fit: 550, margin: 20 },
          ],

        }
      ],
      eccLevel: "H",
    };
    pdfMake.createPdf(
      documentDefinition,
      {},
      {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-Italic.ttf'
        },
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        },
      },
      pdfFonts.pdfMake.vfs
    ).open();
  }
}
