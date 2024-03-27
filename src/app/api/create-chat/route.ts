
import { NextResponse } from "next/server"


// /api/create-chat
//named the request and the response object
export async function POST(req: Request, res: Response){
    try{
        const body = await req.json()
        const {file_key, file_name} = body
    }
    catch (error){
        console.error(error)
        return NextResponse.json(
            {error: "internal server error"}, 
            {status: 500});
    }
}