import { Form, Input, InputNumber, Modal, Select, notification } from "antd";
import { FC, useEffect } from "react";

interface UpdateUserModalProps {
  accessToken: string;
  isModalOpen: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  getData?: () => Promise<void>;
  handleCloseModal?: () => void;
  currentInfo?: {
    name: string;
    role: string;
    gender: string;
    email: string;
    age: string;
    address: string;
    _id: string;
  };
}

const { Option } = Select;

const UpdateUserModal: FC<UpdateUserModalProps> = ({
  accessToken,
  isModalOpen,
  setIsModalOpen,
  getData,
  handleCloseModal,
  currentInfo,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentInfo) {
      form.setFieldsValue({
        name: currentInfo.name,
        email: currentInfo.email,
        age: currentInfo.age,
        gender: currentInfo.gender,
        address: currentInfo.address,
        role: currentInfo.role,
      });
    }
  }, [currentInfo]);

  const handleOk = async () => {
    form.submit();
  };

  const onFinish = async (values: any) => {
    const { name, email, age, gender, address, role } = values;
    const params = {
      name,
      email,
      age,
      gender,
      address,
      role,
      _id: currentInfo?._id,
    };
    const responseUser = await fetch("http://localhost:8000/api/v1/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PATCH",
      body: JSON.stringify(params),
    });
    const result = await responseUser.json();
    if (result.data) {
      if (getData) {
        await getData();
      }
      notification.success({
        message: "Cập nhật thông tin user thành công",
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(result.message),
      });
    }
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen && setIsModalOpen(false);
    handleCloseModal && handleCloseModal();
  };

  return (
    <Modal
      title="Update User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} name="basic" onFinish={onFinish} layout={"vertical"}>
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Password"
          name="password"
          rules={[
            {
              required: currentInfo ? false : true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password disabled={currentInfo ? true : false} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a gender" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          name="role"
          label="Role"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a role" allowClear>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateUserModal;
