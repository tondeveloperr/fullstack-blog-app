import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home, Login, Register, Single, Write } from "./pages";
import { Footer, Navbar, Page404 } from "./components/molecules";
import "./style.scss";
import Profile from "./pages/profile/Profile";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:username",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <Page404 />,
  },
]);

function App() {
  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
