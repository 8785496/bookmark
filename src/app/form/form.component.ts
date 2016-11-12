import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router,  } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../entity/book';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() model: Book;
  @Input() action: string;
  @Input() submit;

  constructor(private af: AngularFire, private router: Router, private location: Location) { }

  ngOnInit() { }

  onSubmit() {
    this.submit(this.model);
  }

  cancel() {
    this.location.back();
  }
}
