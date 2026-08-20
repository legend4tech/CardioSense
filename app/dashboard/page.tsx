import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import connectToDatabase from "@/lib/db"
import Patient from "@/lib/models/Patient"
import { Activity, Users, HeartPulse, Stethoscope, Plus, Home, ArrowUpRight } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Dashboard",
}

export default async function Dashboard() {
  let totalPatients = 0
  let asdCount = 0
  let vsdCount = 0
  let recentPatients: any[] = []

  try {
    await connectToDatabase()
    totalPatients = await Patient.countDocuments()
    asdCount = await Patient.countDocuments({ diagnosis: "ASD" })
    vsdCount = await Patient.countDocuments({ diagnosis: "VSD" })
    recentPatients = await Patient.find().sort({ createdAt: -1 }).limit(8).lean()
  } catch (error) {
    console.error("Database connection failed", error)
  }

  const getSeverityColor = (severity: string) => {
    if (severity === "Mild") return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900"
    if (severity === "Moderate") return "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900"
    if (severity === "Severe") return "text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
    return "text-muted-foreground bg-muted"
  }

  const getDiagnosisColor = (diagnosis: string) => {
    if (diagnosis === "ASD") return "text-primary bg-primary/10 border-primary/20"
    if (diagnosis === "VSD") return "text-accent-foreground bg-accent border-accent-foreground/20"
    return "text-muted-foreground bg-muted"
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-6">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" title="Back to home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <HeartPulse className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Cardio<span className="text-primary">Sense</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 ml-2 text-muted-foreground">
          <span className="text-border">/</span>
          <span className="text-sm font-medium text-foreground px-2">Dashboard</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link href="/patients/new">
            <Button size="sm" id="dashboard-new-patient" className="gradient-primary text-white border-0 shadow-sm hover:opacity-90 transition-opacity gap-1.5">
              <Plus className="h-4 w-4" />
              New Diagnosis
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-8 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Clinical Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of all patient diagnostic records in the system.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Total Patients */}
          <Card className="shadow-sm border-border/60 hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-1 w-full gradient-primary" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {totalPatients}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total records in the database</p>
            </CardContent>
          </Card>

          {/* ASD */}
          <Card className="shadow-sm border-border/60 hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-1 w-full bg-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-muted-foreground">ASD Diagnoses</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {asdCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Atrial Septal Defect</p>
            </CardContent>
          </Card>

          {/* VSD */}
          <Card className="shadow-sm border-border/60 hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-1 w-full bg-rose-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-muted-foreground">VSD Diagnoses</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/30">
                <HeartPulse className="h-4 w-4 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {vsdCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ventricular Septal Defect</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent patients table */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="border-b border-border/60 bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  Recent Patients
                </CardTitle>
                <CardDescription className="mt-1">
                  Latest diagnostic records, most recent first.
                </CardDescription>
              </div>
              <Link href="/patients/new">
                <Button variant="outline" size="sm" className="gap-1.5 hover:bg-primary/5 hover:border-primary/30">
                  <Plus className="h-3.5 w-3.5" />
                  Add Patient
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/60">
                  <TableHead className="pl-6 font-semibold">Patient</TableHead>
                  <TableHead className="font-semibold">Age</TableHead>
                  <TableHead className="font-semibold">Sex</TableHead>
                  <TableHead className="font-semibold">Diagnosis</TableHead>
                  <TableHead className="font-semibold">Severity</TableHead>
                  <TableHead className="text-right pr-6 font-semibold">Date</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                          <Users className="h-7 w-7 text-muted-foreground/50" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">No patients yet</p>
                          <p className="text-sm mt-0.5">Start by running a new AI diagnosis.</p>
                        </div>
                        <Link href="/patients/new">
                          <Button size="sm" className="mt-2 gradient-primary text-white border-0">
                            <Plus className="h-3.5 w-3.5 mr-1.5" />
                            New Diagnosis
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  recentPatients.map((patient: any) => (
                    <TableRow key={patient._id.toString()} className="hover:bg-muted/40 border-border/40 group">
                      <TableCell className="pl-6 font-semibold">
                        <Link
                          href={`/patients/${patient._id}`}
                          className="hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold uppercase flex-shrink-0">
                            {patient.name.charAt(0)}
                          </div>
                          {patient.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{patient.age}y</TableCell>
                      <TableCell className="text-muted-foreground">{patient.sex}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDiagnosisColor(patient.diagnosis)}`}>
                          {patient.diagnosis}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getSeverityColor(patient.severity)}`}>
                          {patient.severity}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-6 text-muted-foreground text-sm">
                        {new Date(patient.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Link href={`/patients/${patient._id}`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
