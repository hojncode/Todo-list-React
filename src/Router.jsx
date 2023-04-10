import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Todo from "./routes/Todo";
// import Home from "./routes/Home";
// import Header from "./ components/Header";
import Root from "./Root";
import NotFound from "./routes/NotFound";
import ErrorComponent from "./ components/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "" || "signup",
        element: <Signup />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "todo",
        element: <Todo />,
      },
    ],
    errorElement: <NotFound/>
  },
]);

//legacy
// function Router() {
//   return (
//     <>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Signup />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/todo" element={<Todo />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

export default router;
