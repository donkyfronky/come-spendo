import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export const AddGoalCTA=()=> {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-8">
          <Button size="lg">
            Add a Goal
          </Button>
        </CardContent>
      </Card>
    )
  }
  