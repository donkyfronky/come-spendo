import { useEffect, useMemo, useState } from "react";
import * as RechartsPrimitive from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { useAppDispatch, useAppSelector } from "@/store";
import { actionGetMonthlyLineItemsSummary } from "@/store/slices/monthlySummary.slice";
import {
    isLoadingMonthlySummarySelector,
    monthlySummarySelector,
} from "@/store/selectors";

const chartConfig = {
    in: {
        label: "In",
        color: "hsl(142, 76%, 36%)",
    },
    out: {
        label: "Out",
        color: "hsl(0, 84%, 60%)",
    },
    monthName: {
        label: "Month",
    },
} satisfies ChartConfig;

export const UserHomepage = () => {
    const dispatch = useAppDispatch();
    const summary = useAppSelector(monthlySummarySelector);
    const isLoading = useAppSelector(isLoadingMonthlySummarySelector);
    const [year, setYear] = useState(() => new Date().getFullYear());

    useEffect(() => {
        dispatch(actionGetMonthlyLineItemsSummary(year));
    }, [dispatch, year]);

    const years = useMemo(() => {
        const current = new Date().getFullYear();
        return Array.from({ length: 11 }, (_, i) => current - i);
    }, []);

    // "in" above zero, "out" below zero (stored as negative for the chart)
    const chartData = useMemo(
        () =>
            summary.map((row) => ({
                ...row,
                out: -row.out,
            })),
        [summary],
    );

    if (isLoading) {
        return (
            <div className="flex min-h-[200px] items-center justify-center">
                <span className="text-muted-foreground">Loading…</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
                <label className="text-sm font-medium" htmlFor="year-select">
                    Year
                </label>
                <select
                    id="year-select"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="border-input bg-background ring-offset-background focus-visible:ring-ring h-9 rounded-md border px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsPrimitive.LineChart
                    data={chartData}
                    margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
                >
                    <RechartsPrimitive.CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                    <RechartsPrimitive.XAxis
                        dataKey="monthName"
                        tickLine={false}
                        axisLine={false}
                    />
                    <RechartsPrimitive.YAxis
                        tickLine={false}
                        axisLine={false}
                        domain={["auto", "auto"]}
                        tickFormatter={(v) =>
                            typeof v === "number"
                                ? v.toLocaleString()
                                : String(v)
                        }
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                formatter={(value, name) =>
                                    name === "Out" && typeof value === "number"
                                        ? Math.abs(value).toLocaleString()
                                        : typeof value === "number"
                                            ? value.toLocaleString()
                                            : value
                                }
                            />
                        }
                    />
                    <RechartsPrimitive.Line
                        type="monotone"
                        dataKey="in"
                        name="In"
                        stroke="var(--color-in)"
                        strokeWidth={2}
                        dot={false}
                    />
                    <RechartsPrimitive.Line
                        type="monotone"
                        dataKey="out"
                        name="Out"
                        stroke="var(--color-out)"
                        strokeWidth={2}
                        dot={false}
                    />
                </RechartsPrimitive.LineChart>
            </ChartContainer>
        </div>
    );
};
