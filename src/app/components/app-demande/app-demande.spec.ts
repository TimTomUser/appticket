import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDemande } from './app-demande';

describe('AppDemande', () => {
  let component: AppDemande;
  let fixture: ComponentFixture<AppDemande>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDemande]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDemande);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
