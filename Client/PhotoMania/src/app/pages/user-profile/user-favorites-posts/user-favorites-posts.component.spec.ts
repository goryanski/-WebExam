import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoritesPostsComponent } from './user-favorites-posts.component';

describe('UserFavoritesPostsComponent', () => {
  let component: UserFavoritesPostsComponent;
  let fixture: ComponentFixture<UserFavoritesPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavoritesPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavoritesPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
