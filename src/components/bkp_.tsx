import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store"
import { categoriesSelector, isLoadingCategoriesSelector } from "@/store/selectors/categories.slice"
import { actionGetCategories } from "@/store/slices/categories.slice"
import { saveLineItems } from "@/api/lineItems"

export function AddSpentFormContent({
  onSubmit,
  onCancel,
}: {
  onSubmit?: () => void
  onCancel?: () => void
}) {
  const dispatch = useAppDispatch()
  const loadingCategories = useAppSelector(isLoadingCategoriesSelector)
  const categories = useAppSelector(categoriesSelector)

  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [tags, setTags] = useState<string[]>([])

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
      description,
      amount: Number(amount),
      tags,
    }

    saveLineItems(description, 1, 1, parseFloat(amount), tags).then(res => console.log('ok', res)).catch(err => console.log(err))
    console.log("Spent submitted:", data)
    onSubmit?.()
  }

  useEffect(() => {
    dispatch(actionGetCategories())
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="e.g. Grocery shopping"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          inputMode="decimal"
          placeholder="0.00"
          className="text-xl font-semibold"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        {!loadingCategories && <div className="flex flex-wrap gap-2">
          {categories.map((tag) => {
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
