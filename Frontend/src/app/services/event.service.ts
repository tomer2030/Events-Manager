import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventModel } from '../models/event-model';
import { TypeModel } from '../models/type-model';
import { appConfig } from '../utils/app-config';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    // DI
    public constructor(private http: HttpClient) { }

    // get all the events from backend
    public async getAllEvents(): Promise<EventModel[]> {
       const observable = this.http.get<EventModel[]>(appConfig.eventsUrl);
       const events = await firstValueFrom(observable);
       return events; 
    }

    // get all the types from the backend
    public async getAllTypes(): Promise<TypeModel[]> {
       const observable = this.http.get<TypeModel[]>(appConfig.typesUrl);
       const types = await firstValueFrom(observable);
       return types; 
    }
    
    // get all the events with same type from backend
    public async getAllEventsWithSameType(typeId: string): Promise<EventModel[]> {
        const observable = this.http.get<EventModel[]>(appConfig.typesUrl + typeId);
        const events = await firstValueFrom(observable);
        return events; 
    }
    
    // add new event
    public async addNewEvent(event: EventModel): Promise<EventModel> {
        const observable = this.http.post<EventModel>(appConfig.eventsUrl, event);
        const addedEvent = await firstValueFrom(observable);
        return addedEvent; 
    }
    
    // delete event
    public async deleteEvent(eventId: string): Promise<void> {
        const observable = this.http.delete<void>(appConfig.eventsUrl + eventId);
        await firstValueFrom(observable);
    }
}
