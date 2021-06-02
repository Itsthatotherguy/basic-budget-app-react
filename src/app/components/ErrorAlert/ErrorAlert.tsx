import { FC } from "react";

import { Alert, Typography } from "antd";

const { Paragraph } = Typography;

interface Props {
  errors: string[];
}

const ErrorAlert: FC<Props> = ({ errors }) => {
  return (
    <Alert
      type="error"
      message="Something went wrong"
      description={
        <>
          <Paragraph>The following errors are present:</Paragraph>
          <Paragraph>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Paragraph>
        </>
      }
      style={{ marginBottom: 16 }}
    />
  );
};

export default ErrorAlert;
