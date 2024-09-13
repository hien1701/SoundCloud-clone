import { Input, Modal, notification } from "antd";
import { FC, useState } from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handleOk = async () => {
    const params = {
      name,
      email,
      password,
      age,
      gender,
      address,
      role,
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

  const handleCancel = () => {
    setIsModalOpen && setIsModalOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };

  return (
    <Modal
      title="Add new user"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <label>Name</label>
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>Age</label>
        <Input value={age} onChange={(event) => setAge(event.target.value)} />
      </div>
      <div>
        <label>Gender</label>
        <Input
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
      </div>
      <div>
        <label>Address</label>
        <Input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div>
        <label>Role</label>
        <Input value={role} onChange={(event) => setRole(event.target.value)} />
      </div>
    </Modal>
  );
};
export default CreateUserModal;
