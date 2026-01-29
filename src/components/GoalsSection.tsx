import { GoalCard } from "./GoalCard"

export const GoalsSection=()=> {
    return (
      <section className="space-y-4">
        <GoalCard
          title="Buy a House"
          icon="🏠"
          current={34000}
          total={50000}
        />
        <GoalCard
          title="Japan Trip"
          icon="✈️"
          current={2100}
          total={5000}
        />
      </section>
    )
  }
  