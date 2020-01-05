import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEntryComponent} from '../add-entry/add-entry.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle: EventEmitter<void> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  addClick() {
    const dialogRef = this.dialog.open(AddEntryComponent);
  }
}
