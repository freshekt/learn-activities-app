import { Router, ActivationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, filter, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LogEntry } from '../models/LogEntry';
import { LogFields } from '../models/LogFields';
import { LogTypeString } from '../models/LogType';
import { LoggerEvents } from '../models/LoggerEvents';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly APP_FIELD = 'Application';
  private readonly ENV_FIELD = 'Environment';
  private readonly VERSION_FIELD = 'Version';
  private readonly USER_NAME_FIELD = 'UserName';
  private readonly ELAPSED_MS_FIELD = 'ElapsedMilliseconds';
  private readonly REQUEST_PATH_FIELD = 'RequestPath';
  private readonly URL_FIELD = 'Url';
  private readonly APP_STATE_FIELD = 'AppState';

  private buffer: LogEntry[] = [];
  private flush = new Subject<LoggerEvents>();

  private  defaultLogFields = {
    url: '',
    requestPath: '',
    elapsedTime: moment().toLocaleString(),
    userId: null,
    appVersion: '',
    environment: environment.production ? 'prod' : 'dev'
  }

  constructor( private http: HttpClient, private router: Router) {
    this.flush
      .pipe(debounceTime(1000), filter((event) => event === LoggerEvents.Flush))
      .subscribe(() => this.flushBuffer());
    this.router.events.subscribe((event: ActivationEnd) => {
        if (event instanceof ActivationEnd) {
          this.defaultLogFields = {
            ... this.defaultLogFields,
            url: event.snapshot.url.map(s => s.toString()).join('/')
          };
        }
     });
  }

  public log(type: LogTypeString, message: any, fields?: LogFields) {
   const data: LogFields  = {
      ... this.defaultLogFields,
      ... fields};

   this.buffer.push({
      type,
      message,
      data
    });
   this.flush.next(LoggerEvents.Flush);
  }

  private flushBuffer() {
    const data = this.buffer.splice(0);

    if (data.length === 0) {
      return;
    }

    const body = data
      .map((entry) => this.buildLogString(entry))
      .reduce((sum, entry) => (sum += entry), '');

    if (!environment.production) {

        console.log({
          body,
          data
        });
    } else {

      this.http.post(environment.logEndpoint, body).pipe(take(1)).subscribe();
    }
  }

  private buildLogString(entry: LogEntry): string {
    const index = this.buildIndexChunk();
    const body = this.buildBodyChunk(entry);

    return `${index}\n${body}\n`;
  }

  private buildIndexChunk() {
    const date = moment();
    const index = {
      index: {
        _index: `logstash-${date.format('YYYY.M.D')}`,
        _type: 'logevent'
      }
    };

    return JSON.stringify(index);
  }

  private buildBodyChunk(entry: LogEntry) {
    const { type, message, data } = entry;
    const level = type;
    const date = moment();
    const messageTemplate = this.getMessageTemplate();
    const fields = this.getFields(data);
    const body = {
      '@timestamp': `${date.toISOString()}`,
      level,
      messageTemplate,
      message,
      fields
    };

    return JSON.stringify(body);
  }

  private getMessageTemplate() {
    const fields: string[] = [
      this.APP_FIELD,
      this.ENV_FIELD,
      this.VERSION_FIELD,
      this.USER_NAME_FIELD,
      this.ELAPSED_MS_FIELD,
      this.REQUEST_PATH_FIELD,
      this.URL_FIELD,
      this.APP_STATE_FIELD
    ];
    const template = fields.map((field) => `{${field}}`).join(' - ');

    return template;
  }

  private getFields(data: LogFields) {
    return {
      [this.APP_FIELD]: environment.appName,
      [this.ENV_FIELD]: data.environment,
      [this.VERSION_FIELD]: data.appVersion,
      [this.USER_NAME_FIELD]: data.userId,
      [this.ELAPSED_MS_FIELD]: data.elapsedTime,
      [this.REQUEST_PATH_FIELD]: data.requestPath,
      [this.URL_FIELD]: data.url
    };
  }
}


