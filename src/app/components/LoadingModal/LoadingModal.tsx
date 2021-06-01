import { FC } from "react";
import { Spin, Modal } from "antd";

const LoadingModal: FC = () => {
  return (
    <Modal
      visible={true}
      closable={false}
      footer={null}
      style={{
        textAlign: "center",
      }}
    >
      <Spin tip="Loading, please wait ..." />
    </Modal>
  );
};

export default LoadingModal;
