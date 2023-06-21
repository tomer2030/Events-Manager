import express, { Request, Response, NextFunction } from "express";
import { EventModel } from "../4-models/event-model";
import eventsLogic from "../5-logic/events-logic";

const router = express.Router(); // Capital R

// get all the events with the same type -> GET http://localhost:3001/api/events/type/:typeId
router.get("/events/type/:typeId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const typeId = request.params.typeId;
        const events = await eventsLogic.getAllEventsWithSameType(typeId);
        response.json(events);
    }
    catch (err: any) {
        next(err);
    }
});

// get all types -> GET http://localhost:3001/api/events/type
router.get("/events/type", async (request: Request, response: Response, next: NextFunction) => {
    try {        
        const types = await eventsLogic.getAllTypes();
        response.json(types);
    }
    catch (err: any) {
        next(err);
    }
});

// add new event -> POST http://localhost:3001/api/events
router.post("/events", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const event = new EventModel(request.body); // put the new event in eventModel

        // get back the added event with id and return to frontend
        const addedEvent = await eventsLogic.addNewEvent(event); 
        response.status(201).json(addedEvent);
    }
    catch (err: any) {
        next(err);
    }
});

// delete event -> DELETE http://localhost:3001/api/events/:eventId
router.delete("/events/:eventId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const eventId = request.params.eventId;

        // get back the added event with id and return to frontend
        await eventsLogic.deleteEvent(eventId); 
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

