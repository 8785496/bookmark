import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: FirebaseListObservable<any[]>;
  private uid: string = '';
  
  constructor(af: AngularFire) {
   af.auth.subscribe(auth => {
     if (auth) {
        this.uid = auth.uid;
        this.books = af.database.list('/books', {
          query: {
            orderByChild: 'pid',
            equalTo: auth.uid
          }
        });
     }
   });
  }

  addBook(author: string, name: string, page: number, totalPage: number) {
    if (this.uid !== '') {
      this.books.push({name: name, author: author, page: page, totalPage: totalPage, pid: this.uid});
      author = '';
    }
  }
}
