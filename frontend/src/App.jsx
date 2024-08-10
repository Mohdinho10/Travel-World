import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import ToursPage from "./pages/ToursPage";
import TourDetailsPage from "./pages/TourDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResultListPage from "./pages/SearchResultListPage";
import AppLayout from "./components/AppLayout";
import ThankYou from "./pages/ThankYou";
import AddTourPage from "./pages/AddTourPage";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tours/:id" element={<TourDetailsPage />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/tours/search" element={<SearchResultListPage />} />
              <Route path="/add-tour" element={<AddTourPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover={false}
      />
    </QueryClientProvider>
  );
}

export default App;
