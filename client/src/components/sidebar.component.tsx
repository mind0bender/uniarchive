import {
  Star,
  Home,
  LogOut,
  Settings,
  SidebarOpen,
  SidebarClose,
  FileText,
} from "lucide-react";
import {
  Form,
  NavLink,
  SessionData,
  useRouteLoaderData,
  type NavLinkRenderProps,
} from "react-router-dom";
import { type JSX, useState } from "react";
import RootLayoutLoader from "./layout.component/layout.loader";

function Sidebar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(innerWidth > 768);
  const { loggedIn }: SessionData = useRouteLoaderData<typeof RootLayoutLoader>(
    "layout"
  ) as SessionData;

  return (
    <div className={`flex flex-col justify-between pb-2 gap-4`}>
      {/* {loggedIn + ""} */}
      <div className={`flex flex-col gap-4`}>
        <button
          title={isOpen ? "Close Sidebar" : "Open Sidebar"}
          className={`rounded-full borde border-dark/50 w-fit p-2 bg-secondary outline-none cursor-pointer`}
          onClick={(): void => setIsOpen((pIs: boolean): boolean => !pIs)}>
          {isOpen ? <SidebarClose size={20} /> : <SidebarOpen size={20} />}
        </button>

        <ul className={`flex flex-col gap-4 ${isOpen ? "flex" : "hidden"}`}>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/`}>
              <Home size={18} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/highlights`}>
              <Star size={18} />
              Highlights
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/polocies`}>
              <FileText size={18} />
              Policies
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/settings`}>
              <Settings size={18} />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
      {loggedIn && (
        <Form method={"POST"} action={"/logout"}>
          <button
            className={`flex items-center cursor-pointer gap-2 px-3 rounded-lg py-2 ${
              isOpen || "hidden"
            }`}>
            <LogOut size={18} />
            Logout
          </button>
        </Form>
      )}
    </div>
  );
}

export default Sidebar;
