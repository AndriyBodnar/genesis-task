import axios from "axios";
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODY3NzRiOC00OWQ1LTRhNzItODFmOS1kNjBmOTU0Nzg0ZTgiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3Mjk4NDAsImV4cCI6MTY3OTYyOTg0MH0.Jj_LWHv9IxQrXbCeVwuAmx3S8ipq16ZcmtDVXuLfQP8";

const instance = axios.create({
  baseURL: "https://api.wisey.app/api/v1/core/preview-courses",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  params: {
    token: accessToken,
  },
});

export default class CoursesService {
  static async getAll() {
    const response = await instance.get().catch((e) => console.log(e));
    return response;
  }

  static async getById(id) {
    const response = await instance.get(`${id}`).catch((e) => console.log(e));
    return response;
  }
}
