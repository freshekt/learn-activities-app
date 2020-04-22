import { ActivityFirebaseService } from './../../services/activity-firebase.service';
import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models/Activity';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.less']
})
export class ActivityItemComponent implements OnInit {

  @Input() event: Activity;

  @Input() editableModel$: BehaviorSubject<Activity>;

  constructor(private activityService: ActivityFirebaseService) { }

    ngOnInit(): void {
    }

    remove(e: Event) {
        if (confirm('Are you sure?')) {
          this.activityService.remove$(this.event).subscribe();
        }
    }
}
