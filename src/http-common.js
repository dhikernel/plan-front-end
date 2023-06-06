import axios from "axios";

export default axios.create({
  baseURL: "http://plan.test/api/",
  headers: {
    "Content-type": "application/json"
  }
});
