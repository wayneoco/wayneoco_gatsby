//import * as React from "react";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from "gatsby";
import { Layout } from "../components/common";
import ReCAPTCHA from "react-google-recaptcha";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', userEmail: '', message: '' };
        this.captchaRef = React.createRef(null);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Layout>
                <div className="container">
                    <article className="content">
                        <h1 className="content-title">Contact</h1>
                        <section className="content-body">
                            <p>If there's something I can help you with, or if you'd simply like to drop me a note, I'd love to hear from you.</p>
                            <p>You can also connect with me on&nbsp;
                                <a
                                    href='https://twitter.com/wayneo_co'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter
                                </a>.
                            </p>
                            <form id="contact-form" onSubmit={this.handleSubmit}>
                                <input type="hidden" name="contact_number" />
                                <div className="input-group" data-for="name">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group" data-for="email">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group" data-for="message">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        onChange={this.handleChange}
                                        required
                                    >
                                    </textarea>
                                </div>
                                <ReCAPTCHA
                                    className="recaptcha"
                                    sitekey="6LelwCMhAAAAAPa4tyZX3HxI3HcuEx2HyXaNjT3F"
                                    ref={this.captchaRef}
                                />
                                <div className="submit-group" data-for="submit">
                                <div id="html_element"></div>
                                    <input type="submit" value="Send" />
                                </div>
                            </form>
                        </section>
                    </article>
                </div>
            </Layout>
        );
    }

    handleChange(e) {
        switch(e.target.name) {
            case 'user_name':
                this.setState({ userName: e.target.value });
                break;
            case 'user_email':
                this.setState({ userEmail: e.target.value });
                break;
            case 'message':
                this.setState({ message: e.target.value });
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const token = this.captchaRef.current.getValue();
        const templateId = 'contact_form';

        this.captchaRef.current.reset();

        this.sendForm(
            templateId,
            {
                'user_name': this.state.userName,
                'user_email': this.state.userEmail,
                'message': this.state.message,
                'g-recaptcha-response': token,
            },
        );
    }

    success() {
      const successMessageWrapper = document.createElement('div');
      successMessageWrapper.classList.add('success-message-wrapper');

      const messageElement = document.createElement('p');
      messageElement.classList.add('success-message');
      messageElement.textContent = 'Thanks for your message! I\'ll be in touch with you shortly.';
      successMessageWrapper.appendChild(messageElement);

      const form = document.querySelector('form');
      form.replaceChildren(successMessageWrapper);
    }

    error() {
      alert('Please complete the reCAPTCHA form in order to send your message.');
    }

    sendForm(templateId, parameters) {
        emailjs.send(
            'service_hniq4ik',
            templateId,
            parameters,
            'ZmFbHKNFn--NzrXUC'
        ).then(res => {
            this.success();
        }, (error) => {
            this.error();
        });
    }
}
