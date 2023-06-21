import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { EventModel, IEventModel } from "../4-models/event-model";
import { ITypeOfEventsModel, TypeOfEventsModel } from "../4-models/type-of-events-model";

// get all the types
async function getAllTypes(): Promise<ITypeOfEventsModel[]> {
    const types = await TypeOfEventsModel.find().exec();
    return types;
}

// get all the events with the same type
async function getAllEventsWithSameType(typeId: string): Promise<IEventModel[]> {
    const events = await EventModel.find({typeId: typeId}).populate("type").exec();
    return events;
}

// add new event
async function addNewEvent(event: IEventModel): Promise<IEventModel> {
    
    // validate the added event
    const errors = event.validateSync();
    
    // if there is error, throw new error
    if(errors) throw new ValidationErrorModel(errors.message);

    // add the new event and return to frontend
    const addedEvent = event.save();
    return addedEvent;
}

// delete event
async function deleteEvent(eventId: string): Promise<void> {
    
    // send to DB the id for delete
    
    const deleted = await EventModel.findByIdAndDelete(eventId);
    
    if(!deleted) throw new ResourceNotFoundErrorModel(eventId); 

}

export default {
    getAllTypes, getAllEventsWithSameType, addNewEvent, deleteEvent
};