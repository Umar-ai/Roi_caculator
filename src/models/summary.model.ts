import mongoose,{Schema} from 'mongoose'

interface Isummary extends Document{
summary:string;
}


export const summarySchema:Schema<Isummary>=new Schema({
summary:{
    type:String,
    required:true
}
})


export const SummaryModel=(mongoose.models.Summary as mongoose.Model<Isummary>)||(mongoose.model<Isummary>("Summary",summarySchema))