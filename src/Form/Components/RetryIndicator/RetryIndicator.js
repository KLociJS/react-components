import React from "react";
import "./RetryIndicator.css";

export default function RetryIndicator({ show }) {
  return (
    <>
      {show ? (
        <div className='retrying-indicator'>
          Retrying
          <span className='dot'>.</span>
          <span className='dot'>.</span>
          <span className='dot'>.</span>
        </div>
      ) : null}
    </>
  );
}
