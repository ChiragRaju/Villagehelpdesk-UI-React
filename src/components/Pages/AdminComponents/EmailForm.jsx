import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function EmailForm() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      recipients: [recipient],
      subject,
      message: `${message}`,
    };

    Axios.post("http://localhost:8000/email/send-email", data)
      .then((response) => {
        console.log("Email sent successfully:", response.data);
        toast.success("Email sent successfully");
        setTimeout(() => {
          window.location.href = "/AdminDashBoard";
        }, 2000);
        // Handle success, e.g., show a success message.
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        // Handle error, e.g., show an error message.
      });
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        background: "#f9f9f9",
      }}
    >
      <h2>Send Feedback Email</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "10px 0" }}>
          <label htmlFor="recipient">Recipient Email:</label>
          <input
            type="email"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label htmlFor="subject">Email Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label htmlFor="message">Feedback Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send Email
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default EmailForm;
