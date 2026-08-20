"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Activity, Heart, Wind, TrendingDown, Eye, Stethoscope, Zap } from "lucide-react"

interface Symptom {
  label: string
  hint: string
  tags?: ("ASD" | "VSD" | "Shared")[]
}

interface SymptomCategory {
  category: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  accentColor: string
  symptoms: Symptom[]
}

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    category: "Auscultation Findings",
    icon: Stethoscope,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 dark:bg-blue-950/30",
    accentColor: "border-blue-200 dark:border-blue-900",
    symptoms: [
      { label: "Systolic ejection murmur (pulmonary area)", hint: "Grade II–III crescendo-decrescendo, upper left sternal border — hallmark of ASD", tags: ["ASD"] },
      { label: "Fixed split S2 (does not vary with respiration)", hint: "Pathognomonic for ASD; delayed right ventricular emptying causes wide, fixed S2 splitting", tags: ["ASD"] },
      { label: "Holosystolic (pansystolic) murmur", hint: "Harsh, blowing murmur throughout systole at lower left sternal border — classic VSD", tags: ["VSD"] },
      { label: "Left parasternal thrill (palpable)", hint: "Palpable vibration at 3rd–4th left intercostal space from high-velocity VSD jet", tags: ["VSD"] },
      { label: "Mid-diastolic tricuspid flow rumble", hint: "Low-pitched rumble at lower left sternal border — increased tricuspid flow in ASD", tags: ["ASD"] },
      { label: "Mid-diastolic mitral flow rumble", hint: "Apical diastolic rumble from increased mitral flow in large left-to-right VSD shunt", tags: ["VSD"] },
      { label: "Pulmonary ejection click", hint: "Early systolic high-pitched click at upper left sternal border; may indicate pulmonary hypertension", tags: ["Shared"] },
      { label: "Loud P2 (accentuated pulmonary component of S2)", hint: "Suggests elevated pulmonary artery pressure — sign of developing pulmonary hypertension", tags: ["Shared"] },
    ],
  },
  {
    category: "Cardiovascular & Haemodynamic",
    icon: Heart,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 dark:bg-rose-950/30",
    accentColor: "border-rose-200 dark:border-rose-900",
    symptoms: [
      { label: "Tachycardia (resting heart rate elevated for age)", hint: "Compensatory tachycardia from reduced systemic output or increased volume load", tags: ["Shared"] },
      { label: "Wide pulse pressure (>40 mmHg)", hint: "Large difference between systolic and diastolic pressure; seen in significant left-to-right shunts", tags: ["Shared"] },
      { label: "Bounding peripheral pulses", hint: "Hyperdynamic pulses from large-volume left-to-right shunt causing increased stroke volume", tags: ["VSD"] },
      { label: "Right ventricular heave (parasternal lift)", hint: "Sustained lift at lower left sternal border — right ventricular pressure or volume overload", tags: ["ASD"] },
      { label: "Laterally displaced left ventricular apex beat", hint: "Displaced apex indicating left ventricular volume overload from a large VSD", tags: ["VSD"] },
      { label: "Prominent precordial bulge", hint: "Chest wall deformity from chronic cardiac enlargement; indicates long-standing cardiomegaly", tags: ["Shared"] },
      { label: "Heart palpitations / awareness of heartbeat", hint: "Rapid or irregular heartbeat; may indicate arrhythmia from atrial dilatation in ASD", tags: ["ASD"] },
    ],
  },
  {
    category: "Respiratory & Pulmonary",
    icon: Wind,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/30",
    accentColor: "border-cyan-200 dark:border-cyan-900",
    symptoms: [
      { label: "Dyspnoea on exertion (shortness of breath with activity)", hint: "In children: inability to keep up with peers, stopping during play", tags: ["Shared"] },
      { label: "Dyspnoea at rest", hint: "Resting breathlessness indicates significant haemodynamic compromise or pulmonary hypertension", tags: ["Shared"] },
      { label: "Recurrent lower respiratory tract infections", hint: "Repeated pneumonia or bronchiolitis from increased pulmonary blood flow — very common in VSD", tags: ["VSD"] },
      { label: "Persistent cough", hint: "Chronic cough from pulmonary venous congestion or recurrent respiratory infections", tags: ["VSD"] },
      { label: "Subcostal or intercostal retractions", hint: "Visible accessory muscle use during breathing; increased work of breathing", tags: ["Shared"] },
      { label: "Tachypnoea (raised respiratory rate for age)", hint: "Persistently elevated respiratory rate at rest; early sign of pulmonary overcirculation", tags: ["Shared"] },
      { label: "Feeding difficulties / breathlessness during feeding", hint: "Infants stop frequently, sweat during feeds — equivalent of exertional dyspnoea in neonates", tags: ["VSD"] },
    ],
  },
  {
    category: "Growth & Development",
    icon: TrendingDown,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 dark:bg-amber-950/30",
    accentColor: "border-amber-200 dark:border-amber-900",
    symptoms: [
      { label: "Failure to thrive (poor weight gain)", hint: "Weight below 3rd centile or crossing centile lines downward; from increased caloric demand", tags: ["VSD"] },
      { label: "Poor linear growth", hint: "Height significantly below expected for age; reflects chronic haemodynamic stress", tags: ["Shared"] },
      { label: "Delayed motor development milestones", hint: "Sitting, crawling, walking later than expected; may indicate chronic low cardiac output", tags: ["Shared"] },
      { label: "Excessive sweating during feeds or activity", hint: "Diaphoresis from sympathetic activation due to increased cardiac work; classic infant sign", tags: ["VSD"] },
      { label: "Easy fatigability / poor exercise tolerance", hint: "Child tires quickly during play; parent notices reduced energy levels compared to peers", tags: ["Shared"] },
    ],
  },
  {
    category: "Physical Examination Signs",
    icon: Eye,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 dark:bg-violet-950/30",
    accentColor: "border-violet-200 dark:border-violet-900",
    symptoms: [
      { label: "Central cyanosis (bluish lips / tongue)", hint: "Desaturation of central mucous membranes; suggests shunt reversal (Eisenmenger) or significant desaturation", tags: ["Shared"] },
      { label: "Peripheral cyanosis (acrocyanosis)", hint: "Bluish hands and feet only; may be benign in neonates or indicate low cardiac output", tags: ["Shared"] },
      { label: "Clubbing of fingers and/or toes", hint: "Digital clubbing = long-standing hypoxaemia; late sign suggesting chronic cyanotic disease", tags: ["Shared"] },
      { label: "Hepatomegaly (enlarged liver >3cm below costal margin)", hint: "Right-sided heart failure from systemic venous congestion", tags: ["Shared"] },
      { label: "Peripheral oedema (pedal or facial)", hint: "Ankle or facial swelling from right heart failure; unusual in children unless severe", tags: ["Shared"] },
      { label: "Hyperkinetic precordium (visible pulsations)", hint: "Visible precordial pulsations on inspection; indicates significant ventricular volume overload", tags: ["Shared"] },
    ],
  },
  {
    category: "ECG & Radiological Correlates",
    icon: Activity,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    accentColor: "border-emerald-200 dark:border-emerald-900",
    symptoms: [
      { label: "Right axis deviation on ECG", hint: "ECG axis >+90°; classic ASD finding from right ventricular volume overload", tags: ["ASD"] },
      { label: "Incomplete right bundle branch block (rSR' in V1)", hint: "rSR' or RSR' in lead V1; highly characteristic of ASD-related right ventricular conduction delay", tags: ["ASD"] },
      { label: "Left axis deviation on ECG", hint: "Axis between 0° and −90°; seen in inlet-type VSD", tags: ["VSD"] },
      { label: "Cardiomegaly on chest X-ray (CTR >0.55)", hint: "Cardiothoracic ratio >0.55 on CXR; indicates chamber enlargement from volume overload", tags: ["Shared"] },
      { label: "Increased pulmonary vascular markings on CXR", hint: "Prominent hilar vascular shadows from increased pulmonary blood flow", tags: ["Shared"] },
      { label: "Pulmonary plethora on CXR", hint: "Engorged pulmonary vessels indicating significant left-to-right shunting and overcirculation", tags: ["Shared"] },
    ],
  },
  {
    category: "Functional & Systemic",
    icon: Zap,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50 dark:bg-orange-950/30",
    accentColor: "border-orange-200 dark:border-orange-900",
    symptoms: [
      { label: "Recurrent episodes of atrial arrhythmia", hint: "Atrial flutter or fibrillation from atrial dilatation; more common in older ASD patients", tags: ["ASD"] },
      { label: "Paradoxical embolism / stroke-like episode", hint: "Emboli crossing right-to-left through the defect; rare but important ASD complication", tags: ["ASD"] },
      { label: "SpO2 <95% on pulse oximetry at rest", hint: "Below 95% at rest is abnormal in children; suggests significant right-to-left shunting", tags: ["Shared"] },
      { label: "Frequent upper respiratory tract infections", hint: "Increased susceptibility from pulmonary congestion; commonly reported by parents", tags: ["Shared"] },
      { label: "Squatting behaviour during physical activity", hint: "Child spontaneously squats to relieve dyspnoea; can occur with pulmonary hypertension", tags: ["Shared"] },
    ],
  },
]

