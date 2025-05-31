import React from "react";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// Example reminders data, keyed by date string (YYYY-MM-DD)
const reminders: Record<
  string,
  Array<{
    workerType: string;
    workerCode: string;
    employerName: string;
    employerMobile: string;
    helperName: string;
    notesDetail: string;
  }>
> = {
  "2025-05-25": [
    {
      workerType: "OVERSEA",
      workerCode: "T1222",
      employerName: "Eric Wong",
      employerMobile: "96385741",
      helperName: "Pauline",
      notesDetail: "Want to renew visa",
    },
    {
      workerType: "DIRECT",
      workerCode: "O2782",
      employerName: "Carol Ng",
      employerMobile: "75876766",
      helperName: "Daisy",
      notesDetail: "want to terminate contract",
    },
  ],
  "2025-05-26": [
    {
      workerType: "OVERSEA",
      workerCode: "T23141",
      employerName: "May Chan",
      employerMobile: "86774445",
      helperName: "Susan",
      notesDetail: "/",
    },
  ],
  // ...add more dates and reminders as needed
};

function formatDate(date: Date | undefined) {
  const d = date ?? new Date(); // Use today if date is undefined
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dailyReminder = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const selectedDate = formatDate(date);
  const todayReminders = reminders[selectedDate] || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "1rem",
        alignItems: "start", // ensures both columns align to the top
      }}
    >
      <div style={{ width: "100%", minHeight: "300px" }}>
        <Table style={{ width: "100%" }}>
          <TableCaption>
            {todayReminders.length > 0
              ? `Reminders for ${selectedDate}`
              : `No reminders for ${selectedDate}`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Worker Type</TableHead>
              <TableHead>Worker Code</TableHead>
              <TableHead>Employer Name</TableHead>
              <TableHead>Employer Mobile</TableHead>
              <TableHead>Helper Name</TableHead>
              <TableHead>Notes Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todayReminders.length > 0 ? (
              todayReminders.map((reminder) => (
                <TableRow key={reminder.workerType}>
                  <TableCell className="font-medium">
                    {reminder.workerType}
                  </TableCell>
                  <TableCell>{reminder.workerCode}</TableCell>
                  <TableCell>{reminder.employerName}</TableCell>
                  <TableCell>{reminder.employerMobile}</TableCell>
                  <TableCell>{reminder.helperName}</TableCell>
                  <TableCell>{reminder.notesDetail}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // View more logic here
                        alert(`View more for ${reminder.employerName}`);
                      }}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-400"
                >
                  No reminders for this date.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};

export default dailyReminder;
