"use client"

import { useRef } from "react"
import { Copy, Download, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ShareCardProps {
  totalAllocation: number
  walletCount: number
}

export function ShareCard({ totalAllocation, walletCount }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = async () => {
    if (!cardRef.current) return

    try {
      const html2canvas = (await import("html2canvas-pro")).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
            ])
            toast.success("Card copied to clipboard!", {
              description: "You can now paste it anywhere"
            })
          } catch (err) {
            console.error("Failed to copy:", err)
            toast.error("Failed to copy to clipboard", {
              description: "Your browser may not support this feature"
            })
          }
        }
      })
    } catch (error) {
      console.error("Failed to copy:", error)
      toast.error("Failed to copy card", {
        description: error instanceof Error ? error.message : "Unknown error"
      })
    }
  }

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      const html2canvas = (await import("html2canvas-pro")).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      const link = document.createElement("a")
      link.download = `meteora-allocation-${Date.now()}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
      toast.success("Card downloaded!", {
        description: "Check your downloads folder"
      })
    } catch (error) {
      console.error("Failed to download:", error)
      toast.error("Failed to download card", {
        description: error instanceof Error ? error.message : "Unknown error"
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/40"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Share Your Allocation</DialogTitle>
          <DialogDescription>
            Download your MET allocation card to share on social media
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Shareable Card */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-xl w-full h-[500px]"
          >
            {/* Background Image */}
            <img
              src="/background.png"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content - Positioned top-right */}
            <div className="absolute right-8 top-8 text-right z-10">
              <div className="text-[4.5rem] md:text-[5rem] font-bold bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-0 tracking-tight leading-none">
                {totalAllocation.toFixed(2)}
              </div>
              <div className="text-3xl md:text-4xl font-semibold text-white">MET</div>
            </div>

            {/* meteora.ag - Bottom right */}
            <div className="absolute bottom-4 right-8 text-base text-white/50 z-10">
              meteora.ag
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} className="flex-1 gap-2" variant="outline">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button onClick={downloadCard} className="flex-1 gap-2 gradient-button">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
