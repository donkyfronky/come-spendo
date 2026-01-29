
import type { Categories } from "@/api"
import { getLineItemsList, type LineItemsList } from "@/api/lineItems"
import { AddSpentSheet } from "@/components/AddSpentSheet"
import { LineItem } from "@/components/expense"
import { useAppDispatch } from "@/store"
import { actionSaveLineItem } from "@/store/slices/lineItems.slice"
import { useEffect, useState } from "react"

// gap-4 rounded-lg border p-4
export const ExpensesPage = () => {
    const [state, setState] = useState<LineItemsList>([])
    const [selectedLineItem, setSelectedLineItem] = useState<LineItemsList[0] | undefined>()
    const dispatch = useAppDispatch()


    const fetchLineItems = () => {
        getLineItemsList().then(res => setState(res))
    }
    const handleSubmit = (data: {
        id?: string, description: string,
        quantity: number,
        unit_price: number,
        amount: number,
        out: boolean,
        tags?: Categories['id'][]
    }) => {
        dispatch(actionSaveLineItem({
            ...data,
            total_amount: data.amount,
        })).unwrap().then(fetchLineItems);
    }

    useEffect(() => {
        fetchLineItems()
    }, [])

    return (<div className="flex flex-col gap-2">
        {
            state.length > 0 ? state.map(lineItem => (<LineItem key={`LineItem-${lineItem.id}`} lineItem={lineItem} onUpdate={setSelectedLineItem} />)) : <div>No expenses found</div>
        }

        {selectedLineItem && <AddSpentSheet onSubmit={handleSubmit} key={selectedLineItem.id} defaultOpen={true} onCancel={() => setSelectedLineItem(undefined)} {...selectedLineItem} />}

    </div >)
}