import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import 'hammerjs';

export interface TableData {
  RollNumber: number,
  Student: string, 
  Math: number, 
  Science: number, 
  History: number,
  Art: number,
  Music: number,
  Economics: number
}

const ELEMENT_DATA: TableData[]= [
  { RollNumber: 1, Student: 'John Doe', Math: 9, Science: 8.5, History: 78, Art:90, Music:23, Economics:45},
  { RollNumber: 2,Student: 'Jane Smith', Math: 9, Science: 9.2, History: 88, Art:91,Music:56, Economics:90},
  { RollNumber: 3,Student: 'Alice Johnson', Math: 8, Science: 7.8, History: 95, Art:100,Music:67, Economics:56 },
  { RollNumber: 4,Student: 'Bob Anderson', Math: 7, Science: 8.0, History: 85, Art:78,Music:45, Economics:23 },
  { RollNumber: 5,Student: 'Emily Davis', Math: 9, Science: 8.9, History: 91, Art:44 ,Music:78, Economics:58 },
  { RollNumber: 6,Student: 'Chris White', Math: 8, Science: 8.7, History: 80, Art:89 ,Music:89, Economics:42 },
  { RollNumber: 7,Student: 'Eva Martinez', Math: 7, Science: 8.5, History: 92, Art:45 ,Music:60, Economics:49},
  { RollNumber: 8,Student: 'Frank Rodriguez', Math: 8, Science: 9.1, History: 87, Art:78 ,Music:12, Economics:47 },
  { RollNumber: 9,Student: 'Grace Turner', Math: 9, Science: 8.8, History: 89, Art:34 ,Music:34, Economics:46},
  { RollNumber: 10,Student: 'Henry Lee', Math: 8, Science: 7.9, History: 93, Art:67 ,Music:90, Economics:444 },
  ];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit{

  // columns: any[] = [
  //   { field: 'rollNumber'},
  //   { field: 'student' },
  //   { field: 'math' },
  //   { field: 'science' },
  //   { field: 'history' },
  //   { field: 'art'},
  //   { field: 'music'},
  //   { field: 'economics'}
  // ];

  columns: any[] = [
     'RollNumber',
     'Student',
     'Math' ,
     'Science',
     'History',
     'Art',
     'Music',
     'Economics'
  ];

  displayColumns: string[] = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  previousIndex: number;

  @ViewChild (MatPaginator, {static:false}) paginator!: MatPaginator;
  @ViewChild (MatSort, {static:false}) sort!: MatSort;

  constructor() { }

  ngOnInit() {
    this.setDisplayedColumns();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setDisplayedColumns() {
    this.columns.forEach(( colunm, index) => {
      // colunm.index = index;
      // this.displayColumns[index] = colunm.field;
      this.displayColumns[index]= colunm;
    });
  }

  dragStarted(event: CdkDragStart, index: number ) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
    }
  }

  applyFilter(filterValue: string, column: string){
    debugger
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: TableData, filter: string) => {
     return data[column].toString().toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  //  // Function to check if a column is suitable for text-based filtering
   isTextColumn(column: string): boolean {
    // You can customize this based on your specific use case
    return true;
  }

  applyCommonFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    // Custom filter logic that searches across all columns
    this.dataSource.filter = filterValue;

    // If you want to reset individual column filters, you can do so by iterating over the columns:
    // this.columns.forEach(column => this.applyFilter('', column));
  }

  


}
