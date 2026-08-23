const asNumber = (value) => Number(value || 0);

export const getInvoiceDate = (invoice) => invoice.issueDate || invoice.createdAt || "";

export function isInvoiceInRange(invoice, range) {
  const date = getInvoiceDate(invoice);
  return Boolean(date && date >= range.start && date <= range.end);
}

export function getInvoiceBalance(invoice) {
  return Math.max(0, asNumber(invoice.balance ?? asNumber(invoice.grandTotal) - asNumber(invoice.amountPaid)));
}

export function calculateRevenue(invoices) {
  return invoices.filter((invoice) => invoice.status !== "cancelled").reduce((total, invoice) => total + asNumber(invoice.amountPaid), 0);
}

export function calculateOutstanding(invoices) {
  return invoices.filter((invoice) => invoice.status !== "cancelled").reduce((total, invoice) => total + getInvoiceBalance(invoice), 0);
}

export function calculatePaidInvoices(invoices) {
  const paid = invoices.filter((invoice) => invoice.status === "paid");
  return { count: paid.length, value: paid.reduce((total, invoice) => total + asNumber(invoice.grandTotal), 0) };
}

export function calculateOverdue(invoices) {
  const overdue = invoices.filter((invoice) => invoice.status === "overdue");
  return { count: overdue.length, value: calculateOutstanding(overdue) };
}

export function calculateCollectionRate(invoices) {
  const invoiced = invoices.reduce((total, invoice) => total + asNumber(invoice.grandTotal), 0);
  return invoiced ? (calculateRevenue(invoices) / invoiced) * 100 : 0;
}

export function calculateInvoiceStatusBreakdown(invoices) {
  const labels = { draft: "Draft", sent: "Sent", partially_paid: "Partially Paid", paid: "Paid", overdue: "Overdue", cancelled: "Cancelled" };
  return Object.keys(labels).map((status) => ({ status, label: labels[status], count: invoices.filter((invoice) => invoice.status === status).length }));
}

export function calculateRevenueTrend(invoices, range) {
  const start = new Date(`${range.start}T00:00:00`);
  const end = new Date(`${range.end}T00:00:00`);
  const days = Math.max(1, Math.round((end - start) / 86400000) + 1);
  const buckets = days <= 14 ? days : Math.min(6, days);
  const interval = Math.ceil(days / buckets);

  return Array.from({ length: buckets }, (_, index) => {
    const bucketStart = new Date(start); bucketStart.setDate(start.getDate() + index * interval);
    const bucketEnd = new Date(bucketStart); bucketEnd.setDate(bucketStart.getDate() + interval - 1);
    const items = invoices.filter((invoice) => {
      const date = new Date(`${getInvoiceDate(invoice)}T00:00:00`);
      return date >= bucketStart && date <= bucketEnd;
    });
    return { label: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(bucketStart), invoiced: items.reduce((total, item) => total + asNumber(item.grandTotal), 0), collected: calculateRevenue(items), outstanding: calculateOutstanding(items) };
  });
}

export function calculateTopCustomers(invoices, customers) {
  const customerMap = new Map(customers.map((customer) => [String(customer.id), customer]));
  return [...invoices.reduce((map, invoice) => {
    const id = String(invoice.customerId || "unknown");
    const existing = map.get(id) || { id, customer: customerMap.get(id), invoices: 0, invoiced: 0, paid: 0, outstanding: 0 };
    existing.invoices += 1; existing.invoiced += asNumber(invoice.grandTotal); existing.paid += asNumber(invoice.amountPaid); existing.outstanding += getInvoiceBalance(invoice);
    map.set(id, existing); return map;
  }, new Map()).values()].sort((first, second) => second.invoiced - first.invoiced);
}

export function calculateRecentTransactions(invoices, businesses, customers) {
  const businessMap = new Map(businesses.map((business) => [String(business.id), business]));
  const customerMap = new Map(customers.map((customer) => [String(customer.id), customer]));
  return [...invoices].sort((first, second) => String(getInvoiceDate(second)).localeCompare(String(getInvoiceDate(first)))).map((invoice) => ({ ...invoice, customer: customerMap.get(String(invoice.customerId)), business: businessMap.get(String(invoice.businessId)), balance: getInvoiceBalance(invoice) }));
}
