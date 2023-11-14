import React from "react";
import Spinner from "../Spinner/Spinner";
import "./SubmitButton.css";

export default function SubmitButton({ show }) {
  return (
    <button type='submit' className='primary-button' disabled={show}>
      Submit {show ? <Spinner show={show} /> : null}
    </button>
  );
}
