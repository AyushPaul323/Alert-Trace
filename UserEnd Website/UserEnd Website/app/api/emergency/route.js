import connectDB from "@/app/lib/mongodb";
import Emergency from "@/app/models/emergency"
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {name, phone, location}= await req.json();

    try {

        await connectDB();
        await Emergency.create({name,phone,location})

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