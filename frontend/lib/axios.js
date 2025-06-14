"use client";
import axios from "axios";
import { auth } from "../firebase/config";

// For development only — your local backend server
const instance = axios.create({
  baseURL: "http://localhost:8000", // Make sure backend runs here
});

// Add Firebase token to every request (if logged in)
instance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();

    // Ensure headers object exists
    if (!config.headers) {
      config.headers = {};
    }

    // Attach token
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
