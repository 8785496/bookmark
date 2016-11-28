import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: FirebaseListObservable<any[]>;
  private uid: string = '';

  public image: string;

  private fetched: boolean = false;

  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.uid = auth.uid;

        this.books = this.af.database.list('/books/' + auth.uid, {
          query: {
            orderByChild: 'update'
          }
        });

        this.books.subscribe(snapshot => {
          this.fetched = true;
        })
      }
    });
  }

  removeBook(key: string, book: any) {
    if (confirm(`Delete this book? ${book.name}`)) {
      this.books.remove(key);
    }
  }

  editBook(key: string) {
    this.router.navigate(['/book/' + key]);
  }
}
