import { Form, Input, InputNumber, Modal, Select, notification } from "antd";
import { FC } from "react";
const { Option } = Select;

interface CreateUserModalProps {
  accessToken: string;
  isModalOpen: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  getData?: () => Promise<void>;
}

const CreateUserModal: FC<CreateUserModalProps> = ({
  accessToken,
  isModalOpen,
  setIsModalOpen,
  getData,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const params = {
      name: values.username,
      email: values.email,
      password: values.password,
      age: values.age,
      gender: values.gender,
      address: values.address,
      role: values.role,
    };
    const responseUser = await fetch("http://localhost:8000/api/v1/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(params),
    });
    const result = await responseUser.json();
    if (result.data) {
      if (getData) {
        await getData();
      }
      notification.success({
        message: "Tạo mới user thành công",
      });
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(result.message),
      });
    }
    handleCancel();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen && setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add new user"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} name="basic" onFinish={onFinish} layout={"vertical"}>
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Username"
          name="username"
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
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
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
export default CreateUserModal;
