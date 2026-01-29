import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const MonthlyOverview=()=> {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              Spent: <span className="font-medium">€1,980</span>
            </p>
            <p className="text-muted-foreground">
              Budget left: €420
            </p>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Save €300 more to reach <span className="font-medium text-foreground">70%</span>
          </CardContent>
        </Card>
      </section>
    )
  }
  