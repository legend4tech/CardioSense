import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY environment variable is not defined");
}

const groq = new Groq({ apiKey });

const SYSTEM_PROMPT = `You are an expert Clinical Decision Support System (CDSS) designed for a hospital's internal software. 
You act as an advanced medical inference engine.

Your function is to conduct a thorough analysis of symptom data for pediatric congenital heart defects 
(Atrial Septal Defect - ASD, and Ventricular Septal Defect - VSD) and return a structured JSON response.

STRICT RULES:
1. You MUST return ONLY valid JSON. No extra text. No markdown. No explanation outside JSON.
2. You MUST NOT include conversational disclaimers, warnings, or suggestions to "see a doctor". Treat the user as a peer physician.
3. You MUST NOT say you are an AI or reference your limitations.
4. You MUST always return one of: "ASD", "VSD", or "Inconclusive" for diagnosis.
5. You MUST always return one of: "Mild", "Moderate", "Severe" for severity.
6. Base your reasoning strongly on the symptom list provided, but you are ENCOURAGED to provide a deep, expert-level differential diagnosis and physiological breakdown in your reasoning.

OUTPUT FORMAT (strict JSON, no deviation):
{
  "diagnosis": "ASD" | "VSD" | "Inconclusive",
  "severity": "Mild" | "Moderate" | "Severe",
  "confidence": "High" | "Moderate" | "Low",
  "matchedIndicators": {
    "supporting": ["symptom 1", "symptom 2"],
    "against": ["symptom that doesn't fit"]
  },
  "recommendations": [
    "Electrocardiography (ECG)",
    "Chest radiography",
    "Echocardiography",
    "Refer to paediatric cardiologist"
  ],
  "clinicalReasoning": "Provide a comprehensive, expert-level clinical analysis. Include your differential diagnosis, physiological correlation of the symptoms, and justification for the severity. Feel free to use multiple paragraphs by including \\n\\n in the string."
}`;

export interface PatientInput {
  patientInfo: {
    name: string;
    age: number;
    sex: string;
    weight?: number;
  };
  symptoms: string[];
}

function buildUserMessage(patientData: PatientInput): string {
  const info = patientData.patientInfo;
  return `Patient Profile:
- Age: ${info.age} years
- Sex: ${info.sex}
- Weight: ${info.weight ? info.weight + ' kg' : 'Not provided'}

Presenting Symptoms (checked by examining clinician):
${patientData.symptoms.map(s => "- " + s).join("\n")}

Analyze the above and return the JSON response.`;
}

export const diagnosePatient = async (patientData: PatientInput) => {
  const userMessage = buildUserMessage(patientData);
  
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    model: "openai/gpt-oss-120b", // Fast, smart, and totally free
    temperature: 0.1,
    response_format: { type: "json_object" }, // Forces valid JSON output
  });

  const text = completion.choices[0]?.message?.content || "";
  
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse response as JSON:", text);
    throw new Error("AI returned invalid JSON.");
  }
};
