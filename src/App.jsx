import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./pages/create-trip/CreateTrip";

import MyTrips from "./pages/my-trips/MyTrips";
import AppLayout from "./layout/AppLayout";
import ViewTrip from "./pages/view-trip/[tripid]/ViewTrip";
import HomePage from "./pages/home/HomePage";

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
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
