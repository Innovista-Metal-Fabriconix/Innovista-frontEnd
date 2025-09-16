import { Form, Input, Button } from "antd";
import AxiosConfig from "../Context/AxiosConfig";

function PasswordReset() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    try {
      const response = AxiosConfig.post(
        `/auth/forgot-password?newPassword=${values.password}`
      );

      console.log("Password reset successful", response);
      alert("Password reset successful");
      form.resetFields();
    } catch (error) {
      console.error("Password reset failed", error);
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
      <Form
        layout="vertical"
        form={form}
        name="reset"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default PasswordReset;
