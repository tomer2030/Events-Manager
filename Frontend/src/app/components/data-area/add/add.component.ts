import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event-model';
import { TypeModel } from 'src/app/models/type-model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    public types: TypeModel[] = [];
    public event = new EventModel();

    // Di
    public constructor(private eventService: EventService, private router: Router) {}

    public async ngOnInit(): Promise<void> {
        try {
            // get all types
            this.types = await this.eventService.getAllTypes();
        } catch (err:any) {
            alert(err.message);
        }
    }

    // function for send the new event to backend
    public async send(): Promise<void> {
        try {
            await this.eventService.addNewEvent(this.event);
            alert("event has been added successfully");
            this.router.navigateByUrl("/list");
        } catch (err: any) {
            alert(err.message)
        }
    }
}
