import API from "../services/api";

export const contactAPI = {
  // Submit contact message payload
  submit: (contactData) => API.post("/contact", contactData),
};
export default contactAPI;
