import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const [disable, setDisable] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const userdata = { email: inputEmail, password: inputPw };
  const access_token = localStorage.getItem("JWTtoken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(`${API}/auth/signin`, userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // alert("통과", response);
      console.log(response.data);
      localStorage.setItem("JWTtoken", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (access_token !== null) {
      setLoading(true);
      setTimeout(() => {
        navigate("/todo");
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <div className="App">
      {loading ? (
        "로그인 체크... Todo 리스트로 이동합니다"
      ) : (
        <>
          Signin
          <form className="Form" onChange={handleValid}>
            <input
              data-testid="email-input"
              placeholder="email"
              required
              type="email"
              name="email1"
              onChange={handleEmail}
              value={inputEmail}
            />
            <input
              data-testid="password-input"
              placeholder="password"
              required
              type="password"
              // name="password"
              minLength="8"
              onChange={handlePW}
              value={inputPw}
            />
            <button
              data-testid="signin-button"
              disabled={disable}
              // onClick={checkValid}
            >
              로그인
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Signin;
