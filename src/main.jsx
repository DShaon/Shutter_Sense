import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <div className="relative">
  
      <div
        className="inset-0 fixed"
        style={{
          backgroundImage: "url('https://i.ibb.co/PtcJqLn/1920902.jpg')",
          backgroundSize: "cover",
          filter: "blur(10px)",
          zIndex: -1,
        }}
      ></div>
      <div className="relative ">
          <RouterProvider router={router} />
        
      </div>
    </div>

        
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);



// .bg-blur {
//     backdrop-filter: blur(12px);
//   }
