import Link from "next/link"
import {
  HeartPulse,
  Stethoscope,
  Brain,
  ShieldCheck,
  FileText,
  Zap,
  ChevronRight,
  Activity,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "CardioSense — AI-Powered Pediatric Cardiac Diagnosis",
  description:
    "CardioSense uses Google Gemini AI to support clinicians in diagnosing congenital heart defects (ASD & VSD) in children with expert-level precision.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <HeartPulse className="h-4.5 w-4.5 text-white" aria-hidden />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cardio<span className="text-primary">Sense</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="gradient-primary text-white border-0 shadow-md hover:opacity-90 transition-opacity">
              Open App
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        id="hero"
        className="gradient-hero relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 pb-12 text-center overflow-hidden"
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.42 0.22 248) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.22 248) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />

        {/* Animated ECG line in background */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-[0.06]" aria-hidden>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
            <polyline
              points="0,60 100,60 130,10 160,110 190,60 230,60 260,60 290,30 320,90 350,60 400,60 1200,60"
              fill="none"
              stroke="oklch(0.42 0.22 248)"
              strokeWidth="2"
              className="ecg-line"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold border border-primary/20 bg-primary/8 text-primary opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Powered by Google Gemini AI
          </div>

          {/* Main Heading */}
          <div
            className="space-y-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI-Powered{" "}
              <span className="gradient-text">Cardiac</span>
              <br />
              Decision Support
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert-level diagnosis of pediatric congenital heart defects —
              in seconds.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                id="hero-open-app"
                className="gradient-primary text-white border-0 h-12 px-8 text-base shadow-lg shadow-primary/25 hover:opacity-90 hover:scale-[1.02] transition-all"
              >
                Open Dashboard
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                id="hero-learn-more"
                className="h-12 px-8 text-base hover:bg-primary/5"
              >
                Learn More
              </Button>
            </a>
          </div>

          {/* Floating hero card — visual anchor */}
          <div
            className="relative mx-auto mt-6 max-w-sm opacity-0 animate-fade-in-up animate-float"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
            aria-hidden
          >
            <div className="glass-card rounded-2xl p-6 shadow-xl shadow-primary/10 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                  <HeartPulse className="h-6 w-6 text-white animate-heartbeat" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Analysis Complete</p>
                  <p className="text-xs text-muted-foreground">0.8s · High confidence</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Diagnosis</span>
                  <span className="text-sm font-bold text-primary px-2 py-0.5 rounded bg-primary/10">ASD — Atrial Septal Defect</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Severity</span>
                  <span className="text-sm font-bold text-amber-600 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30">Moderate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="text-sm font-bold text-emerald-600 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30">High</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-primary rounded-full w-4/5 transition-all" />
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            {[
              { value: "2", label: "Heart Conditions Covered" },
              { value: "<1s", label: "AI Analysis Time" },
              { value: "100%", label: "Structured Reports" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-2xl font-extrabold text-primary"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is CardioSense? ── */}
      <section id="about" className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              About the System
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What is CardioSense?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A cutting-edge Clinical Decision Support System (CDSS) designed for clinicians
              who work with children suspected of having congenital heart defects.
            </p>
          </div>

          {/* Two condition cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="group rounded-2xl border border-border/60 bg-card p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <Activity className="h-7 w-7 text-primary" />
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ASD
              </h3>
              <p className="font-semibold text-primary mb-3">Atrial Septal Defect</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A congenital opening between the upper chambers (atria) of the heart. Blood
                leaks from the left atrium to the right, overloading the right side of the
                heart and the lungs. Often presents with a fixed split S2 heart sound and
                systolic murmur.
              </p>
            </div>
            <div className="group rounded-2xl border border-border/60 bg-card p-8 hover:border-accent-foreground/40 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent group-hover:bg-accent transition-colors">
                <HeartPulse className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                VSD
              </h3>
              <p className="font-semibold text-accent-foreground mb-3">Ventricular Septal Defect</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The most common congenital heart defect — a hole in the wall separating the
                lower chambers (ventricles). Causes left-to-right shunting, increased
                pulmonary blood flow, and presents with a harsh holosystolic murmur and
                left parasternal thrill.
              </p>
            </div>
          </div>

          {/* Mission statement */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10 text-center">
            <Stethoscope className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Mission
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              In resource-limited clinical settings, access to specialist paediatric
              cardiologists is scarce. CardioSense bridges this gap by putting the
              reasoning power of an expert cardiologist — backed by Google Gemini AI —
              into the hands of every clinician, enabling faster, more confident,
              and better-documented clinical decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="py-24 px-6 bg-muted/40"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Workflow
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              From patient intake to diagnostic report in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line (decorative) */}
            <div
              className="absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block"
              aria-hidden
            />

            {[
              {
                step: "01",
                icon: Users,
                title: "Enter Patient Profile",
                description:
                  "Input the patient's full name, age, biological sex, and optional weight. This data is used to contextualise the AI's clinical reasoning.",
              },
              {
                step: "02",
                icon: CheckCircle2,
                title: "Select Symptoms",
                description:
                  "Work through a structured checklist of cardiovascular, respiratory, and physical examination findings observed in the patient.",
              },
              {
                step: "03",
                icon: Brain,
                title: "AI Generates Report",
                description:
                  "Google Gemini AI analyses the data as an expert paediatric cardiologist, returning a diagnosis, severity, clinical reasoning, and treatment recommendations.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-border/60 bg-card p-8 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-white text-xs font-bold shadow-md">
                  {item.step}
                </div>
                <div className="mt-4 mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mx-auto">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section id="features" className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Capabilities
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for Clinicians
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Brain,
                title: "AI-Powered Inference",
                description:
                  "Google Gemini acts as an expert paediatric cardiologist, providing deep physiological reasoning for every diagnosis.",
                color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
              },
              {
                icon: Zap,
                title: "Instant Results",
                description:
                  "Receive a full diagnostic report — including differential diagnosis and severity assessment — in under a second.",
                color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
              },
              {
                icon: ShieldCheck,
                title: "Persistent Records",
                description:
                  "All patient records and diagnostic reports are securely stored in MongoDB and accessible at any time.",
                color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
              },
              {
                icon: FileText,
                title: "Printable Reports",
                description:
                  "Generate clean, formatted clinical reports that can be printed and added directly to a patient's file.",
                color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-transform group-hover:scale-110 duration-300`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Medical Disclaimer ── */}
      <section className="py-12 px-6 bg-muted/40">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-6 flex gap-4 items-start">
            <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-1">
                Clinical Decision Support — Not a Replacement
              </h3>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                CardioSense is a clinical <strong>decision support tool</strong>. All AI-generated
                diagnoses and recommendations must be reviewed and confirmed by a qualified medical
                professional. This system is not a substitute for professional medical judgement,
                physical examination, or specialist referral. Always refer complex cases to a
                paediatric cardiologist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="relative inline-flex h-20 w-20 items-center justify-center mx-auto">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-15 animate-pulse-ring" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full gradient-primary shadow-lg shadow-primary/30">
              <HeartPulse className="h-10 w-10 text-white animate-heartbeat" />
            </div>
          </div>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to diagnose?
          </h2>
          <p className="text-lg text-muted-foreground">
            Open the dashboard to view patient records or start a new AI-assisted diagnosis now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                id="cta-open-dashboard"
                size="lg"
                className="gradient-primary text-white border-0 h-12 px-10 text-base shadow-lg shadow-primary/25 hover:opacity-90 hover:scale-[1.02] transition-all"
              >
                Launch Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/patients/new">
              <Button
                id="cta-new-patient"
                variant="outline"
                size="lg"
                className="h-12 px-10 text-base hover:bg-primary/5"
              >
                New Patient Diagnosis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/60 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded gradient-primary">
              <HeartPulse className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-foreground">CardioSense</span>
            <span>— Pediatric Cardiac CDSS</span>
          </div>
          <p>For clinical support use only. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  )
}
