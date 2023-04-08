import { useState } from "react";

function Signup() {
  const [disable, setDisable] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  
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

  const handleValid = (e) => {
    e.preventDefault();
    if (inputEmail.includes("@") && inputPw.length >= 7) {
      setDisable(false);
    }

  };

  return (
    <div className="App">
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
