const validateInputType = (type, allowedTypes) => {
  if (!allowedTypes.includes(type)) {
    throw new Error(
      `Unsupported form input type: '${type}'. Allowed types are: ${allowedTypes.join(
        ", "
      )}. Use appropriate component`
    );
  }
};

export default validateInputType;
