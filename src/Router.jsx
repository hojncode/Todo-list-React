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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "" || "signup",
        element: <Signup />,
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
