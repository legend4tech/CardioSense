"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SymptomChecklist } from "@/components/symptom-checklist"
import { ArrowLeft, Loader2, Stethoscope } from "lucide-react"
import Link from "next/link"

export default function NewPatientPage() {
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form State
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [weight, setWeight] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const LOADING_STEPS = [
    "Initializing Clinical Inference Engine...",
    "Cross-referencing symptoms with pediatric cardiology guidelines...",
    "Running differential diagnosis analysis...",
    "Evaluating severity markers...",
    "Synthesizing final diagnostic report..."
  ];
  const [loadingStep, setLoadingStep] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
      }, 1500)
    } else {
      setLoadingStep(0)
    }
    return () => clearInterval(interval)
  }, [loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!name || !age || !sex || selectedSymptoms.length === 0) {
      setError("Please fill out all required fields and select at least one symptom.")
      return
    }

    setLoading(true)

    try {
      // Setup to call the Gemini API endpoint
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientInfo: {
            name,
            age: parseInt(age),
            sex,
            weight: weight ? parseFloat(weight) : undefined
          },
          symptoms: selectedSymptoms
        })
      })

      if (!response.ok) {
        throw new Error("Diagnosis failed. Please try again.")
      }

      const result = await response.json()
      
      // Redirect to the result page with the new patient ID
      if (result.patientId) {
        router.push(`/patients/${result.patientId}`)
      } else {
        throw new Error("Invalid response from the server.")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background/50 pb-12">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Back to Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">CDSS Engine</span>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-start p-6 md:p-10">
        <div className="w-full max-w-4xl space-y-8">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">New Patient Diagnosis</h1>
            <p className="text-muted-foreground mt-2">
              Enter the patient&apos;s biological details and meticulously check all presenting symptoms. 
              Our AI engine will analyze this to support your clinical decision.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="shadow-sm border-primary/10">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Step 1: Patient Biological Profile</CardTitle>
                <CardDescription>Basic patient demographic and physical measurements.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (Years) <span className="text-destructive">*</span></Label>
                  <Input 
                    id="age" 
                    type="number" 
                    min="0" 
                    placeholder="e.g. 5" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex <span className="text-destructive">*</span></Label>
                  <Select value={sex} onValueChange={(val) => setSex(val || "")} required>
                    <SelectTrigger id="sex">
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) <span className="text-muted-foreground">(Optional)</span></Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    placeholder="e.g. 18.5" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-primary/10">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Step 2: Presenting Symptoms</CardTitle>
                <CardDescription>
                  Expand each clinical category and check every symptom currently observed in the patient.
                  Symptoms are tagged to indicate whether they are more characteristic of ASD, VSD, or both —
                  helping you select more precisely and improving AI diagnostic accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <SymptomChecklist
                  selectedSymptoms={selectedSymptoms}
                  onChange={setSelectedSymptoms}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-end gap-4 border-t bg-muted/20 p-6">
                {error && (
                  <div className="w-full text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-md border border-destructive/20">
                    {error}
                  </div>
                )}
                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto px-8">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    "Run AI Diagnosis"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center sm:text-right max-w-md">
                  By running this diagnosis, you acknowledge that this is a clinical decision support tool and should be used alongside professional medical judgment.
                </p>
              </CardFooter>
            </Card>
          </form>
          
          {/* Immersive Loading Overlay */}
          {loading && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6">
               <div className="max-w-md w-full p-10 rounded-3xl border border-primary/20 bg-card/95 shadow-2xl flex flex-col items-center text-center space-y-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                  
                  <div className="relative z-10 p-5 rounded-full bg-primary/10">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  </div>
                  
                  <div className="relative z-10 space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">AI Analysis in Progress</h2>
                    <div className="h-10 flex items-center justify-center px-4">
                      <p className="text-sm font-medium text-muted-foreground transition-all duration-300">
                        {LOADING_STEPS[loadingStep]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                     <div 
                       className="bg-primary h-full transition-all duration-1000 ease-in-out" 
                       style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }} 
                     />
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
