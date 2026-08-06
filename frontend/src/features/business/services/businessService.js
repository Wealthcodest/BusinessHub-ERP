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

    const business = {
      ...data,
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