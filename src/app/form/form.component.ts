import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { Book } from '../entity/book';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public books: FirebaseListObservable<Book[]>;
  public model: Book = new Book();
  private uid: string = '';
  
  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;
        this.books = this.af.database.list('/books/' + auth.uid);
        //this.model.pid = auth.uid;
      }
    });
  }

  get diagnostic() { return JSON.stringify(this.model); }

  onSubmit() {
    if (this.uid !== '') {
      this.books.push(this.model).then(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
