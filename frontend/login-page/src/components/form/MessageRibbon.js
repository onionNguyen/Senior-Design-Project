import React from "react";

const MessageRibbon = ({ messageList }) => {
  return (
    <>
      <ul>
        {messageList.map((message, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    </>
  );
};

export default MessageRibbon;