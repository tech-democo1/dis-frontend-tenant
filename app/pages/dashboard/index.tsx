import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import QuickAccessTables from "~/components/quickAccessCard/quickAccessTables";
import DailyReminder from "~/components/dailyReminder";

const dashboard = () => {
  return (
    <>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>System News</CardTitle>
          </CardHeader>
          <CardContent>
            <p>TODO</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weather Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>TODO</p>
          </CardContent>
        </Card>
      </div>
      <Card style={{ marginTop: "2rem" }}>
        <CardContent>
          <DailyReminder />
        </CardContent>
      </Card>
      <Card style={{ marginTop: "2rem" }}>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickAccessTables />
        </CardContent>
      </Card>
    </>
  );
};

export default dashboard;
