import {AppMessageType} from './app-message-type.enum';

export class AppMessage {

  constructor(public type: AppMessageType,
              public text: string) {
  }

  isSuccess(): boolean {
    return this.type === AppMessageType.Success;
  }

  isInfo(): boolean {
    return this.type === AppMessageType.Info;
  }

  isWarning(): boolean {
    return this.type === AppMessageType.Warning;
  }

  isError(): boolean {
    return this.type === AppMessageType.Error;
  }
}
