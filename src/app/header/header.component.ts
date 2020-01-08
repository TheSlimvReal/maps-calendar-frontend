import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEntryComponent} from '../add-entry/add-entry.component';
import {CalendarService} from '../calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle: EventEmitter<void> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private calenderService: CalendarService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  addClick() {
    this.dialog.open(AddEntryComponent);
  }

  registerLocation() {
    this.calenderService.registerLocation()
      .then(res => {
        let message: string;
        if (res.length > 0) {
          message = res.map(e => e.title).join(', ').substring(0, -2);
          message += ` marked as attended (${res.length} in total)`;
        } else {
          message = 'No calendar entry attended';
        }
        this.snackBar.open(message);
      });
  }
}
