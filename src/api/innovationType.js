import apiClient from "./apiClient";

// ดึง Innovation Types ทั้งหมด
export const getInnovationTypes = async () => {
  try {
    const res = await apiClient.get("/innovation-types");
    return res.data;
  } catch (err) {
    console.error("Error fetching Innovation Types:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// ดึง Innovation Type ตาม ID
export const getInnovationTypeById = async (id) => {
  try {
    const res = await apiClient.get(`/innovation-types/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching Innovation Type by ID:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// เพิ่ม Innovation Type ใหม่
export const createInnovationType = async (data) => {
  try {
    const res = await apiClient.post("/innovation-types", data);
    return res.data;
  } catch (err) {
    console.error("Error creating Innovation Type:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// อัปเดต Innovation Type ตาม ID
export const updateInnovationType = async (id, data) => {
  try {
    const res = await apiClient.put(`/innovation-types/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating Innovation Type:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// ลบ Innovation Type ตาม ID
export const deleteInnovationType = async (id) => {
  try {
    const res = await apiClient.delete(`/innovation-types/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting Innovation Type:", err);
    return { response_status: "ERROR", message: err.message };
  }
};
