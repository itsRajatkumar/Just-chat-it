export const SuccessResponse = (res, status_code, message, data) => {
  if (data) {
    return res
      .status(status_code)
      .json({ status: true, message: message, data: data });
  }
  return res.status(status_code).json({ status: true, message: message });
};

export const ErrorResponse = (res, status_code, message, data) => {
  if (data) {
    return res
      .status(status_code)
      .json({ status: false, message: message, data: data });
  }
  return res.status(status_code).json({ status: false, message: message });
};
