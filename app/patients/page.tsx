import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import connectToDatabase from "@/lib/db"
import Patient from "@/lib/models/Patient"
import { Stethoscope, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function PatientHistoryPage() {
  let allPatients: any[] = [];

  try {
    await connectToDatabase();
    allPatients = await Patient.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error("Database connection failed", error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background/50 pb-12">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Stethoscope className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight text-primary">CardioSense CDSS</h1>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link href="/patients/new">
            <Button size="sm">New Diagnosis</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex flex-1 flex-col p-6 md:p-10 max-w-6xl mx-auto w-full">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Patient History</CardTitle>
            <CardDescription>A comprehensive log of all clinical diagnoses made by the CDSS AI Engine.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        No patients found in the system.
                      </TableCell>
                    </TableRow>
                  ) : (
                    allPatients.map((patient: any) => (
                      <TableRow key={patient._id.toString()}>
                        <TableCell className="font-medium">
                          <Link href={`/patients/${patient._id}`} className="hover:underline text-primary font-semibold">
                            {patient.name}
                          </Link>
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.sex}</TableCell>
                        <TableCell>
                          <Badge variant={
                            patient.diagnosis === 'ASD' ? 'default' : 
                            patient.diagnosis === 'VSD' ? 'secondary' : 'outline'
                          }>
                            {patient.diagnosis}
                          </Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant="outline">{patient.severity}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
