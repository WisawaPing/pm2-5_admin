import apiClient from "./apiClient";

export const getLifeLongLearningBanner = async () => {
  try {
    const res = await apiClient.get("/life-long-learning-banner");
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};

export const saveLifeLongLearningBanner = async (data) => {
  try {
    // ใช้ POST เหมือนใน controller (สร้างหรืออัพเดต record เดียว)
    const res = await apiClient.post("/life-long-learning-banner", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};
