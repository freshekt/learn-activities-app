import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesFormsComponent } from './places-forms.component';

describe('PlacesFormsComponent', () => {
  let component: PlacesFormsComponent;
  let fixture: ComponentFixture<PlacesFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
