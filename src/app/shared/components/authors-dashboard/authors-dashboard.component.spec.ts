import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsDashboardComponent } from './authors-dashboard.component';

describe('AuthorsDashboardComponent', () => {
  let component: AuthorsDashboardComponent;
  let fixture: ComponentFixture<AuthorsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
