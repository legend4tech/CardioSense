import connectToDatabase from "@/lib/db"
import Patient from "@/lib/models/Patient"
import { notFound } from "next/navigation"
import { PrintButton } from "@/components/print-button"
import Link from "next/link"
import {
  ArrowLeft,
  HeartPulse,
  User,
  Calendar,
  Weight,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Brain,
  Stethoscope,
  ChevronRight,
} from "lucide-react"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return { title: `Diagnostic Report` }
}

export default async function PatientResultPage({ params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase()

  const { id } = await params

  let patient: any
  try {
    patient = await Patient.findById(id).lean()
  } catch (error) {
    console.error("Invalid ID format", error)
  }

  if (!patient) {
    notFound()
  }

  // Severity styling helpers
  const severityConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
    Mild: {
      label: "Mild",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      dot: "bg-emerald-500",
    },
    Moderate: {
      label: "Moderate",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      dot: "bg-amber-500",
    },
    Severe: {
      label: "Severe",
      bg: "bg-red-50 dark:bg-red-950/30",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      dot: "bg-red-500",
    },
  }

  const diagnosisConfig: Record<string, { color: string; bg: string; border: string; description: string }> = {
    ASD: {
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      description: "Atrial Septal Defect",
    },
    VSD: {
      color: "text-accent-foreground",
      bg: "bg-accent",
      border: "border-accent-foreground/20",
      description: "Ventricular Septal Defect",
    },
    Inconclusive: {
      color: "text-muted-foreground",
      bg: "bg-muted",
      border: "border-border",
      description: "Insufficient data for a definitive diagnosis",
    },
  }

  const sev = severityConfig[patient.severity] ?? severityConfig["Mild"]
  const diag = diagnosisConfig[patient.diagnosis] ?? diagnosisConfig["Inconclusive"]
  const formattedDate = new Date(patient.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white print:text-black">
      {/* ── Sticky Navigation ── */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border/60 bg-background/95 backdrop-blur-sm px-6 print:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded gradient-primary">
            <HeartPulse className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Cardio<span className="text-primary">Sense</span>
          </span>
        </div>

        <PrintButton />
      </header>

      {/* ── Hero Result Banner ── */}
      <div className="relative overflow-hidden border-b border-border/60 bg-background print:border-gray-200">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.42 0.22 248) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.22 248) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
        {/* Left gradient glow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2 gradient-primary print:hidden"
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto px-8 md:px-12 py-10 print:py-6">
          {/* Report label + timestamp */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 print:text-gray-500">
            <Stethoscope className="h-3.5 w-3.5" />
            <span>CardioSense CDSS — Diagnostic Report</span>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Patient identity */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/20 text-white text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)" }}>
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight print:text-black" style={{ fontFamily: "var(--font-heading)" }}>
                  {patient.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {patient.age} years · {patient.sex}{patient.weight ? ` · ${patient.weight} kg` : ""}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-16 w-px bg-border/60" aria-hidden />

            {/* Diagnosis result pills */}
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5">Diagnosis</p>
                <div className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 ${diag.bg} ${diag.border}`}>
                  <HeartPulse className={`h-4 w-4 flex-shrink-0 ${diag.color}`} />
                  <div>
                    <p className={`text-lg font-extrabold leading-none ${diag.color}`} style={{ fontFamily: "var(--font-heading)" }}>
                      {patient.diagnosis}
                    </p>
                    <p className={`text-xs mt-1 ${diag.color} opacity-70`}>{diag.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5">Severity</p>
                <div className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 ${sev.bg} ${sev.border}`}>
                  <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${sev.dot}`} />
                  <div>
                    <p className={`text-lg font-extrabold leading-none ${sev.text}`} style={{ fontFamily: "var(--font-heading)" }}>
                      {patient.severity}
                    </p>
                    <p className={`text-xs mt-1 ${sev.text} opacity-60`}>Haemodynamic severity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-10 space-y-8 print:py-6 print:space-y-6">

        {/* ── Patient Details Row ── */}
        <section className="rounded-2xl border border-border/60 bg-background overflow-hidden print:rounded-none print:border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60 bg-muted/30 print:bg-transparent">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>
              Patient Profile
            </h2>
          </div>
          <div className="px-6 py-6">
            {/* Demographics row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-border/40">
              {[
                { icon: User, label: "Full Name", value: patient.name },
                { icon: Calendar, label: "Age", value: `${patient.age} years` },
                { icon: Activity, label: "Biological Sex", value: patient.sex },
                { icon: Weight, label: "Weight", value: patient.weight ? `${patient.weight} kg` : "Not recorded" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </div>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Symptoms */}
            <div className="pt-5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                <ClipboardList className="h-3.5 w-3.5" />
                Presenting Symptoms ({patient.symptoms.length} observed)
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.symptoms.map((s: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/60 px-3 py-1.5 text-sm text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Clinical Reasoning ── */}
        <section className="rounded-2xl border border-border/60 bg-background overflow-hidden print:rounded-none print:border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60 bg-muted/30 print:bg-transparent">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>
                AI Clinical Reasoning
              </h2>
              <p className="text-xs text-muted-foreground">Generated by Google Gemini · Expert paediatric cardiology analysis</p>
            </div>
          </div>
          <div className="px-6 py-6">
            <div className="relative pl-5 border-l-2 border-primary/30 space-y-4">
              {/* Decorative dot */}
              <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
              {patient.reasoning.split("\n").map((paragraph: string, idx: number) =>
                paragraph.trim() ? (
                  <p key={idx} className="text-sm leading-7 text-foreground/80">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          </div>
        </section>

        {/* ── Recommendations ── */}
        <section className="rounded-2xl border border-border/60 bg-background overflow-hidden print:rounded-none print:border-gray-200">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60 bg-muted/30 print:bg-transparent">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-bold text-base" style={{ fontFamily: "var(--font-heading)" }}>
                Clinical Recommendations
              </h2>
              <p className="text-xs text-muted-foreground">Next steps advised by the AI inference engine</p>
            </div>
          </div>
          <div className="px-6 py-6">
            <ul className="space-y-3">
              {patient.recommendations.map((r: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground pt-0.5 leading-relaxed">{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 px-5 py-4 print:border-gray-300 print:bg-transparent">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" aria-hidden />
          <p className="text-xs text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
            <strong>Clinical Decision Support Only.</strong> This report was generated by an AI system and must be
            reviewed by a qualified clinician before any clinical action is taken. It is not a substitute for
            professional medical judgement, direct patient examination, or specialist referral.
          </p>
        </div>

        {/* ── Footer actions ── */}
        <div className="flex items-center justify-end pt-2 print:hidden">
          <Link href="/patients/new">
            <span className="inline-flex items-center gap-2 rounded-lg gradient-primary text-white text-sm font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity cursor-pointer">
              <HeartPulse className="h-4 w-4" />
              New Diagnosis
            </span>
          </Link>
        </div>
      </main>
    </div>
  )
}
