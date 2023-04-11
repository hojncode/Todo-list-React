import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useNavigate } from "react-router-dom";

function Signup() {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const [disable, setDisable] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const userdata = { email: inputEmail, password: inputPw };
  const access_token = localStorage.getItem("JWTtoken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "이메일 주소와 패스워드를 입력해 주세요.(가입 성공시 로그인 페이지로 이동합니다.)"
  );

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

  const handleValidSumbit = async (e) => {
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
      console.log(response.status);
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      if (error.response.data.message.includes("이미")) {
        setErrorMsg(error.response.data.message);
      } else if (
        error.response.data.message.includes("email must contain a @ string")
      ) {
        setErrorMsg("이메일 주소와 패스워드를 입력해 주세요.");
      } else if (
        error.response.data.message.includes(
          "password must be longer than or equal to 8 characters"
        ) ||
        inputEmail.includes(".com" || ".net")
      ) {
        setErrorMsg("패스워드는 8자리 이상입니다.");
      }
    }
  };

  useEffect(() => {
    if (access_token !== null) {
      setLoading(true);
      setTimeout(() => {
        navigate("/signin");
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <div className="App">
      {loading ? (
        "로그인 확인..."
      ) : (
        <>
          <span>Signup</span>

          <form className="Form" onChange={handleValidSumbit}>
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
            <span>{errorMsg}</span>
          </form>
        </>
      )}
    </div>
  );
}

export default Signup;
