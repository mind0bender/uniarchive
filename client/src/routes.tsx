import HomePage from "./pages/home/home.page";
import { type RouteObject } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import Layout from "./components/layout.component/layout";
import LoginAction from "./pages/login/login.action";
import LoginLoader from "./pages/login/login.loader";
import LogoutAction from "./pages/logout/logout.loader";
import RegisterPage from "./pages/register/register.page";
import NotFoundPage from "./pages/notfound/notfound.page";
import SystemLayout from "./pages/system/index.system.page";
import LoadingSpinner from "./components/loadingspinner.component";
import RoutesView from "./pages/routes_view/routes_view.page";
import RegisterAction from "./pages/register/register.action";
import RegisterLoader from "./pages/register/register.loader";
import BookCategoryPage from "./pages/books/index.books.page";
import bookCategoryLoader from "./pages/books/index.books.loader";
import CheckInOutPage from "./pages/checkin_out/checkin_out.page";
import RootLayoutLoader from "./components/layout.component/layout.loader";
import CheckInOutLoader from "./pages/checkin_out/checkin_out.loader";
import BookByISBNPage from "./pages/books/isbn.books/isbn.books.page";
import ISBNBookLoader from "./pages/books/isbn.books/isbn.books.loader";
import issueBookAction from "./pages/books/isbn.books/isbn.books.action";
import bookSearchAction from "./components/navbar.comoponent/navbar.component.action";
import CheckInOutSystemPage from "./pages/system/checkinout.system/checkinout.system.page";
import AddBookPage from "./pages/system/book.system/add.book.system.page/add.book.system.page";
import addBookAction from "./pages/system/book.system/add.book.system.page/add.book.system.action";
import HistoryPage from "./pages/history/history.page";
import historyLoader from "./pages/history/history.loader";
import PoliciesPage from "./pages/policies/policies.page";

let routes: RouteObject[] = [];
routes = [
  {
    action: LoginAction,
    loader: LoginLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    path: "/login",
    element: <LoginPage />,
  },
  {
    loader: RegisterLoader,
    action: RegisterAction,
    hydrateFallbackElement: <LoadingSpinner />,
    path: "/register",
    element: <RegisterPage />,
  },
  {
    action: LogoutAction,
    path: "/logout",
  },
  {
    path: "/system",
    element: <SystemLayout />,
    children: [
      {
        path: "checkin-out",
        element: <CheckInOutSystemPage />,
      },
      {
        path: "book",
        children: [
          {
            action: addBookAction,
            path: "add",
            element: <AddBookPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "policies",
        element: <PoliciesPage />,
      },
      {
        path: "booksearch",
        action: bookSearchAction,
      },
      {
        loader: CheckInOutLoader,
        path: "checkin-out",
        element: <CheckInOutPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "books",
        id: "all-books",
        children: [
          {
            hydrateFallbackElement: <LoadingSpinner />,
            index: true,
            element: <BookCategoryPage />,
          },
          {
            hydrateFallbackElement: <LoadingSpinner />,
            path: "genre/:genre",
            element: <BookCategoryPage />,
          },
          {
            loader: ISBNBookLoader,
            hydrateFallbackElement: <LoadingSpinner />,
            path: "isbn/:isbn",
            element: <BookByISBNPage />,
            action: issueBookAction,
          },
        ],
        hydrateFallbackElement: <LoadingSpinner />,
        loader: bookCategoryLoader,
      },
      {
        path: "history",
        element: <HistoryPage />,
        loader: historyLoader,
      },
    ],
    id: "layout",
    loader: RootLayoutLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    element: <Layout />,
  },
];

routes.push({
  path: "/routes",
  element: <RoutesView routes={routes} />,
});

export default routes;
