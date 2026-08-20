import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Patient from "@/lib/models/Patient";
import { diagnosePatient, PatientInput } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body: PatientInput = await req.json();
    
    if (!body.patientInfo || !body.patientInfo.name || !body.symptoms || body.symptoms.length === 0) {
      return NextResponse.json({ error: "Invalid patient data or symptoms" }, { status: 400 });
    }

    // Connect to the DB
    await connectToDatabase();

    // Run AI Diagnosis
    const aiResult = await diagnosePatient(body);

    // Save Patient to Database
    const newPatient = new Patient({
      name: body.patientInfo.name,
      age: body.patientInfo.age,
      sex: body.patientInfo.sex,
      weight: body.patientInfo.weight,
      symptoms: body.symptoms,
      diagnosis: aiResult.diagnosis,
      severity: aiResult.severity,
      recommendations: aiResult.recommendations,
      reasoning: aiResult.clinicalReasoning,
    });

    const savedPatient = await newPatient.save();

    // Return the response, crucially including the patientId for redirection
    return NextResponse.json({
      patientId: savedPatient._id,
      diagnosis: aiResult.diagnosis,
      severity: aiResult.severity,
      recommendations: aiResult.recommendations,
      reasoning: aiResult.clinicalReasoning,
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Diagnosis Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process diagnosis" },
      { status: 500 }
    );
  }
}
