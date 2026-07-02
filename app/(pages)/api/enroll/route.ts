// 'use server'

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Capture and log the incoming request payload from the frontend
    const body = await req.json();
    console.log("=== INCOMING REGISTRATION REQUEST (FROM FRONTEND) ===");
    console.log(JSON.stringify(body, null, 2));

    // 2. Prepare the payload and endpoint for Sheety
    const sheetyUrl = 'https://api.sheety.co/cca03fc041a43f901c660df1bc459a75/dusaCoreAcademy/dusaAcademyCohorts';
    
    // Best practice: Store this token in your .env.local file as SHEETY_BEARER_TOKEN
    const sheetyToken = process.env.NEXT_PBLIC_TECH_COHORTS_TOKEN || '8d82cbced5d8f12281f0297c6906************';

    // 3. Send the data to Sheety securely from the server
    const response = await fetch(sheetyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sheetyToken}`
      },
      // Assuming the frontend wraps the payload in the { dusaAcademyCohort: { ... } } root object
      body: JSON.stringify(body) 
    });

    // 4. Capture and log the response from Sheety (Error handling)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("=== SHEETY API ERROR ===");
      console.error(`Status: ${response.status} ${response.statusText}`);
      console.error("Response:", errorText);
      
      return NextResponse.json(
        { error: "Failed to save registration to Sheety" }, 
        { status: response.status }
      );
    }

    // 5. Capture and log the successful response from Sheety
    const responseData = await response.json();
    console.log("=== SHEETY API SUCCESS RESPONSE ===");
    console.log(JSON.stringify(responseData, null, 2));

    // 6. Send the success confirmation back to the frontend
    return NextResponse.json({ success: true, data: responseData });

  } catch (error) {
    console.error("=== SERVER ERROR ===", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}