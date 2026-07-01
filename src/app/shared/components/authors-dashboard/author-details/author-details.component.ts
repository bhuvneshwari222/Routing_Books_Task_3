import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthor } from 'src/app/shared/models/authors';
import { AuthorsService } from 'src/app/shared/services/authors.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  authorId !: string;
  authorObj !: IAuthor;

  constructor(
    private _authAervice: AuthorsService,
    private _snackBar: SnackbarService,
    private _routes: ActivatedRoute,
    private _matDialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthorObj()
  }

  getAuthorObj() {
    this._routes.params.subscribe(params => {
      this.authorId = params['authorID'];
      if (this.authorId) {
        this._authAervice.fetchAuthorById(this.authorId)
          .subscribe({
            next: resp => {
              this.authorObj = resp;
            },
            error: err => {
              this._snackBar.openSnackBar(err.msg);
            }
          })
      }
    })
  }

  onRemove() {
    let config = new MatDialogConfig();
    config.data = `Are you sure you want to remove this author with id ${this.authorId}`;
    config.width = '400px';
    config.disableClose = true;
    let matDialogRef = this._matDialog.open(GetConfirmComponent, config);
    matDialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._authAervice.removeAuthor(this.authorId)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackBar(resp.msg);
                  this._router.navigate(['authors']);
                  this._authAervice.setFirstAuthorSub$.next(true)
                },
                error: err => {
                  this._snackBar.openSnackBar(err.msg);
                }
              })
          }
        }
      })
  }

}
