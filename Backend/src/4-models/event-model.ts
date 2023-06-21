import mongoose from "mongoose";
import { TypeOfEventsModel } from "./type-of-events-model";

// interface of event's type
export interface IEventModel extends mongoose.Document {
    typeId: mongoose.Schema.Types.ObjectId; // foreign key
    date: Date;
    description: string;
    address: string;
    invitations: number;
}

// validation of event's type
export const EventSchema = new mongoose.Schema<IEventModel>({
    typeId: { 
        type: mongoose.Schema.Types.ObjectId
    },
    date: { 
        type: Date,
        required: [true, "Missing date"]
    },
    description: { 
        type: String,
        required: [true, "Missing description"],
        minlength: 2,
        maxlength: 100
    },
    address: { 
        type: String,
        required: [true, "Missing address"],
        minlength: 2,
        maxlength: 100
    },
    invitations: { 
        type: Number,
        required: [true, "Missing number of invitations"],
        min: 5,
        max: 1000
    }
}, {
    versionKey: false,
    toJSON: {virtuals: true},
    id: false
});

// virtual variable 
EventSchema.virtual("type",{
    ref: TypeOfEventsModel,
    localField: "typeId",
    foreignField: "_id",
    justOne: true
})

export const EventModel = mongoose.model<IEventModel>("EventModel", EventSchema, "events")