import mockBusinesses from "../data/mockBusinesses";

let businesses = [...mockBusinesses];

export const businessService = {
  // ==========================
  // GET ALL BUSINESSES
  // ==========================
  async getAll() {
    return [...businesses];
  },

  // ==========================
  // GET BUSINESS BY ID
  // ==========================
  async getById(id) {
    return (
      businesses.find(
        (business) => business.id === Number(id)
      ) || null
    );
  },

  // ==========================
  // CREATE BUSINESS
  // ==========================
  async create(data) {
    const newBusiness = {
      id: Date.now(),

      ...data,

      createdAt: new Date()
        .toISOString()
        .split("T")[0],
    };

    businesses.unshift(newBusiness);

    return newBusiness;
  },

  // ==========================
  // UPDATE BUSINESS
  // ==========================
  async update(id, data) {
    const index = businesses.findIndex(
      (business) => business.id === Number(id)
    );

    if (index === -1) {
      throw new Error("Business not found.");
    }

    businesses[index] = {
      ...businesses[index],
      ...data,
    };

    return businesses[index];
  },

  // ==========================
  // DELETE BUSINESS
  // ==========================
  async delete(id) {
    const index = businesses.findIndex(
      (business) => business.id === Number(id)
    );

    if (index === -1) {
      throw new Error("Business not found.");
    }

    businesses.splice(index, 1);

    return true;
  },

  // ==========================
  // SEARCH BUSINESSES
  // ==========================
  async search(keyword = "") {
    if (!keyword.trim()) {
      return [...businesses];
    }

    const search = keyword.toLowerCase();

    return businesses.filter((business) =>
      [
        business.name,
        business.industry,
        business.owner,
        business.email,
        business.phone,
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(search)
        )
    );
  },

  // ==========================
  // FILTER BY STATUS
  // ==========================
  async filterByStatus(status) {
    if (!status) return [...businesses];

    return businesses.filter(
      (business) => business.status === status
    );
  },

  // ==========================
  // BUSINESS STATISTICS
  // ==========================
  async getStatistics() {
    const total = businesses.length;

    const active = businesses.filter(
      (business) => business.status === "active"
    ).length;

    const inactive = businesses.filter(
      (business) => business.status === "inactive"
    ).length;

    return {
      total,
      active,
      inactive,
    };
  },
};

export default businessService;