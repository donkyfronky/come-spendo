
import type { Categories } from "@/api"
import { AddSpentFormContent } from "@/components/AddSpentFormContent"
import { AddSpentSheet } from "@/components/AddSpentSheet"
import { useAppDispatch } from "@/store"
import { actionSaveLineItem } from "@/store/slices/lineItems.slice"

export const HomePage = () => {
    const dispatch = useAppDispatch()


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
        }));
    }

    return (<>
        <div className="fixed bottom-6 right-6 md:hidden">
            <AddSpentSheet onSubmit={handleSubmit} />
        </div>
        <AddSpentFormContent onSubmit={handleSubmit} />
    </>)
}
