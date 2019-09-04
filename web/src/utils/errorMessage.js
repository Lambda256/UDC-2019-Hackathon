import { notification } from "antd";

export const extractErrorMessage = function(e) {
  const message = e.error_description || e.message || "";
  const match = message.match(/.+[A-Z_]+:(.+)/);

  if (match && match.length > 1) {
    return match[1];
  }

  return message;
};

export const handleErrorMessage = e => {
  notification["error"]({
    message: extractErrorMessage(e)
  });
};
