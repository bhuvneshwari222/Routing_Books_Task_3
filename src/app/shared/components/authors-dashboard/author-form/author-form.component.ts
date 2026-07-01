import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  isInEditMode: boolean = false;
  authorForm !: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createAuthorForm();
    this.addSkillControl();
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
          zipcode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)])
        }),
        permanent: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)])
        })
      }),
      isAddressSame: new FormControl({ value: false, disabled: true })
    })
  }

  get f() {
    return this.authorForm.controls
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

}
