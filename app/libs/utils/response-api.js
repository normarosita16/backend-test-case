exports.success = (status, data, message = "Success") => {
  return {
    status,
    message,
    data,
  };
};

exports.error = (status, message) => {
  return {
    status,
    message,
    data: {},
  };
};
