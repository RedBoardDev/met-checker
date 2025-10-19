"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { WalletAllocation } from "@/components/wallet-allocation"
import { ShareCard } from "@/components/share-card"
import { fetchWalletAllocation, type MeteoraBreakdown } from "@/lib/meteora-api"

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

function transformApiResponse(address: string, data: MeteoraBreakdown): WalletData {
  return {
    address,
    allocation: data.allocationAmount,
    jupStakers: data.jupStakers, // Include jupStakers from API
    breakdown: {
      points: [
        { name: "LP Stimulus (2024)", amount: data.points.lpStimulus2024 },
        { name: "LP Stimulus (2025)", amount: data.points.lpStimulus2025 },
        { name: "Launchpools Stimulus", amount: data.points.launchpoolsStimulus },
      ],
      medals: [
        { name: "Bin Array Creators", amount: data.medals.binArrayCreators },
        { name: "DBC Creators", amount: data.medals.dbcCreators },
        { name: "Discord Role Holders", amount: data.medals.dcRoleHolders },
        { name: "DLMM Beta Users", amount: data.medals.dlmmBeta },
        { name: "Launchpad Ecosystem", amount: data.medals.launchPadEcosystem },
        { name: "LP Army Contributors", amount: data.medals.lpArmy },
        { name: "Long-Term Liquidity Providers", amount: data.medals.longTermLP },
        { name: "Meteorites", amount: data.medals.meteorites },
        { name: "Welcome Bonus", amount: data.medals.welcomeBonus },
      ],
      others: [
        { name: "Mercurial Stakeholders", amount: data.others.mercurial },
        { name: "M3M3 Stakeholders", amount: data.others.m3m3 },
      ],
    },
  }
}

export function AirdropChecker() {
  const [walletInput, setWalletInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<WalletData[]>([])
  const [hasChecked, setHasChecked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedWallets = localStorage.getItem("meteora-wallet-input")
    if (savedWallets) {
      setWalletInput(savedWallets)
    }
  }, [])

  useEffect(() => {
    if (walletInput) {
      localStorage.setItem("meteora-wallet-input", walletInput)
    }
  }, [walletInput])

  const checkAllocations = async () => {
    setLoading(true)
    setHasChecked(true)
    setError(null)

    const walletAddresses = walletInput
      .split("\n")
      .map((addr) => addr.trim())
      .filter((addr) => addr.length > 0)

    try {
      // Fetch all wallet allocations in parallel
      const allocationPromises = walletAddresses.map((address) =>
        fetchWalletAllocation(address)
          .then((data) => transformApiResponse(address, data))
          .catch((err) => {
            console.error(`Error fetching ${address}:`, err)
            return null
          }),
      )

      const allResults = await Promise.all(allocationPromises)
      const validResults = allResults.filter((result): result is WalletData => result !== null)

      setResults(validResults)

      if (validResults.length === 0) {
        setError("Failed to fetch allocation data for any wallet. Please check the addresses and try again.")
      }
    } catch (err) {
      console.error("Error checking allocations:", err)
      setError("An error occurred while checking allocations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const totalAllocation = results.reduce((sum, wallet) => sum + wallet.allocation + wallet.jupStakers, 0)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex items-center justify-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          MET Airdrop Checker
        </h1>
      </div>

      <div className="gradient-border mb-12">
        <div className="gradient-border-content p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">Check Wallet Allocations</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Enter one or multiple Solana wallet addresses (one per line) to check MET token allocations
          </p>

          <Textarea
            placeholder="Enter wallet addresses (one per line)&#10;Example:&#10;7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU&#10;9xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV&#10;5xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW"
            value={walletInput}
            onChange={(e) => setWalletInput(e.target.value)}
            className="min-h-[180px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/60 font-mono text-sm mb-5 resize-none"
          />

          {error && (
            <div className="mb-5 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            onClick={checkAllocations}
            disabled={loading || !walletInput.trim()}
            className="w-full gradient-button text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Checking Allocations...
              </>
            ) : (
              "Check Allocations"
            )}
          </Button>
        </div>
      </div>

      {hasChecked && !loading && results.length > 0 && (
        <div className="gradient-border mb-12">
          <div className="gradient-border-content p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl text-muted-foreground uppercase tracking-wide mb-2">
                Total Allocation
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Across {results.length} {results.length === 1 ? "wallet" : "wallets"}
              </p>
              <ShareCard totalAllocation={totalAllocation} walletCount={results.length} />
            </div>
            <div className="text-right">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-none mb-2">
                {totalAllocation.toFixed(2)}
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-foreground">MET</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {hasChecked && !loading && results.length > 0 && (
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide">Individual Wallets</h3>
            {results.map((wallet, index) => (
              <WalletAllocation key={index} wallet={wallet} index={index} />
            ))}
          </div>
        </div>
      )}

      {hasChecked && !loading && results.length === 0 && (
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-muted-foreground">
            No valid wallet addresses provided. Please enter at least one wallet address.
          </p>
        </Card>
      )}
    </div>
  )
}
