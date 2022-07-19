import { useState } from "react";
import Button from "./Button";

import styles from "./ContactForm.module.css";

const ContactForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const clearForm = (e) => {
    e.target.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, message } = e.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }).then((res) => {
      setTimeout(() => {
        console.log("Response Received");
        if (res.status === 200) {
          console.log("Response suceeded!");
        }
        setSubmitted(true);
        setIsSubmitting(false);
      }, 200);
    });

    clearForm(e);
  };

  return (
    <form
      ref={props.contactRef}
      className={`${styles.form} bg-neutral-200`}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" required />
      </div>
      <div className={styles["form-buttons"]}>
        <Button type="submit" primary={true} style="bg-accent-400">Submit</Button>
        <Button type="reset" secondary={true} style="bg-neutral-300">Clear</Button>
      </div>

      {isSubmitting && !submitted && (
        <div className={styles.alert}>Your message is submitting...</div>
      )}
      {!isSubmitting && submitted && (
        <div className={`${styles.alert} ${styles.success}`}>
          <span>Your message has been submitted!</span>
          <img
            src="/x-symbol.svg"
            className={`${styles.close}`}
            onClick={() => setSubmitted(false)}
          ></img>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
