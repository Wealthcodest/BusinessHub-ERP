import {
  getBusinesses,
  saveBusinesses,
  seedBusinesses,
} from "../storage/businessStorage";

/*
|--------------------------------------------------------------------------
| Seed Data
|--------------------------------------------------------------------------
*/

const defaultBusinesses = [
  {
    id: "1",
    name: "Glamour Media House",
    industry: "Media & Advertising",
    owner: "Solomon",
    email: "info@glamourmediahouse.com",
    phone: "+234 800 000 0000",
    website: "www.glamourmediahouse.com",
    country: "Nigeria",
    currency: "NGN",
    status: "active",
    logo: "",
    createdAt: "2026-08-04",
    paymentAccounts: [
      {
        id: "account-default-1",
        bankName: "GTBank",
        accountName: "Glamour Media House",
        accountNumber: "0123456789",
        isPrimary: true,
      },
    ],
  },
];

seedBusinesses(defaultBusinesses);

/*
|--------------------------------------------------------------------------
| Business Service
|--------------------------------------------------------------------------
*/

export const businessService = {
  /*
  |--------------------------------------------------------------------------
  | Get All Businesses
  |--------------------------------------------------------------------------
  */

  async getAll() {
    return getBusinesses();
  },

  /*
  |--------------------------------------------------------------------------
  | Get One Business
  |--------------------------------------------------------------------------
  */

  async getById(id) {
    const businesses = getBusinesses();

    return businesses.find(
      (business) => String(business.id) === String(id)
    );
  },

  /*
  |--------------------------------------------------------------------------
  | Create Business
  |--------------------------------------------------------------------------
  */

  async create(data) {
    const businesses = getBusinesses();

    const paymentAccounts = normalizePaymentAccounts(data.paymentAccounts);
    const business = {
      ...data,
      paymentAccounts,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    businesses.push(business);

    saveBusinesses(businesses);

    return business;
  },

  /*
  |--------------------------------------------------------------------------
  | Update Business
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    const businesses = getBusinesses();

    const updatedBusinesses = businesses.map((business) =>
      String(business.id) === String(id)
        ? {
            ...business,
            ...data,
            paymentAccounts: normalizePaymentAccounts(data.paymentAccounts ?? business.paymentAccounts),
          }
        : business
    );

    saveBusinesses(updatedBusinesses);

    return updatedBusinesses.find(
      (business) => String(business.id) === String(id)
    );
  },

  /*
  |--------------------------------------------------------------------------
  | Delete Business
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    const businesses = getBusinesses();

    const filtered = businesses.filter(
      (business) => String(business.id) !== String(id)
    );

    saveBusinesses(filtered);

    return true;
  },
};

function normalizePaymentAccounts(accounts = []) {
  const complete = (accounts || []).filter(
    (account) => account && (account.bankName || account.accountName || account.accountNumber)
  );

  if (!complete.length) {
    return [];
  }

  const primaryIndex = complete.findIndex((account) => account.isPrimary);

  return complete.map((account, index) => ({
    ...account,
    id: account.id || `account-${Date.now()}-${index}`,
    isPrimary: primaryIndex === -1 ? index === 0 : index === primaryIndex,
  }));
}
