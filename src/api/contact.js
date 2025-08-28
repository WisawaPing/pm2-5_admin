import apiClient from "./apiClient";

export const getContact = async () => {
  try {
    const res = await apiClient.get("/contact");
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};

export const updateContact = async (data) => {
  try {
    const res = await apiClient.put("/contact", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return { response_status: "ERROR", message: err.message };
  }
};
