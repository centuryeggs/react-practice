import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../pages/Layout/index.tsx"
import { Month } from "../pages/Month/index.tsx"
import { Year } from "../pages/Year/index.tsx"
import { New } from "../pages/New/index.tsx"
import { NotFound } from "../pages/NotFound/index.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "month",
        element: <Month />,
      },
      {
        path: "year",
        element: <Year />,
      },
    ]
  },
  {
    path: "/new",
    element: <New />,
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default router