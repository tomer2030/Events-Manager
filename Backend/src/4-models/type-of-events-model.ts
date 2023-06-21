import mongoose from "mongoose";

// interface of event's type
export interface ITypeOfEventsModel extends mongoose.Document {
    type: string;
}

// validation of event's type
export const TypeOfEventsSchema = new mongoose.Schema<ITypeOfEventsModel>({
    type: { 
        type: String,
        required: [true, "Missing type of the event"]
    }
});

export const TypeOfEventsModel = mongoose.model<ITypeOfEventsModel>("TypeOfEventsModel", TypeOfEventsSchema, "typeOfEvent")