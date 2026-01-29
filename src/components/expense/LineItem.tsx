
import type { LineItemsList } from "@/api/lineItems";
import { Card, CardContent } from "../ui/card";
import { ChevronDown, ChevronUp, Trash, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "Europe/Rome",
} as const;

const dateFormatter = new Intl.DateTimeFormat("it-IT", options)
const toDate = (s: string) => new Date(s)

const colorOut = 'text-red-600'
const colorIn = 'text-green-600'

export const LineItem = ({ lineItem, onUpdate, onDelete }:
    { lineItem: LineItemsList[0], onUpdate?: (lineItem: LineItemsList[0]) => void, onDelete?: (lineItem: LineItemsList[0]) => void }) => {
    return (
        <Card size="sm" className="mx-auto w-full shadow-sm">
            <CardContent>
                <div className="flex flex-col">

                    <div className="flex items-center gap-4 p-2">
                        <div className="flex items-center rounded-lg border p-4 shadow-sm w-[54px]">
                            {lineItem.out ?
                                <ChevronDown size={24} className={colorOut} /> :
                                <ChevronUp size={24} className={colorIn} />}
                        </div>
                        <div className="mx-0 space-y-0.5 sm:mx-2">
                            <p className="font-semibold">{lineItem.description}</p>
                            <p className="text-muted-foreground text-sm">{dateFormatter.format(toDate(lineItem.insert_date))}</p>
                        </div>
                        <p className={`mx-2 ml-auto text-sm font-semibold ${lineItem.out ? colorOut : colorIn}`}>{lineItem.total_amount}€</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="pt-1">{lineItem.categories.map(cat => (<Badge key={`category-badge-${cat.id}`} className="m-1">{cat.name}</Badge>))}</div>
                        <div className="flex gap-1">
                            <Button variant={"outline"} size="icon" onClick={() => onUpdate?.(lineItem)}><Pencil /></Button>
                            <Button variant={"outline"} size="icon" onClick={() => onDelete?.(lineItem)}><Trash /></Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}