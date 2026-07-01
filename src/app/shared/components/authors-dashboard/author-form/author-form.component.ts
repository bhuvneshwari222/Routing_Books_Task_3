import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthor } from 'src/app/shared/models/authors';
import { AuthorsService } from 'src/app/shared/services/authors.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  isInEditMode: boolean = false;
  authorForm !: FormGroup;
  authorId !: string;
  authorObj !: IAuthor;

  constructor(
    private _authorService: AuthorsService,
    private _snackBarService: SnackbarService,
    private _routes: ActivatedRoute,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    this.createAuthorForm();
    this.addSkillControl();
    this.patchAuthor();
    this.isAddressSameHandler();
    this.currentAddressHandler();
  }

  createAuthorForm() {
    this.authorForm = new FormGroup({
      authorName: new FormControl(null, Validators.required),
      authorRole: new FormControl(null, Validators.required),
      biography: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, Validators.required),
      experienceYears: new FormControl(null, Validators.required),
      isActive: new FormControl(true),
      skills: new FormArray([]),
      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required)
        }),
        permanent: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required)
        })
      }),
      isAddressSame: new FormControl({ value: null, disabled: true })
    })
  }

  get f() {
    return this.authorForm.controls
  }

  get currentControl() {
    return (this.f['address'].get('current') as FormGroup).controls;
  }

  get parmanentControl() {
    return (this.f['address'].get('permanent') as FormGroup).controls;
  }

  get skillsArr() {
    return this.f['skills'] as FormArray
  }

  addSkillControl() {
    if (this.f['skills'].valid) {
      let controls = new FormControl(null, Validators.required)
      this.skillsArr.push(controls);
    }
  }

  onRemoveControl(i: number) {
    this.skillsArr.removeAt(i);
  }

  patchAuthor() {
    this._routes.params.subscribe(params => {
      this.authorId = params['authorID'];
      if (this.authorId) {
        this._authorService.fetchAuthorById(this.authorId)
          .subscribe({
            next: resp => {
              this.authorObj = resp;
              this.authorForm.patchValue(resp);
              this.isInEditMode = true;
            },
            error: err => {
              this._snackBarService.openSnackBar(err.msg);
            }
          })
      }
    })
  }

  isAddressSameHandler() {
    this.f['address'].get('current')?.valueChanges.subscribe(val => {
      if (this.f['address'].get('current')?.valid) {
        this.f['isAddressSame'].enable();
      } else {
        this.f['isAddressSame'].disable();
        this.f['isAddressSame'].reset();
      }
    })
  }

  currentAddressHandler() {
    this.f['isAddressSame'].valueChanges.subscribe(val => {
      if (val) {
        let current = this.f['address'].get('current')?.getRawValue();
        this.f['address'].get('permanent')?.patchValue(current);
        this.f['address'].get('permanent')?.disable();
      } else if (this.isInEditMode && !val) {
        this.f['address'].get('permanent')?.patchValue(this.authorObj.address.permanent);
        this.f['address'].get('permanent')?.enable();
      } else {
        this.f['address'].get('permanent')?.reset();
        this.f['address'].get('permanent')?.enable();
      }
    })
  }

  onUpdate() {
    let updatedAuthor: IAuthor = { ...this.authorForm.getRawValue(), authorId: this.authorId }
    this._authorService.updateAuthor(updatedAuthor)
      .subscribe({
        next: resp => {
          this._snackBarService.openSnackBar(resp.msg);
          this.authorForm.reset();
          this.isInEditMode = false;
          this._Router.navigate(['authors', this.authorId], {
            queryParams: {
              authorRole: updatedAuthor.authorRole
            }
          });
        },
        error: err => {
          this._snackBarService.openSnackBar(err.msg);
        }
      })
  }

  onAddAuthor() {
    let newAuthor: IAuthor = { ...this.authorForm.getRawValue(), authorId: Date.now().toString() }
    this._authorService.addAuthor(newAuthor)
      .subscribe({
        next: resp => {
          this._snackBarService.openSnackBar(resp.msg);
          this.authorForm.reset();
          this._Router.navigate(['authors']);
          this._authorService.setFirstAuthorSub$.next(true);
        },
        error: err => {
          this._snackBarService.openSnackBar(err.msg);
        }
      })
  }


}
