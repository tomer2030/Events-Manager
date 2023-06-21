import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event-model';
import { TypeModel } from 'src/app/models/type-model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public events: EventModel[] = [];
    public types: TypeModel[];

    // DI
    public constructor(private eventService: EventService) {}

    public async ngOnInit(): Promise<void> {
        try {
            // get all the types
            this.types = await this.eventService.getAllTypes();
        } catch (err:any) {
            alert(err.message);
        }
    }

    // function for check if the event already started
    public itStarted(eventDate: string): boolean {
        const now = new Date();
        const eventDateFormat = new Date(eventDate);
        return now >= eventDateFormat;
    }

    // function for display the events with same type
    public async displayEvents(args: Event) {
        try {
            const selectElement = args.target as HTMLSelectElement;
            const typeId = selectElement.value;
            this.events = await this.eventService.getAllEventsWithSameType(typeId);
            
        } catch (err: any) {
            alert(err.message)
        }
    }

    // function for delete the event
    public async deleteEvent(eventId: string): Promise<void> {
        try {
            // check if the user want delete the vacation
            if(!window.confirm("Are you sure?")) return;
    
            await this.eventService.deleteEvent(eventId);
            alert("Event has been deleted");
    
            // refresh the list
            const index = this.events.findIndex(e => e._id === eventId);
            this.events.splice(index, 1);    
        } catch (err:any) {
            alert(err.message);
        }
    }
}
