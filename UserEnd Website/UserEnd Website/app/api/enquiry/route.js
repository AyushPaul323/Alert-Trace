import connectDB from "@/app/lib/mongodb";
import Enquiry from "@/app/models/enquiry"
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req) {
    const {name, phone, location, problemType,description}= await req.json();

    //console.log("Name: ", name);
    //console.log("Email: ", email);
    //console.log("Message: ", message);

    try {

        await connectDB();
        await Enquiry.create({name,phone,location,problemType,description})

        return NextResponse.json({
            msg: ["Message Sent Successfully"], success: true
        })
    }catch(error){
        if(error instanceof mongoose.Error.ValidationError) {
            let errorList=[];
            for (let e in error.errors){
                errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({msg: errorList})
        }
        else{
            return NextResponse.json({msg: ["Unable To Send Message"]});
        }
    }

}