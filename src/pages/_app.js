import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    localStorage.clear(); // Clear all local storage
  }, []);
  return <Component {...pageProps} />;
}
