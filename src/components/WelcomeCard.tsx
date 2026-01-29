import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const WelcomeCard = ()=> {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Good evening, Alex 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You’re <span className="font-medium text-foreground">68%</span> closer
            to your main goal.
          </p>
        </CardContent>
      </Card>
    )
  }
