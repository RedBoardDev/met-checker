import { z } from "zod"

export const MeteoraBreakdownSchema = z.object({
  registered: z.boolean(),
  allocationAmount: z.number(),
  jupStakers: z.number(),
  points: z.object({
    lpStimulus2024: z.number(),
    lpStimulus2025: z.number(),
    launchpoolsStimulus: z.number(),
  }),
  medals: z.object({
    welcomeBonus: z.number(),
    binArrayCreators: z.number(),
    longTermLP: z.number(),
    dlmmBeta: z.number(),
    dcRoleHolders: z.number(),
    dbcCreators: z.number(),
    launchPadEcosystem: z.number(),
    lpArmy: z.number(),
    meteorites: z.number(),
  }),
  others: z.object({
    mercurial: z.number(),
    m3m3: z.number(),
  }),
})

export type MeteoraBreakdown = z.infer<typeof MeteoraBreakdownSchema>

export async function fetchWalletAllocation(walletAddress: string): Promise<MeteoraBreakdown> {
  const response = await fetch(`https://nft-distribution-api.meteora.ag/breakdown/${walletAddress}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch allocation for ${walletAddress}`)
  }

  const data = await response.json()
  return MeteoraBreakdownSchema.parse(data)
}
