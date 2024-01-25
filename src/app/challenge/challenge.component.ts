import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Task {
  name: string,
  description: string,
  dueDate: string,
  status: string,
  editing?: boolean
}


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})

export class ChallengeComponent {

  tasks: Task[] = [
    { name: 'Task 1', description: 'Complete project proposal', dueDate: '2024-02-10', status: 'In Progress' },
    { name: 'Task 2', description: 'Review and edit report', dueDate: '2024-02-15', status: 'Not Started' },
    { name: 'Task 3', description: 'Conduct market research', dueDate: '2024-02-28', status: 'Completed' },
    { name: 'Task 4', description: 'Prepare presentation for meeting', dueDate: '2024-03-10', status: 'Pending' },
  ];

  displayedColumns: string[] = ['name', 'description', 'dueDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  addRow() {
    const newRow: Task = { name: '', description: '', dueDate: '', status: '', editing: true };
    this.tasks.push(newRow);
    this.dataSource.data = this.tasks;
  }

  deleteRow(row: Task) {
    const index = this.tasks.indexOf(row);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.dataSource.data = this.tasks;
    }
  }

  saveRow(row: Task) {
    if (this.isValidRow(row)) {
      row.editing = false;
    } else {
      alert('Please fill in all required fields.');
    }
  }

  cancelEdit(row: Task) {
    if (!row.name || !row.description || !row.dueDate || !row.status) {
      const index = this.tasks.indexOf(row);
      if (index > -1) {
        this.tasks.splice(index, 1);
        this.dataSource.data = this.tasks;
      }
    } else {
      row.editing = false;
    }
  }

  private isValidRow(row: Task): boolean {
    return !!row.name && !!row.description && !!row.dueDate && !!row.status;
  }
}
