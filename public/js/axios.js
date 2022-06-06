const formDOM = document.querySelector(".email-form");
const taskInputDOM = document.querySelectorAll(".register-form");
const showTextDom = document.getElementById("showtext");
const loginFormDom = document.querySelector(".login-form");
const loginEmail = document.querySelector(".login-email");
const loginPassword = document.querySelector(".login-password");
const btnLogOut = document.getElementById("log-out");
const AddImageForm = document.getElementById("images-form");
const imgFile = document.getElementById("add-images");
const imgButton = document.getElementById("add-images-button");
var user;
var role;

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const values = {};
  for (let i = 0; i < taskInputDOM.length; i++) {
    Object.assign(values, { [taskInputDOM[i].name]: taskInputDOM[i].value });
  }

  const { name, email, password, date, address, phone } = values;

  try {
    const res = await axios.post("http://localhost:3000/api/register", {
      name,
      email,
      password,
      date,
      address,
      phone,
    });
    if (res.data.token === undefined) {
      document.getElementById("showtext").innerHTML = `Error: ${res.data.msg}`;
    } else {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.name);
      localStorage.setItem("role", res.data.user.role);
      document.getElementById(
        "showtext"
      ).innerHTML = `Register Successfully For User: ${res.data.user.name}`;
      document.getElementById(
        "login-signup"
      ).innerHTML = `Hi ${res.data.user.name}`;
      document.getElementById("login-model").style.display = "none";
      document.getElementById("user-dashboard").style.display = "inline";
      document.getElementById(
        "user-info"
      ).innerHTML = `Username: ${res.data.user.name} ------ Role: ${res.data.user.role} `;
      if (localStorage.getItem("role") === "admin") {
        document.getElementById("add-images-button").style.display = "inline";
      } else {
        document.getElementById("add-images-button").style.display = "none";
      }
    }
    setTimeout(() => {
      showTextDom.style.display = "none";
    }, 3000);
  } catch (error) {
    console.log(error);
  }
});

loginFormDom.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;
  try {
    const res = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    });
    console.log(res);
    if (res.data.msg) {
      document.getElementById("user-dashboard").style.display = "inline";
      document.getElementById("user-info").innerHTML = `Error: ${res.data.msg}`;
    } else {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.name);
      localStorage.setItem("role", res.data.user.role);
      document.getElementById(
        "login-signup"
      ).innerHTML = `Hi ${res.data.user.name}`;
      document.getElementById("login-model").style.display = "none";
      document.getElementById("user-dashboard").style.display = "inline";
      document.getElementById(
        "user-info"
      ).innerHTML = `Username: ${res.data.user.name} ------ Role: ${res.data.user.role} `;
      if (localStorage.getItem("role") === "admin") {
        document.getElementById("add-images-button").style.display = "inline";
      } else {
        document.getElementById("add-images-button").style.display = "none";
      }
    }
  } catch (error) {
    console.log(error);
  }
});

btnLogOut.addEventListener("click", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
});

window.onload = async (event) => {
  if (
    localStorage.getItem("user") !== null &&
    localStorage.getItem("role") !== null
  ) {
    console.log("ok");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    document.getElementById("login-signup").innerHTML = `Hi ${user}`;
    document.getElementById("login-model").style.display = "none";
    document.getElementById("user-dashboard").style.display = "inline";
    document.getElementById(
      "user-info"
    ).innerHTML = `Username: ${user} ------ Role: ${role} `;
    if (localStorage.getItem("role") === "admin") {
      document.getElementById("add-images-button").style.display = "inline";
    } else {
      document.getElementById("add-images-button").style.display = "none";
    }
    const img = await axios.get("http://localhost:3000/api/getImg");
    console.log(img.data);
    for (let i = 0; i < img.data.img.length; i++) {
      document.getElementById(
        "image-container"
      ).innerHTML += `<img src="/images/${img.data.img[i].img}" alt="">`;
    }
  } else {
    console.log("no");
  }
};
