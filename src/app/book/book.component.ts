import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Book } from '../entity/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public model: Book = new Book();
  public action: string = 'edit';
  private book: FirebaseObjectObservable<Book>;

  constructor(private af: AngularFire, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.af.auth.forEach(auth => {
        this.book = this.af.database.object('/books/' + auth.uid + '/' + id);

        this.book.forEach(book => {
          this.model = book;
        });
      })
    });
  }

  submit(book: Book) {
    this.book.update({
      'author': book.author,
      'name': book.name,
      'page': book.page,
      'totalPage': book.totalPage,
      'update': -Date.now()
    }).then(() => {
      this.router.navigate(['/books']);
    })
  }
}
