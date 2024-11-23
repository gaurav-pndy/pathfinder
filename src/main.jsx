import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/CreateTrip";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripid]/ViewTrip";
import { UserProvider } from "./context/UserContext";
import MyTrips from "./my-trips/MyTrips";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/create-trip",
      element: <CreateTrip />,
    },
    {
      path: "/view-trip/:tripid",
      element: <ViewTrip />,
    },
    {
      path: "/my-trips",
      element: <MyTrips />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </UserProvider>
  </StrictMode>
);
