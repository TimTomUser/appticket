import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponents } from './comments.components';

describe('CommentsComponents', () => {
  let component: CommentsComponents;
  let fixture: ComponentFixture<CommentsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
