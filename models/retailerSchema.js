import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const retailerSchema=new Schema({
    name:{
        type:String,
        Required:true
    },
    pinCode:{

    },
    village:{

    }
},{timestamps:true});

export const Retaler=new mongoose.model('Retailer',retailerSchema)