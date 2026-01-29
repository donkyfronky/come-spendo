import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"

interface GoalCardProps {
    title: string
    icon: string
    current: number
    total: number
  }
  
  export const GoalCard=({ title, icon, current, total }: GoalCardProps) =>{
    const percentage = Math.round((current / total) * 100)
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <span className="text-xl">{icon}</span>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
  
        <CardContent className="space-y-3">
          <Progress value={percentage} />
  
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              €{current.toLocaleString()} / €{total.toLocaleString()}
            </span>
            <span className="font-medium text-foreground">
              {percentage}%
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }
  