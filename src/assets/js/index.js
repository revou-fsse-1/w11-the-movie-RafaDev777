import {
  checkEmptyString,
  checkStringLength,
  checkEmail,
  checkUpperCase,
  checkLowerCase,
  checkNumber,
} from "./formValidator.js";
import { API_ENDPOINT } from "./constants.js";
import { selElemnt } from "./components.js";

//test line//

let loginBtn = document.querySelector("#login-btn");
let registBtn = document.querySelector("#regist-btn");
let loginLink = document.querySelector(".login-link");
let registLink = document.querySelector(".regist-link");

const getAllUser = async () => {
  try {
    let response = await fetch(API_ENDPOINT("users"));
    return await response.json();
  } catch (err) {
    console.log("error", err);
  }
};

const signIn = async () => {
  console.log(1);
  let username = document.querySelector("#login-username").value;
  let pw = document.querySelector("#login-pwd").value;

  const userData = await getAllUser();

  const checkCredential = userData.find(
    (a) => a.username === username && a.password === pw
  );

  switch (false) {
    case checkEmptyString(username):
      alert("Please fill in your username");
      break;
    case checkEmptyString(pw):
      alert("Please fill in your password!");
      break;
    case checkCredential !== undefined:
      alert("You may enter wrong email or password.");
      break;
    case checkCredential === undefined:
      alert("success");
      localStorage.setItem("username", username);
      window.location.href = "./pages/dashboard/";
      break;
  }
};

const addUser = async (username, email, pwd) => {
  try {
    let response = await fetch(API_ENDPOINT("users"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: pwd,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log("error", err);
  }
};

const signUp = async () => {
  let username = selElemnt("#regist-username").value;
  let email = selElemnt("#regist-email").value;
  let pwd = selElemnt("#regist-pwd").value;
  let pwdCnfm = selElemnt("#regist-pwd-cnfm").value;

  const userData = await getAllUser();

  const checkDuplicateEmail = userData.find((a) => a.email === email);
  const checkDuplicateUsername = userData.find((a) => a.username === username);

  switch (false) {
    case checkEmptyString(username):
      alert("Please fill in your username!");
      break;
    case checkEmptyString(email):
      alert("Please fill in your email!");
      break;
    case checkEmail(email):
      alert("Please enter a valid email!");
      break;
    case checkEmptyString(pwd):
      alert("Please fill in your password!");
      break;
    case checkStringLength(pwd):
      alert("Your password must contain at least 8 characters!");
      break;
    case checkUpperCase(pwd):
      alert("Your password must contain at least 1 uppercase!");
      break;
    case checkLowerCase(pwd):
      alert("Your password must contain at least 1 lowercase!");
      break;
    case checkNumber(pwd):
      alert("Your password must contain at least 1 number!");
      break;
    case checkEmptyString(pwdCnfm):
      alert("Please confirm your password!");
      break;
    case pwd === pwdCnfm:
      alert("Password confimarion have to be same as password");
      break;
    case checkDuplicateEmail === undefined:
      alert("This email has been registered");
      break;
    case checkDuplicateUsername === undefined:
      alert("This username has been registered");
      break;
    case checkDuplicateEmail !== undefined &&
      checkDuplicateUsername !== undefined:
      addUser(username, email, pwd);
      alert("register Success");
      selElemnt(".register-form-container").classList.toggle("hidden");
      selElemnt(".login-form-container").classList.toggle("hidden");
      break;
  }
};

loginLink.addEventListener("click", () => {
  selElemnt(".register-form-container").classList.toggle("hidden");
  selElemnt(".login-form-container").classList.toggle("hidden");
});

registLink.addEventListener("click", () => {
  selElemnt(".register-form-container").classList.toggle("hidden");
  selElemnt(".login-form-container").classList.toggle("hidden");
});

loginBtn.addEventListener("click", signIn);
registBtn.addEventListener("click", signUp);
