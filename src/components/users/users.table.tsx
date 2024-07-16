import { useEffect, useState } from "react";
// import "../../styles/users.css";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface IUser {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  type: string;
  role: string;
  name: string;
  isVerify: boolean;
  gender: "MALE" | "FEMALE";
  email: string;
  age: number;
  address: string;
}

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjY3MmQ4ODg1M2RhOWQyYzM4NjhjZTMwIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjEwOTMxMTksImV4cCI6MTgwNzQ5MzExOX0.RId3w6T7ns3Ryfob8xlvkzJo25stdXC0VZHcBMKzJSk";

    const responseUser = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const users = await responseUser.json();
    setListUsers(users.data.result);
  };

  console.log("check render users", listUsers);
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div>
      <h2>Table User</h2>
      <Table columns={columns} dataSource={listUsers} />
      {/* <table>
        <thead>
          <tr>
            <td>Email</td>
            <td>Name</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user: IUser) => {
            return (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};
export default UsersTable;
