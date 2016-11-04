import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Book } from '../entity/book';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  books: FirebaseListObservable<Book[]>;
  private uid: string = '';
  public model: Book = new Book();
  private af: AngularFire;

  constructor(_af: AngularFire) {
    this.af = _af;
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.books = this.af.database.list('/books');
        this.model.pid = auth.uid;
      }
    });
  }

  get diagnostic() { return JSON.stringify(this.model); }

  onSubmit() {
    if (this.uid !== '') {
      this.books.push(this.model).then(() => {
        this.model = new Book();
        this.af.auth.subscribe(auth => {
          if (auth) {
            this.model.pid = auth.uid;
          }
        });
      });
    }
  }
}
