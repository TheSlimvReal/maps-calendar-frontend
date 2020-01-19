import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CalendarService} from '../calendar.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

  entryForm = this.fb.group({
    id: [Date.now()],
    title: [''],
    start: [''],
    end: [''],
    longitude: '',
    latitude: '',
    notes: ['']
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddEntryComponent>,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    if (this.data) {
      const patch = {};
      Object.keys(this.data).forEach(key => patch[key] = this.data[key]);
      this.entryForm.patchValue(patch);
    }
  }

  submitForm() {
    this.calendarService.saveEntry(this.entryForm.getRawValue())
      .then(res => this.dialogRef.close(res));
  }

  deleteEntry() {
    this.calendarService.deleteEntry(this.entryForm.get('id').value)
      .then(() => this.dialogRef.close(this.entryForm.getRawValue()));
  }
}
