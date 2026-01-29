import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddSpentFormContent } from "./AddSpentFormContent"
import type { Categories } from "@/api"

export function AddSpentSheet({
  id,
  description = '',
  total_amount = 0,
  categories = [],
  defaultOpen = false,
  out = true,
  onSubmit,
  onCancel,
}: {
  id?: string
  description?: string
  total_amount?: number
  categories?: Categories[]
  defaultOpen?: boolean
  out?: boolean
  onSubmit?: (payload: {
    description: string,
    quantity: number,
    unit_price: number,
    amount: number,
    out: boolean,
    tags?: Categories['id'][],
  }) => void
  onCancel?: () => void
}) {
  const [open, setOpen] = useState(defaultOpen)
  //saveLineItems(descriptionValue, 1, 1, Number(amountValue), tags).then(res => console.log('ok', res)).catch(err => console.log(err))
  const handleSubmit = (payload: {
    description: string,
    quantity: number,
    unit_price: number,
    amount: number,
    out: boolean,
    tags?: Categories['id'][],
  }) => {
    onSubmit?.(payload)
    setOpen(false)
  }

  const handleOnCancel = () => {
    onCancel?.()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full h-14 w-14">
          <Plus className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="rounded-t-2xl max-h-[90vh] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Add Spent</SheetTitle>
        </SheetHeader>

        <div className="pt-4">
          <AddSpentFormContent
            id={id}
            description={description}
            amount={total_amount}
            out={out}
            categories={categories.map(cat => cat.id)}
            onSubmit={handleSubmit}
            onCancel={handleOnCancel}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
