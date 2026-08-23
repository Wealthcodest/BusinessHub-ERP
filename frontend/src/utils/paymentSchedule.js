export const emptyPaymentMilestone = (index = 0) => ({
  id: `milestone-${Date.now()}-${index}`,
  label: index === 0 ? "1st Payment" : "Payment",
  percentage: 0,
});

export function paymentScheduleTotal(schedule) {
  return (schedule?.milestones || []).reduce((total, item) => total + Number(item.percentage || 0), 0);
}

export function isValidPaymentSchedule(schedule) {
  return !schedule?.milestones?.length || Math.abs(paymentScheduleTotal(schedule) - 100) < 0.0001;
}

export function paymentScheduleAmounts(schedule, grandTotal) {
  return (schedule?.milestones || []).map((item) => ({ ...item, amount: Number(grandTotal || 0) * Number(item.percentage || 0) / 100 }));
}
