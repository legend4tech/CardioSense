import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  sex: string;
  weight?: number;
  symptoms: string[];
  diagnosis: string;
  severity: string;
  recommendations: string[];
  reasoning: string;
  createdAt: Date;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  weight: { type: Number, required: false },
  symptoms: { type: [String], required: true },
  diagnosis: { type: String, required: true, enum: ['ASD', 'VSD', 'Inconclusive'] },
  severity: { type: String, required: true, enum: ['Mild', 'Moderate', 'Severe'] },
  recommendations: { type: [String], required: true },
  reasoning: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError in Next.js development environment
const Patient = mongoose.models.Patient || mongoose.model<IPatient>('Patient', PatientSchema);

export default Patient;
