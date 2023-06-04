import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
  @Inject(EventEmitter2)
  private readonly eventEmitter: EventEmitter2;

  emit(event: string, payload: any) {
    return this.eventEmitter.emit(event, { payload });
  }
}
