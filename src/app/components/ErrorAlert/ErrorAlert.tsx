import { FC } from "react";

import { Alert, Typography, Button } from "antd";

const { Paragraph } = Typography;

interface Props {
  message: string;
  reloadFn?: () => void;
}

const ErrorAlert: FC<Props> = ({ message, reloadFn }) => {
  return (
    <Alert
      type="error"
      message="Something went wrong"
      description={
        <>
          <Paragraph>{message}</Paragraph>
          {reloadFn && (
            <Button htmlType="button" onClick={reloadFn} danger>
              Reload categories
            </Button>
          )}
        </>
      }
      style={{ marginBottom: 16 }}
    />
  );
};

export default ErrorAlert;
