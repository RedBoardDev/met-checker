"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { AllocationBreakdown } from "@/components/allocation-breakdown"
import { ChevronDown, ChevronUp } from "lucide-react"

interface WalletData {
  address: string
  allocation: number
  jupStakers: number // Added jupStakers field
  breakdown: {
    points: { name: string; amount: number }[]
    medals: { name: string; amount: number }[]
    others: { name: string; amount: number }[]
  }
}

interface WalletAllocationProps {
  wallet: WalletData
  index: number
}

export function WalletAllocation({ wallet, index }: WalletAllocationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="overflow-hidden bg-card border-border hover:border-muted transition-colors py-0 gap-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
          <span className="text-xl md:text-2xl font-bold text-foreground">{wallet.allocation.toFixed(2)} MET</span>
          <p className="text-xs text-muted-foreground font-mono break-all text-left">{wallet.address}</p>
        </div>
        <div className="ml-3 shrink-0">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border p-4 md:p-5 bg-secondary/20">
          {wallet.jupStakers > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base font-semibold text-foreground">Jupiter Stakers</span>
                <span className="text-lg md:text-xl font-bold text-primary">{wallet.jupStakers.toFixed(2)} MET</span>
              </div>
            </div>
          )}
          <AllocationBreakdown breakdown={wallet.breakdown} />
        </div>
      )}
    </Card>
  )
}
