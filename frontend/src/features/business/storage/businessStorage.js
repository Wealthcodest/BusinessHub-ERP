const STORAGE_KEY = "businesshub_businesses";

export function getBusinesses() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveBusinesses(businesses) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(businesses)
  );
}

export function seedBusinesses(defaultBusinesses) {
  const existing = getBusinesses();

  if (existing.length === 0) {
    saveBusinesses(defaultBusinesses);
  }
}