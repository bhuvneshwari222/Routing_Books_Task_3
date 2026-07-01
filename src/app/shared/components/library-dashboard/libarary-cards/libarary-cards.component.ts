import { Component, Input, OnInit } from '@angular/core';
import { ILibrary } from 'src/app/shared/models/library';

@Component({
  selector: 'app-libarary-cards',
  templateUrl: './libarary-cards.component.html',
  styleUrls: ['./libarary-cards.component.scss']
})
export class LibararyCardsComponent implements OnInit {
  @Input() libraryObj !: ILibrary

  constructor() { }

  ngOnInit(): void {
  }

}
