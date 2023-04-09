import axios from "axios";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";


function Signup() {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const history = useHistory();
  const [disable, setDisable] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const userdata = { email: inputEmail, password: inputPw };

  const handleEmail = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputEmail(value);
  };

  const handlePW = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputPw(value);
  };

  const handleValid = async (e) => {
    e.preventDefault();
    if (inputEmail.includes("@") && inputPw.length >= 7) {
      setDisable(false);
    }
    try {
      const response = await axios.post(`${API}/auth/signup`, userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("통과");
      console.log(response.data);
      return <Redirect to="/signin"/>
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      Signup
      <form className="Form" onChange={handleValid}>
        <input
          data-testid="email-input"
          placeholder="email"
          required
          type="email"
          name="email"
          onChange={handleEmail}
          value={inputEmail}
        />
        <input
          data-testid="password-input"
          placeholder="password"
          required
          type="password"
          minLength="8"
          onChange={handlePW}
          value={inputPw}
        />
        <button
          data-testid="signup-button"
          disabled={disable}
          // onClick={checkValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
