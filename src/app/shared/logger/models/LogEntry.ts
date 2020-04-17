import { LogTypeString } from './LogType';
import { LogFields } from './LogFields';
export interface LogEntry {
  type: LogTypeString;
  message: string;
  data: LogFields;
}
