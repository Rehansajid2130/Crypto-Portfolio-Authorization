import Dashboard from "./pages/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Support from "./pages/Support/Support";
import TransactionPage from "./pages/Transaction/Transaction";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import "./App.css"
import EmailVerifyPage from "./pages/EmailVerify/EmailVerifyPage";
import RegisterSuccess from "./pages/RegisterSuccess/RegisterSuccessPage";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage";
import ForgetSuccess from "./pages/ForgetSuccess/ForgetSuccess";
import ResetPasswordAlert from "./pages/ResetPassword/ResetPasswordAlert";
import ResetPasswordForm from "./pages/ResetPasswordForm/ResetPasswordForm";
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Signined from "./components/Auth/Signined"


function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element:
        <ProtectedRoute>
          <Dashboard />,

        </ProtectedRoute>
    },
    {
      path: "/transactions",
      element:
        <ProtectedRoute>

          <TransactionPage />,
        </ProtectedRoute>
    },
    {
      path: "/support",
      element: <ProtectedRoute>
        <Support />,

      </ProtectedRoute>
    },
    {
      path: "/signup",
      element: <Signined>

        <Signup />
      </Signined>
    },
    {
      path: "/signin",
      element: <Signined>

        <Login />
      </Signined>
    },
    {
      path: "/sent-verification-mail/:email",
      element: <Signined>
        <EmailVerifyPage />
      </Signined>
    },
    {
      path: "/email-verify/:token",
      element: <Signined>
        <RegisterSuccess />

      </Signined>
    }
    ,
    {
      path: "/ForgetPasswordPage",
      element: <Signined>

        <ForgetPasswordPage />
      </Signined>
    }
    ,
    {
      path: "/forgot-success/:email",
      element: <Signined>

        <ForgetSuccess />
      </Signined>
    }
    ,
    {
      path: "/ResetPasswordAlert",
      element: <Signined>

        <ResetPasswordAlert />
      </Signined>
    }
    ,
    {
      path: "/forgot-password-verify/:token",
      element: <Signined>

        <ResetPasswordForm />
      </Signined>
    }
  ]);

  const queryClient = new QueryClient();

  return (

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
}

export default App;
