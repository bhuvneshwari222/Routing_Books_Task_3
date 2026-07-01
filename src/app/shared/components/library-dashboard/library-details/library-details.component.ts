import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ILibrary } from 'src/app/shared/models/library';
import { LibrariesService } from 'src/app/shared/services/libraries.service';

@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss']
})
export class LibraryDetailsComponent implements OnInit {
  libraryObj !: ILibrary;
  libraryId !: string;

  constructor(
    private _libraryService: LibrariesService,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLibraryObj()
  }

  getLibraryObj() {
    this._routes.params.subscribe((params: Params) => {
      this.libraryId = params['libraryID']
      if (this.libraryId) {
        this._libraryService.fetchLibraryById(this.libraryId)
          .subscribe({
            next: resp => {
              this.libraryObj = resp;
            },
            error: err => {
              console.log(err);
            }
          })
      }
    })
  }

}
