import apiClient from "./apiClient";

// ดึงข้อมูล Banner
export const getInnovationBanner = async () => {
  try {
    const res = await apiClient.get("/innovationBanner");
    return res.data;
  } catch (err) {
    console.error("Error fetching Innovation Banner:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

// บันทึกข้อมูล Banner
export const updateInnovationBanner = async (data) => {
  try {
    const res = await apiClient.put("/innovationBanner", data);
    return res.data;
  } catch (err) {
    console.error("Error updating Innovation Banner:", err);
    return { response_status: "ERROR", message: err.message };
  }
};
