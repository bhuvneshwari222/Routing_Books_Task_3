import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibararyCardsComponent } from './libarary-cards.component';

describe('LibararyCardsComponent', () => {
  let component: LibararyCardsComponent;
  let fixture: ComponentFixture<LibararyCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibararyCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibararyCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
