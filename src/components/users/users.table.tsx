import { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateUserModal from "./create.user.modal";
import UpdateUserModal from "./update.user.modal";

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
  password: string;
}
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjY3MmQ4ODg1M2RhOWQyYzM4NjhjZTMwIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjQwMzM0MjEsImV4cCI6MTgxMDQzMzQyMX0.mJp2dtu-aea87TNhewZZ_mpHgfvGAiT-CXHD3KAnw44";

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<any>(undefined);

  useEffect(() => {
    getData();
  }, []);

  const showModal = () => {
    setIsCreateModalOpen(true);
  };

  const getData = async () => {
    const responseUser = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const users = await responseUser.json();
    if (!users.data) {
      notification.error({
        message: JSON.stringify(users.message),
      });
    }
    setListUsers(users.data.result);
  };

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
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setCurrentInfo(record);
                setIsUpdateModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Table User</h2>
        <div>
          <Button onClick={showModal} type={"primary"} icon={<PlusOutlined />}>
            Add new
          </Button>
        </div>
      </div>

      <Table rowKey={"_id"} columns={columns} dataSource={listUsers} />
      <CreateUserModal
        accessToken={accessToken}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        getData={getData}
      />
      <UpdateUserModal
        accessToken={accessToken}
        isModalOpen={isUpdateModalOpen}
        setIsModalOpen={setIsUpdateModalOpen}
        getData={getData}
        currentInfo={currentInfo}
        handleCloseModal={() => setCurrentInfo(undefined)}
      />
    </div>
  );
};
export default UsersTable;
