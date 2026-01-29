import { deleteCategory, getCategoryList, saveCategory, type Categories } from "@/api/categories"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Trash } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ExpenseCategory() {
    const [state, setState] = useState<Categories[]>([])

    const handleCategoryList = () => getCategoryList().then(res => setState(res))
    const handleSaveCategory = () => {
        const name = (document.getElementById('category-name') as HTMLInputElement).value
        saveCategory(name).then(handleCategoryList)
    }
    const handleDeleteCategory = (id: string) => deleteCategory(id).then(handleCategoryList)

    useEffect(() => {
        handleCategoryList()
    }, [])

    return (
        <>
            <div>
                <Input name="category-name" id="category-name" />
                <Button onClick={handleSaveCategory}>Save</Button>
            </div>
            <Card className="border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {state.map((cat) => (
                            <TableRow key={`table-categories-${cat.id}`}>
                                <TableCell>{cat.name}</TableCell>
                                <TableCell className="text-right">
                                    <div>
                                        <Button variant={"outline"} size="icon" onClick={() => handleDeleteCategory(cat.id)}><Trash /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}
