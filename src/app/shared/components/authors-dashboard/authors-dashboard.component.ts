import { Component, OnInit } from '@angular/core';
import { IAuthor } from '../../models/authors';
import { AuthorsService } from '../../services/authors.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authors-dashboard',
  templateUrl: './authors-dashboard.component.html',
  styleUrls: ['./authors-dashboard.component.scss']
})
export class AuthorsDashboardComponent implements OnInit {
  authorsArr: IAuthor[] = [];

  constructor(
    private _authorsService: AuthorsService,
    private _snackBar: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthorsArr();
    this._authorsService.setFirstAuthorSub$.subscribe(resp => {
      if (resp) {
        this.setFirstAuthorSelected();
      }
    })
  }

  getAuthorsArr() {
    this._authorsService.fetchAuthorsArray()
      .subscribe({
        next: resp => {
          this.authorsArr = resp;
          this.setFirstAuthorSelected()
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

  setFirstAuthorSelected() {
    this._router.navigate(['authors', this.authorsArr[0].authorId], {
      queryParams: {
        authorRole: this.authorsArr[0].authorRole
      }
    })
  }

}
