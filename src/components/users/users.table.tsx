import { useEffect, useState } from "react";
import { Table, Button, notification, message, Popconfirm } from "antd";
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
const accessToken = localStorage.getItem("access_token") ?? "";

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<any>(undefined);
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, [meta.current]);

  const showModal = () => {
    setIsCreateModalOpen(true);
  };

  const getData = async () => {
    const responseUser = await fetch(
      `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const users = await responseUser.json();
    if (!users.data) {
      notification.error({
        message: JSON.stringify(users.message),
      });
    }
    setListUsers(users.data.result);
    setMeta({
      current: users.data.meta.current,
      pageSize: users.data.meta.pageSize,
      pages: users.data.meta.pages,
      total: users.data.meta.total,
    });
  };

  const _onConfirmDeleteUser = async (_id: string, userName: string) => {
    const responseUser = await fetch(
      `http://localhost:8000/api/v1/users/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      }
    );
    const result = await responseUser.json();
    if (result.data) {
      message.success(`Delete user ${userName} success!`);
      await getData();
    } else {
      message.error("Delete user failed!");
    }
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
            <Button
              onClick={() => {
                setCurrentInfo(record);
                setIsUpdateModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete a user"
              description={`Are you sure to delete this user (${record.name})?`}
              onConfirm={() => _onConfirmDeleteUser(record._id, record.name)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: 10 }} danger>
                Delete
              </Button>
            </Popconfirm>
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
      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={listUsers}
        pagination={{
          current: meta.current,
          total: meta.total,
          pageSize: meta.pageSize,
          onChange: async (page) => {
            setMeta({ ...meta, current: page });
          },
        }}
      />
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