export const ALL_SYMPTOM_LABELS = SYMPTOM_CATEGORIES.flatMap(cat => cat.symptoms.map(s => s.label))

interface SymptomChecklistProps {
  selectedSymptoms: string[]
  onChange: (symptoms: string[]) => void
}

const TAG_STYLES: Record<string, string> = {
  ASD: "text-primary bg-primary/10 border-primary/20",
  VSD: "text-accent-foreground bg-accent border-accent-foreground/20",
  Shared: "text-muted-foreground bg-muted border-border",
}

export function SymptomChecklist({ selectedSymptoms, onChange }: SymptomChecklistProps) {
  const toggleSymptom = (label: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedSymptoms, label])
    } else {
      onChange(selectedSymptoms.filter(s => s !== label))
    }
  }

  const totalSelected = selectedSymptoms.length

  return (
    <div className="space-y-8">
      {/* Header row: count + legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Tag legend:</span>
          {Object.entries(TAG_STYLES).map(([tag, cls]) => (
            <span key={tag} className={`text-xs font-semibold px-2 py-0.5 rounded border ${cls}`}>
              {tag === "Shared" ? "ASD + VSD" : tag}
            </span>
          ))}
        </div>
        {totalSelected > 0 && (
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
            {totalSelected} symptom{totalSelected !== 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      {/* Categories — all fully open */}
      {SYMPTOM_CATEGORIES.map((group, idx) => {
        const Icon = group.icon
        const categorySelected = group.symptoms.filter(s => selectedSymptoms.includes(s.label)).length

        return (
          <div key={idx}>
            {/* Category label */}
            <div className={`flex items-center gap-3 mb-4 pb-3 border-b ${group.accentColor}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${group.iconBg}`}>
                <Icon className={`h-4 w-4 ${group.iconColor}`} />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <h4 className="text-sm font-bold">{group.category}</h4>
                <span className="text-xs text-muted-foreground">({group.symptoms.length})</span>
              </div>
              {categorySelected > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${group.iconBg} ${group.iconColor}`}>
                  {categorySelected} selected
                </span>
              )}
            </div>

            {/* Symptom cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.symptoms.map((symptom, sIdx) => {
                const isChecked = selectedSymptoms.includes(symptom.label)
                const checkboxId = `symptom-${idx}-${sIdx}`
                return (
                  <label
                    key={sIdx}
                    htmlFor={checkboxId}
                    className={`
                      relative flex items-start gap-3 rounded-xl border p-4 cursor-pointer
                      transition-all duration-150 select-none
                      ${isChecked
                        ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/10"
                        : "border-border/60 bg-card hover:border-border hover:bg-muted/30"
                      }
                    `}
                  >
                    <Checkbox
                      id={checkboxId}
                      checked={isChecked}
                      onCheckedChange={(checked) => toggleSymptom(symptom.label, checked === true)}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-start gap-1.5">
                        <span className={`text-sm font-semibold leading-snug ${isChecked ? "text-primary" : "text-foreground"}`}>
                          {symptom.label}
                        </span>
                        {symptom.tags?.map(tag => (
                          <span key={tag} className={`inline-flex flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border ${TAG_STYLES[tag]}`}>
                            {tag === "Shared" ? "Both" : tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{symptom.hint}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Warning if nothing selected */}
      {totalSelected === 0 && (
        <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg px-4 py-3">
          ⚠ No symptoms selected yet. Check every finding currently observed in the patient before running the AI diagnosis.
        </p>
      )}
    </div>
  )
}
