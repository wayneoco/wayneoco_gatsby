import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Layout } from "../components/common";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
    const captchaRef = useRef(null);
    const [formState, setFormState] = useState({
        userName: null,
        userEmail: null,
        message: null,
    });

    const handleChange = (e) => {
        switch (e.target.name) {
            case "user_name":
                console.log(e.target.value);
                setFormState({ ...formState, userName: e.target.value });
                break;
            case "user_email":
                setFormState({ ...formState, userEmail: e.target.value });
                break;
            case "message":
                setFormState({ ...formState, message: e.target.value });
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = captchaRef.current.getValue();
        const templateId = "contact_form";

        captchaRef.current.reset();

        sendForm(templateId, {
            user_name: formState.userName,
            user_email: formState.userEmail,
            message: formState.message,
            "g-recaptcha-response": token,
        });
    };

    const sendForm = (templateId, parameters) => {
        emailjs
            .send(
                "service_hniq4ik",
                templateId,
                parameters,
                "ZmFbHKNFn--NzrXUC"
            )
            .then(
                (res) => {
                    success();
                },
                (err) => {
                    error(err);
                }
            );
    };

    const success = () => {
        const successMessageWrapper = document.createElement("div");
        successMessageWrapper.classList.add("success-message-wrapper");

        const messageElement = document.createElement("p");
        messageElement.classList.add("success-message");
        messageElement.textContent =
            "Thanks for your message! I'll be in touch with you shortly.";
        successMessageWrapper.appendChild(messageElement);

        const form = document.querySelector("form");
        form.replaceChildren(successMessageWrapper);
    };

    const error = (err) => {
        console.log(err);
        alert(
            "Please complete the reCAPTCHA form in order to send your message."
        );
    };

    return (
        <Layout>
            <div className="container">
                <article className="content">
                    <h1 className="content-title">Contact</h1>
                    <section className="content-body">
                        <p>
                            If there's something I can help you with, or if
                            you'd simply like to drop me a note, I'd love to
                            hear from you.
                        </p>
                        <p>
                            You can also connect with me on&nbsp;
                            <a
                                href="https://twitter.com/wayneo_co"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Twitter
                            </a>
                            .
                        </p>
                        <form id="contact-form" onSubmit={handleSubmit}>
                            <input type="hidden" name="contact_number" />
                            <div className="input-group" data-for="name">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group" data-for="email">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group" data-for="message">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <ReCAPTCHA
                                    className="recaptcha"
                                  sitekey="6LelwCMhAAAAAPa4tyZX3HxI3HcuEx2HyXaNjT3F"
                                    ref={captchaRef}
                                />
                                <div className="submit-group" data-for="submit">
                                    <div id="html_element"></div>
                                    <input type="submit" value="Send" />
                                </div>
                            </div>
                        </form>
                    </section>
                </article>
            </div>
        </Layout>
    );
};

export default Contact;
