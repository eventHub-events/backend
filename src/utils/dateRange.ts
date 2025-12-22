export function buildDateRangeFilter(
  startDate?: string,
  endDate?: string
): { $gte?: Date; $lte?: Date } | undefined {
  if (!startDate && !endDate) return undefined;

  const from = startDate ? new Date(startDate) : undefined;
  const to = endDate ? new Date(endDate) : new Date(); // default = now

  if (from && isNaN(from.getTime())) return undefined;
  if (to && isNaN(to.getTime())) return undefined;

  return {
    ...(from && { $gte: from }),
    ...(to && { $lte: to }),
  };
}
