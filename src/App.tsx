import { AddGoalCTA } from './components/AddGoalCTA'
import { AddSpentFormContent } from './components/AddSpentFormContent'

import { AddSpentSheet } from './components/AddSpentSheet'
import { GoalsSection } from './components/GoalsSection'
import { MonthlyOverview } from './components/MonthlyOverview'
import { Navbar } from './components/Navbar'
import { WelcomeCard } from './components/WelcomeCard'

function App() {

  return (
    <>
      <Navbar />
      <div className="fixed bottom-6 right-6 md:hidden">
        <AddSpentSheet />
      </div>
      {/* Offset for fixed navbar */}
      <main className="pt-14">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="rounded-lg border bg-card p-6">
            <WelcomeCard />
            <GoalsSection />
            <MonthlyOverview />
            <AddGoalCTA />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <AddSpentFormContent />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
