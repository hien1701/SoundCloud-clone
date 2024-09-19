import { Input, Modal, notification } from "antd";
import { FC, useEffect, useState } from "react";

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
  };
}

const UpdateUserModal: FC<UpdateUserModalProps> = ({
  accessToken,
  isModalOpen,
  setIsModalOpen,
  getData,
  handleCloseModal,
  currentInfo,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (currentInfo) {
      setName(currentInfo.name);
      setEmail(currentInfo.email);
      setAge(currentInfo.age);
      setGender(currentInfo.gender);
      setAddress(currentInfo.address);
      setRole(currentInfo.role);
    }
  }, [currentInfo, setIsModalOpen]);

  const handleOk = async () => {
    const params = {
      name,
      email,
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
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
    handleCloseModal && handleCloseModal();
  };

  return (
    <Modal
      title="Update User"
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
export default UpdateUserModal;
