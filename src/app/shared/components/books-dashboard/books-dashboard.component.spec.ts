import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDashboardComponent } from './books-dashboard.component';

describe('BooksDashboardComponent', () => {
  let component: BooksDashboardComponent;
  let fixture: ComponentFixture<BooksDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
