import React, { useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import Input from "../../form/Input";
import styles from "./Register.module.css";
import IndicatesRequired from "../../form/IndicatesRequired";
import MessageRibbon from "../../form/MessageRibbon";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    countryCode: "",
    mobilePhone: "",
    workPhone: "",
    homePhone: "",
    emailAddress: "",
    password: "",
    verifyPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    const errors = [];

    const fieldToLablesMap = {
      firstName: "First name",
      middleName: "Middle name",
      lastName: "Last name",
      countryCode: "Country code",
      mobilePhone: "Mobile phone",
      workPhone: "Work phone",
      homePhone: "Home phone",
      emailAddress: "Email address",
      password: "Password",
      verifyPassword: "Verify password",
    };

    // Validation for required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "countryCode",
      "mobilePhone",
      "emailAddress",
      "password",
      "verifyPassword",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(`${fieldToLablesMap[field]} is required.`);
      }
    });

    // Validation for field lengths
    const fieldsToCheckLength = [
      "firstName",
      "middleName",
      "lastName",
      "emailAddress",
      "password",
      "verifyPassword",
    ];
    fieldsToCheckLength.forEach((field) => {
      if (formData[field] && formData[field].length > 50) {
        errors.push(
          `${fieldToLablesMap[field]} must be 50 characters or less.`
        );
      }
    });

    // Validation for phone numbers (mobile, work, home)
    const phoneFields = ["mobilePhone", "workPhone", "homePhone"];
    phoneFields.forEach((field) => {
      if (
        formData[field] &&
        (formData[field].length > 10 || !isValidPhoneNumber(formData[field]))
      ) {
        errors.push(
          `${fieldToLablesMap[field]} must be 10 characters or less and valid.`
        );
      }
    });

    // Validation for email
    if (formData.emailAddress && !isValidEmail(formData.emailAddress)) {
      errors.push("Invalid email address.");
    }

    // Validation for password and verifyPassword
    if (formData.password !== formData.verifyPassword) {
      errors.push("Passwords do not match.");
    }

    console.log(errors);
    if (errors.length === 0) {
      sessionStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName: formData.firstName,
          password: formData.password,
        })
      );
      setErrorMessages([]);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        countryCode: "",
        mobilePhone: "",
        workPhone: "",
        homePhone: "",
        emailAddress: "",
        password: "",
        verifyPassword: "",
      });
    } else {
      setErrorMessages(errors);
    }
  };

  return (
    <div>
      <Header />
      <MessageRibbon messageList={errorMessages} />
      <IndicatesRequired />
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles["form-container"]}>
          <div className={styles["form-sub-container"]}>
            <Input
              label={"First Name"}
              type={"text"}
              name={"firstName"}
              value={formData.firstName}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              label={"Last Name"}
              type={"text"}
              name={"lastName"}
              value={formData.lastName}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              label={"Mobile Phone"}
              type={"text"}
              name={"mobilePhone"}
              value={formData.mobilePhone}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              label={"Home Phone"}
              type={"text"}
              name={"homePhone"}
              value={formData.homePhone}
              onChange={handleInputChange}
              required={false}
            />
            <Input
              label={"Password"}
              type={"password"}
              name={"password"}
              value={formData.password}
              onChange={handleInputChange}
              required={true}
            />
          </div>
          <div className={styles["form-sub-container"]}>
            <Input
              label={"Middle Name"}
              type={"text"}
              name={"middleName"}
              value={formData.middleName}
              onChange={handleInputChange}
              required={false}
            />
            <Input
              label={"Country Code"}
              type={"select"}
              name={"countryCode"}
              value={formData.countryCode}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              label={"Work Phone"}
              type={"text"}
              name={"workPhone"}
              value={formData.workPhone}
              onChange={handleInputChange}
              required={false}
            />
            <Input
              label={"Email Address"}
              type={"email"}
              name={"emailAddress"}
              value={formData.emailAddress}
              onChange={handleInputChange}
              required={true}
            />
            <Input
              label={"Verify Password"}
              type={"password"}
              name={"verifyPassword"}
              value={formData.verifyPassword}
              onChange={handleInputChange}
              required={true}
            />
          </div>
        </div>
        <div className={styles["button-ribbon"]}>
          <button>Register</button>
          <button>Cancel</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
