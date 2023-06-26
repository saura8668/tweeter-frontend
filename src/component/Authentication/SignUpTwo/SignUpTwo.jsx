import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import lockIcon from "../../Assets/lock.svg";
import { useState, useEffect } from "react";
import "./SignUpTwo.css";
import { useDispatch, useSelector } from "react-redux";
import { SignUpTwoUser } from "../../../react-redux/actions/authAction";
import { Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function SignUpTwo() {
  const [nameN, setNameN] = useState("")
  const [pass, setPass] = useState("")
  const [checkName, setCheckName] = useState(false);
  const [checkPass, setCheckPass] = useState(false)
  const [show1, setShow1] = useState(false)
  const [callApi, setCallApi] = useState(false)
  const [showErr, setShowErr] = useState(false)
  function handleShow1() {
    setShow1(!show1)
  }

  const name = sessionStorage.getItem("NameToBeUsed")
  const rightname = /^[a-z,.'-]+$/i;
  useEffect(() => {
    if (rightname.test(nameN)) {
      document.getElementById('signNameWrong').style.display = "none";
      setCheckName(true)
    }
    else if (nameN) {
      document.getElementById('signNameWrong').style.display = "block";
      setCheckName(false)
    }
  }, [nameN])

  const rightpass =
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;
  useEffect(() => {
    if (rightpass.test(pass)) {
      document.getElementById("signInvalidPwdWrong").style.display = "none";
      setCheckPass(true)

    } else if (pass) {
      document.getElementById("signInvalidPwdWrong").style.display = "block";
      setCheckPass(false)
    }
  }, [pass]);

  useEffect(() => {
    if (checkName && checkPass)
      setCallApi(true);
    else
      setCallApi(false)
  }, [checkName, checkPass])

  const data = {
    name,
    user_name: nameN,
    password: pass
  }

  const signUp = useSelector((s) => s.AuthReducer)
  const { loading, error, response, toHome } = signUp;
  const [toastBool, setToastBool] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    if (loading === true) {
      document.body.style.opacity = 0.5;
    }
    else {
      document.body.style.opacity = 1;
    }
  }, [loading])

  function SIGNUPTWO() {
    dispatch(SignUpTwoUser(data))
    setShowErr(true)
  }
  useEffect(() => {
    if (error != "" && !loading) {
      setToastBool(true)
    }
  }, [signUp])

  useEffect(() => {
    if (toastBool && showErr) {
      toast.error(`${error}`, {
        position: "top-center",
        theme: "light",
      });
      setToastBool(false)
    }
  }, [toastBool])

  const navigate = useNavigate();

  useEffect(() => {
    if (toHome) {
      navigate("/")
    }
  }, [toHome])

  return <>
    <Background />
    <div className='loginBg'>
      <img src={arrow} id="arrow" onClick={() => { navigate("/verifyemail") }} />
      <p className='authHead' id="authHeadTwo">Sign Up</p>
      <p className='authEmail' id="signInput">Username</p>
      <input type="text" className="authEmailInput" placeholder="Enter your name" value={nameN} onChange={(e) => setNameN(e.target.value)} />
      <p id="signNameWrong" className="invalidEmail" >Name should only consists of alphabet without any whitespaces</p>
      <img src={lockIcon} id="lockIconS" />
      <p className='authPwd' id="signPwd">Password</p>
      {show1 ? (
        <FontAwesomeIcon icon={faEye} id="SEye" onClick={handleShow1} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} id="SEye" onClick={handleShow1} />
      )}
      <input type={show1 ? "text" : "password"} className="authPwdInput" id="signInput2" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <p className='fgtRstPwd' id="signInvalidPwdWrong">Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters</p>
      <button type="button" className='authFgtPwdBtn' onClick={() => { SIGNUPTWO() }}>Sign Up</button>
    </div>
    {loading === true ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
    <ToastContainer />
  </>
}
export default SignUpTwo;