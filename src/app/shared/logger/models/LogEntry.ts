import { LogTypeString } from './LogType';
import { LogFields } from './LogFields';
export interface LogEntry {
  type: LogTypeString;
  message: any;
  data: LogFields;
}
