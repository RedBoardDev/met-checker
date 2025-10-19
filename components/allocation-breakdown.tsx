import { Sparkles, Award, Users } from "lucide-react"

interface BreakdownItem {
  name: string
  amount: number
}

interface AllocationBreakdownProps {
  breakdown: {
    points: BreakdownItem[]
    medals: BreakdownItem[]
    others: BreakdownItem[]
  }
}

export function AllocationBreakdown({ breakdown }: AllocationBreakdownProps) {
  return (
    <div className="space-y-8">
      {/* Points Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h4 className="text-base md:text-lg font-semibold text-foreground">Points</h4>
        </div>
        <div className="space-y-3 pl-10">
          {breakdown.points.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm md:text-base text-muted-foreground">{item.name}</span>
              <span className="text-sm md:text-base font-medium text-foreground">{item.amount.toFixed(2)} MET</span>
            </div>
          ))}
        </div>
      </div>

      {/* Medals Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-chart-3/20 flex items-center justify-center">
            <Award className="w-4 h-4 text-chart-3" />
          </div>
          <h4 className="text-base md:text-lg font-semibold text-foreground">Medals</h4>
        </div>
        <div className="space-y-3 pl-10">
          {breakdown.medals.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm md:text-base text-muted-foreground">{item.name}</span>
              <span className="text-sm md:text-base font-medium text-foreground">{item.amount.toFixed(2)} MET</span>
            </div>
          ))}
        </div>
      </div>

      {/* Others Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-chart-5/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-chart-5" />
          </div>
          <h4 className="text-base md:text-lg font-semibold text-foreground">Others</h4>
        </div>
        <div className="space-y-3 pl-10">
          {breakdown.others.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm md:text-base text-muted-foreground">{item.name}</span>
              <span className="text-sm md:text-base font-medium text-foreground">{item.amount.toFixed(2)} MET</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
