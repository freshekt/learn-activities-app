import { GetActivityPlaces } from './../../store/actions/places.actions';
import { map, takeUntil,  tap, withLatestFrom, take, takeWhile } from 'rxjs/operators';
import { Activity } from './../../models/Activity';
import { selectActivities } from './../../store/selectors/main.selectors';
import { GetActivities } from './../../store/actions/main.actions';
import { environment } from 'src/environments/environment';
import { LogType } from '../../../shared/logger/models/LogType';
import { IAppState } from '../../../store/state/app.state';
import { selectIsLoggedIn, selectUser } from '../../../login/store/selectors/login.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetUser, SignOut } from '../../../login/store/actions/login.actions';
import { LoggerService } from 'src/app/shared/logger/services/logger.service';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BehaviorSubject, Subject } from 'rxjs';
import { selectPlaces } from '../../store/selectors/places.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.less']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

  isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));

  user$ = this.store.pipe(select(selectUser)).pipe(takeWhile((user) => user !== null));

  events$ = this.store.pipe(select(selectActivities));

  places$ = this.store.pipe(select(selectPlaces)).pipe(
    map(places => places.filter( p => this.filteredEvents.some(fe => fe.placeId === p.placeId))),
    map(places => places.map(p => ({...p, ... this.filteredEvents.find(fe => fe.placeId === p.placeId)}))),
    map(places => places.map(p => ({...p, title: `${p.title} - ${p.name}` })))
    );

  editableModel$ = new BehaviorSubject<Activity>(null);

  options: any;

  selectedDate$ = new BehaviorSubject<string>(moment().format('L'));

  filteredEvents: Array<Activity> = [];

  onDestroy$ = new Subject();

  events = [];

  isLoading = true;



  constructor(private store: Store<IAppState>, private logging: LoggerService) {

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUser());
    this.store.dispatch(new GetActivities());
    this.store.dispatch(new GetActivityPlaces());

    this.selectedDate$.pipe(
      withLatestFrom(this.events$),
      map(([sdate, events]) => this.filterEvents(events, sdate)),
      takeUntil(this.onDestroy$)
      ).subscribe(events => this.filteredEvents = events);

    this.events$.pipe(
      tap(events => {
        if (events.length > 0 ) {
        this.isLoading = true;
        this.events = events.map(s => ({...s,
        start: moment(s.start).format('YYYY-MM-DD'),
        end: moment(s.end).format('YYYY-MM-DD')}));
        this.isLoading = false;
        console.log({events: this.events});
        }
      }),
      withLatestFrom(this.selectedDate$),
      map(([ events, sdate]) => this.filterEvents(events, sdate) ),
      takeUntil(this.onDestroy$)
    ).subscribe(events => {
      this.filteredEvents = events;
    });

    this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: moment().format('YYYY-MM-DD'),
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
        },
        editable: true,
        dateClick: ({date}) => {
          this.selectedDate$.next(moment(date).format('L'));
        }
    };
  }

  addActivity(e: Event) {
    this.user$.pipe(withLatestFrom(this.selectedDate$), take(1))
    .subscribe(([user, start]) =>
        this.editableModel$.next({
          id: '',
          title: '',
          start,
          end: '',
          description: '',
          userId: user.id,
          placeId: ''
        }));
  }

  onMapReady( map: google.maps.Map) {
    this.places$.pipe(takeUntil(this.onDestroy$)).subscribe((places) => {
       const bounds = new google.maps.LatLngBounds();
       places.forEach(place => bounds.extend(place));
       map.fitBounds(bounds);
       if (map.getZoom() > 15) {
          map.setZoom(15);
        }
      });
  }

  filterEvents(events, sdate): Activity[] {
    return events.filter(s => {
      const start = moment(s.start).add(1, 'minute');
      const end = moment(s.end);
      return (start.isAfter(moment(sdate).startOf('day')) && start.isBefore(moment(sdate).endOf('day'))) ||
      ( start.isBefore(moment(sdate).startOf('day')) && moment(sdate).isBefore(end));
   });
  }

  signOut() {
    this.logging.log(LogType.Information , 'user  logged in');
    this.store.dispatch(new SignOut());
  }

}
