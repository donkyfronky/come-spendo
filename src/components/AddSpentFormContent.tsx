import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { categoriesSelector, isLoadingCategoriesSelector } from "@/store/selectors/categories.slice"
import { actionGetCategories } from "@/store/slices/categories.slice"
import type { Categories } from "@/api"
import { Switch } from "./ui/switch"

export function AddSpentFormContent({
  id,
  description = '',
  amount = 0,
  categories = [],
  out = true,
  onSubmit,
  onCancel,
}: {
  id?: string
  description?: string
  amount?: number
  categories?: string[]
  out?: boolean
  onSubmit?: (payload: {
    description: string,
    quantity: number,
    unit_price: number,
    amount: number,
    out: boolean,
    tags?: Categories['id'][]
  }) => void,
  onCancel?: () => void
}) {
  const colorTextOut = 'text-red-600'
  const colorTextIn = 'text-green-600'

  const dispatch = useAppDispatch()
  const loadingCategories = useAppSelector(isLoadingCategoriesSelector)
  const categoriesList = useAppSelector(categoriesSelector)


  const [outValue, setOutValue] = useState(out)
  const [descriptionValue, setDescriptionValue] = useState(description || "")
  const [amountValue, setAmountValue] = useState(amount || '')
  const [tags, setTags] = useState<string[]>(categories || [])

  function toggleTag(tag: string) {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const data = {
      id,
      description: descriptionValue,
      amount: Number(amountValue),
      tags,
      quantity: 1,
      out: outValue,
      unit_price: 1
    }

    onSubmit?.(data)
  }

  useEffect(() => {
    dispatch(actionGetCategories())
  }, [dispatch])


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-2">
        <Label htmlFor="airplane-mode" className={colorTextIn}>In</Label>
        <Switch id="airplane-mode" checked={outValue}
          onCheckedChange={() => setOutValue(!outValue)}
          className={"data-[state=unchecked]:bg-green-600 data-[state=checked]:bg-red-600"} />
        <Label htmlFor="airplane-mode" className={colorTextOut}>Out</Label>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="e.g. Grocery shopping"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          required
        />
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>


        <div className='relative'>

          <Input
            id="amount"
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            className="text-xl font-semibold peer pr-13 pl-7"
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
            required
          />
          <span className={`pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm peer-disabled:opacity-50 ${outValue ? colorTextOut : colorTextIn}`}>
            {outValue ? '-' : '+'}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        {!loadingCategories && <div className="flex flex-wrap gap-2">
          {categoriesList.map((tag) => {
            const selected = tags.includes(tag.id)

            return (
              <button
                type="button"
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                aria-pressed={selected}
                className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full"
              >
                <Badge
                  variant={selected ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {tag.name}
                </Badge>
              </button>
            )
          })}
        </div>}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Spent</Button>
      </div>
    </form>
  )
}
