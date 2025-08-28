import apiClient from "./apiClient";

// ดึง Community Types ทั้งหมด
export const getCommunityTypes = async () => {
  try {
    const res = await apiClient.get("/community-types");
    return res.data;
  } catch (err) {
    console.error("Error fetching Community Types:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// ดึง Community Type ตาม ID
export const getCommunityTypeById = async (id) => {
  try {
    const res = await apiClient.get(`/community-types/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching Community Type by ID:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// สร้าง Community Type ใหม่
export const createCommunityType = async (data) => {
  try {
    const res = await apiClient.post("/community-types", data);
    return res.data;
  } catch (err) {
    console.error("Error creating Community Type:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// อัปเดต Community Type ตาม ID
export const updateCommunityType = async (id, data) => {
  try {
    const res = await apiClient.put(`/community-types/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating Community Type:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// ลบ Community Type ตาม ID
export const deleteCommunityType = async (id) => {
  try {
    const res = await apiClient.delete(`/community-types/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting Community Type:", err);
    return { response_status: "ERROR", message: err.message };
  }
};
