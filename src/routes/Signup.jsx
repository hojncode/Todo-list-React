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
    "이메일 주소와 패스워드(8자리 이상)를 입력해 주세요."
  );

  const handleEmail = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputEmail(value);
  };

  const handlePW = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (inputEmail.includes("@") && inputPw.length >= 7) {
      setDisable(false);
      setErrorMsg("");
    }
    setInputPw(value);
  };

  const handleValidSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/signup`, userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("입력한 정보로 가입 되었습니다.(로그인 페이지로 이동합니다)");
      navigate("/signin");
      console.log(response.status);
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
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

          <form className="Form" onSubmit={handleValidSumbit}>
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
