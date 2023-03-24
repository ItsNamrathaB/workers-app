import axios from "axios";

const headers = {
  Authorization: process.env.REACT_APP_SWAGGER_API_KEY,
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default axios.create({
  baseURL: "https://dev-api-1.sitedocs.com/api/v1/",
  headers,
});
