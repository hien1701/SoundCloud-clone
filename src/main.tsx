import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import './index.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
} from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
import { TeamOutlined, FireOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./App.scss";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    icon: <FireOutlined />,
  },
  {
    label: <Link to={"/users"}>Manage Users</Link>,
    key: "users",
    icon: <TeamOutlined />,
    // disabled: true,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const LayoutAdmin = () => {
  const _login = async () => {
    const params = {
      username: "admin@gmail.com",
      password: "123456",
    };
    const responseUser = await fetch(
      "http://localhost:8000/api/v1/auth/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(params),
      }
    );
    const result = await responseUser.json();
    if (result.data) {
      localStorage.setItem("access_token", result.data.access_token);
    }
  };

  useEffect(() => {
    _login();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },

  {
    path: "/tracks",
    element: <div>Manage Tracks</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
