import apiClient from "./apiClient";

export const getAcademicNetwork = async () => {
  try {
    const res = await apiClient.get("/academic-network");
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};

export const saveAcademicNetwork = async (data) => {
  try {
    const res = await apiClient.post("/academic-network", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};
