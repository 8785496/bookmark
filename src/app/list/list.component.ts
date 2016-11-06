import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: FirebaseListObservable<any[]>;
  private uid: string = '';
  
  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
     if (auth) {
        this.uid = auth.uid;
        this.books = this.af.database.list('/books', {
          query: {
            orderByChild: 'pid',
            equalTo: auth.uid
          }
        });
     }
   });
  }

  removeBook(key: string, book: any) {
    if (confirm(`Delete this book? ${book.name}`)) {
      this.books.remove(key);
    }
  }
}
