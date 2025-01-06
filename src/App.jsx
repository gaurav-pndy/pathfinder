import "./App.css";

import Hero from "./components/custom/Hero";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/CreateTrip";
import ViewTrip from "./view-trip/[tripid]/ViewTrip";
import MyTrips from "./my-trips/MyTrips";
import AppLayout from "./layout/AppLayout";

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Hero />,
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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
