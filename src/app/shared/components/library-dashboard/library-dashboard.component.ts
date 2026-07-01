import { Component, OnInit } from '@angular/core';
import { ILibrary } from '../../models/library';
import { LibrariesService } from '../../services/libraries.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-dashboard',
  templateUrl: './library-dashboard.component.html',
  styleUrls: ['./library-dashboard.component.scss']
})
export class LibraryDashboardComponent implements OnInit {
  libraryArr: ILibrary[] = [];

  constructor(
    private _libraryServ: LibrariesService,
    private _snackBar: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getLibraryArr()
  }

  getLibraryArr() {
    this._libraryServ.fetchLibraryArr()
      .subscribe({
        next: resp => {
          this.libraryArr = resp;
          this._router.navigate(['libraries',resp[0].libraryId]);
        },
        error: err => {
          this._snackBar.openSnackBar(err.msg);
        }
      })
  }

}
