

let baseUrl = " ";

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:5000"; // Local backend during development
} else {
  baseUrl = "https://securedocs-backend.onrender.com"; // Your production backend URL
}
//Vercel Backend
// https://farmer-broker-connectt.vercel.app
export default baseUrl;