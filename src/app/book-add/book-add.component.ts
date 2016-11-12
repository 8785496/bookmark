import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Book } from '../entity/book';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  public model: Book;
  public books: FirebaseListObservable<Book[]>;
  public action: string = 'add';
  
  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
    this.model = new Book();
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.books = this.af.database.list('/books/' + auth.uid);
      }
    });
  }
  
  submit(book: Book) {
    book.update = -Date.now();
    
    console.log('submit', book);

    this.books.push(book).then(() => {
      this.router.navigate(['/books']);
    })
    .catch(err => console.log(err.message));
  }

}
