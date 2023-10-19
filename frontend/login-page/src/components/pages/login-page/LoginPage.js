import React, { useState } from "react";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import Input from "../../form/Input";
import styles from "./LoginPage.module.css";
import IndicatesRequired from "../../form/IndicatesRequired";
import MessageRibbon from "../../form/MessageRibbon";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        emailAddress: "",
        password: "",
      });
      
      const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const errors = [];

    const fieldToLablesMap = {
        emailAddress: "Login Id",
        password: "Password",
    }; 

    // Validation for required fields
    const requiredFields = [
        "emailAddress",
        "password",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          errors.push(`${fieldToLablesMap[field]} is required.`);
        }
      });
      };

      return (
        <div>
          <Header />
          <MessageRibbon messageList={errorMessages} />
          <IndicatesRequired />
          <form onSubmit={handleSubmit} noValidate>
          <div className={`row ${styles['d-flex']}`}>
              <div className={`col-md-3 ${styles.center}`}>
              <Input
                  label={"Login Id"}
                  type={"email"}
                  name={"emailAddress"}
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required={true}
                />
                <Input
                  label={"Password"}
                  type={"password"}
                  name={"password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required={true}
                  />
                  <button>Register</button>
                  <div className={styles["form-sub-container"]}>
                  </div>
                  <button>Login</button>
              </div>
            </div>
            <div className={styles["button-ribbon"]}>
            </div>
          </form>
          <Footer />
        </div>
      );
  };
export default LoginPage;