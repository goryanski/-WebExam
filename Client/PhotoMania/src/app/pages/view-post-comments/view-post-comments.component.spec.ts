import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostCommentsComponent } from './view-post-comments.component';

describe('ViewPostCommentsComponent', () => {
  let component: ViewPostCommentsComponent;
  let fixture: ComponentFixture<ViewPostCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
