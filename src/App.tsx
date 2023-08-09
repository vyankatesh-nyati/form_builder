import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditPage from "./pages/Edit";
import AllForms from "./pages/AllForms";
import Layout from "./Layout";
import Form from "./pages/Form";
import Submit from "./pages/Submit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllForms />,
      },
      {
        path: "/create-new-form",
        element: <EditPage />,
      },
      {
        path: "/submit",
        element: <Submit />,
      },
    ],
  },
  {
    path: "/form/:id",
    element: <Form />,
  },
]);

function App() {
  return (
    <div className="App bg-[#DAFFFB] min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
