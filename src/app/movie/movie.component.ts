import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from './movie'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieForm: FormGroup;
  movie = new Movie('', null, null);
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.movieForm = this.fb.group({
      'name': [this.movie.name, [Validators.required, Validators.maxLength(128)]],
      'time': [this.movie.time, [Validators.required, Validators.maxLength(8)]]
    });

    this.movieForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.movieForm) { return; }
    const form = this.movieForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || this.submitted) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'time': ''
  };

  validationMessages = {
    'name': {
      'required': 'Поле обязательное.',
      'maxlength': 'Максимально 128 символов.'
    },
    'time': {
      'required': 'Поле обязательное.',
      'maxlength': 'Максимально 8 символов.'
    }
  };

  onSubmit() {
    this.submitted = true;
    this.onValueChanged();
    this.movie = this.movieForm.value;
    console.log(this.movie);
  }

}
