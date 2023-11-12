import React from "react";

const DisplayError = ({ errors }) => {
  if (!errors) return null;

  return errors.map((error) => (
    <p key={error} className='error-msg'>
      {error}
    </p>
  ));
};

export default DisplayError;
