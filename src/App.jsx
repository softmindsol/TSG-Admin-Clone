import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Routes from "./routes/routes";

const App = () => {
  return (
    <>
      <RouterProvider router={Routes} />
      <Toaster />
    </>
  );
};

export default App;
