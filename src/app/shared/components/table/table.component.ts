import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() set data(val: any[]) {
    this.tableData = val;
    const { id, ...obj } = val[0];
    this.tableKeys = Object.keys(obj);
  }

  @Output() selectedRow: EventEmitter<number> = new EventEmitter();

  tableData: any[];
  tableKeys: string[];
  
  constructor() { }

  selectRow(id: number) {
    this.selectedRow.emit(id);
  }

}
