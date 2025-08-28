import apiClient from "./apiClient";

export const getAbout = async () => {
  try {
    const res = await apiClient.get("/about");
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};

export const updateAbout = async (data) => {
  try {
    const res = await apiClient.put("/about", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};
