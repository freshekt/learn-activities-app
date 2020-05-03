import { IUser } from './../../login/models/IUser';

import { ActivityFirebaseService } from './activity-firebase.service';
import { Activity } from '../models/Activity';
import * as moment from 'moment';
import { of, from } from 'rxjs';
import { ActivityPlacesService } from './activity-places.service';
import { LoginService } from 'src/app/login/services/login.service';

export const activityFirebaseService = jasmine.createSpyObj<ActivityFirebaseService>(
  'ActivityFirebaseService', ['getAll$', 'get$', 'add$', 'update$', 'remove$']);

export const mockActivityData: Array<Activity> = [
    {
      id: '1',
      title: 'title1',
      start: moment().format('L'),
      end: moment().add(1, 'day').format('L'),
      description: '',
      userId: '1',
      placeId: '1'
    },
    {
      id: '2',
      title: 'title2',
      start: moment().add(1, 'day').format('L'),
      end: moment().add(2, 'day').format('L'),
      description: '',
      userId: '1',
      placeId: '2'
    }
  ];

export const activityGetAllSpy = activityFirebaseService.getAll$.and.returnValue( of(mockActivityData) );
export const activityGetSpy = activityFirebaseService.get$.and.returnValue( of(mockActivityData[0]) );
export const activityUpdateSpy = activityFirebaseService.update$.and.returnValue( of(mockActivityData[0]) );
export const activityRemoveSpy = activityFirebaseService.remove$.and.returnValue( from(Promise.resolve()) );
export const activityAddSpy = activityFirebaseService.add$.and.returnValue( of(mockActivityData[0]) );

export const activityPlacesService = jasmine.createSpyObj<ActivityPlacesService>(
  'ActivityPlacesService', ['getAll$', 'search$', 'get$','add$' , 'update$', 'remove$']);

export const mockPlaceData = [
  {
    id: '1',
    name: 'test1',
    placeId: '',
    userId: '',
    lat: '',
    lng: '',
    formattedAddress: '',
  },
  {
    id: '2',
    name: 'test2',
    placeId: '',
    userId: '',
    lat: '',
    lng: '',
    formattedAddress: '',
  }
];

export const placeAddSpy = activityPlacesService.add$.and.returnValue(of(mockPlaceData[0]));

export const placeGetSpy = activityPlacesService.add$.and.returnValue(of(mockPlaceData[0]));

export const placeUpdateSpy = activityPlacesService.update$.and.returnValue(of(mockPlaceData[0]));

export const placeRemoveSpy = activityPlacesService.remove$.and.returnValue(from(Promise.resolve()));

export const placeGetAllSpy = activityPlacesService.getAll$.and.returnValue( of(mockPlaceData) );

export const loginTestService = jasmine.createSpyObj<LoginService>('LoginService', ['signOut$', 'signIn$', 'isLoggedIn$', 'getUser$']);

export const testUser: IUser = {
  id: '1',
  email: 'test@t.ru',
  name: 'test',
  photoUrl: 'https://static.mk.ru/upload/entities/2019/05/08/00/articles/detailPicture/c7/b5/08/6e/5dda626cb409b1fa6942c29040609e17.jpg',
  firstName: 'ivan',
  lastName: 'anis',
  authToken: ''
};

export const signOutSpy = loginTestService.signOut$.and.returnValue(of(null));
export const signInSpy = loginTestService.signIn$.and.returnValue(of(testUser));
export const isLoggedInSpy = loginTestService.isLoggedIn$.and.returnValue(of(true));
export const getUserSpy = loginTestService.getUser$.and.returnValue(of(testUser));

export const placesTestProvider = {
  provide: ActivityPlacesService,
  useValue: activityPlacesService
};

export const activityTestProvider = {
  provide: ActivityFirebaseService,
  useValue: activityFirebaseService
};

export const loginTestProvider = {
  provide: LoginService,
  useValue: loginTestService
};
