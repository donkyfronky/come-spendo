import { client } from "./client";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type MonthlySummaryRow = {
  month: number;
  monthName: string;
  in: number;
  out: number;
};

/**
 * Fetches line_items for the given year via Supabase client, then aggregates
 * monthly sums: in = sum where out=false, out = sum where out=true.
 * RLS restricts to the authenticated user.
 */
export const getMonthlyLineItemsSummary = async (
  year: number,
): Promise<MonthlySummaryRow[]> => {
  try {
    const start = `${year}-01-01T00:00:00.000Z`;
    const end = `${year}-12-31T23:59:59.999Z`;

    const { data, error } = await client
      .from("line_items")
      .select("insert_date, total_amount, out")
      .gte("insert_date", start)
      .lte("insert_date", end);

    if (error) throw error;

    const rows = data ?? [];
    const byMonth: Record<number, { in: number; out: number }> =
      Object.fromEntries(
        Array.from({ length: 12 }, (_, i) => [i + 1, { in: 0, out: 0 }]),
      );

    for (const row of rows) {
      const date = new Date(row.insert_date);
      const month = date.getMonth() + 1;
      const amount = Number(row.total_amount);
      if (row.out) {
        byMonth[month].out += amount;
      } else {
        byMonth[month].in += amount;
      }
    }

    return MONTH_NAMES.map((monthName, i) => ({
      month: i + 1,
      monthName,
      in: byMonth[i + 1].in,
      out: byMonth[i + 1].out,
    }));
  } catch (error) {
    console.error("Error getMonthlyLineItemsSummary:", error);
    throw error;
  }
};
