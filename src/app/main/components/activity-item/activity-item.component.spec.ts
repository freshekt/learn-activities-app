import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityItemComponent } from './activity-item.component';
import { MainModule } from '../../main.module';
import { NguiMapModule } from '@ngui/map';

describe('ActivityItemComponent', () => {
  let component: ActivityItemComponent;
  let fixture: ComponentFixture<ActivityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        MainModule,
        NguiMapModule.forRoot({
          apiUrl: 'https://maps.google.com/maps/api/js?libraries=places&language=ru&key=AIzaSyBXu8OmeuVHvYLBXbwW2Eh-r7BM-h6Rm4E'
        })
      ],
      declarations: [ ActivityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityItemComponent);
    component = fixture.componentInstance;
    component.event = {
      id: '',
      title: '',
      start: '',
      end: '',
      description: '',
      userId: '',
      placeId: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
