const formm = document.getElementById("myForm");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phonenum = document.getElementById("telephone");
const yr_bio = document.getElementById("your_bio");
const result = document.getElementById("result");

const firstnameError = document.getElementById("firstnameError");
const lastnameError = document.getElementById("lastnameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const telephoneError = document.getElementById("telephoneError");
const bioError = document.getElementById("bioError");

const firstRex = /^[a-zA-Z]{3,16}$/;
const lastRex = /^[a-zA-Z]{3,16}$/;
const emailRex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phonenumRex = /^(\+\d{1,3})?\d{10}$/;
const yrbioRex = /^[a-zA-Z]{3,16}$/;

formm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear previous error messages
  firstnameError.textContent = "";
  lastnameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  telephoneError.textContent = "";
  bioError.textContent = "";

  if (!firstRex.test(firstname.value) || firstname.value.trim() === "") {
    firstnameError.textContent =
      "First name must be alphanumeric and contain 3 -16 characters";
  }
  if (!lastRex.test(lastname.value) || lastname.value.trim() === "") {
    lastnameError.textContent =
      "Last name must be alphanumeric and contain 3 -16 characters";
  }
  if (!emailRex.test(email.value) || email.value.trim() === "") {
    emailError.textContent =
      "Email must be a valid address ,e.g .example@example.com";
  }
  if (!passwordRex.test(password.value) || password.value.trim() === "") {
    passwordError.textContent =
      "Password must be alphanumeric and between 6-20 characters";
  }
  if (!phonenumRex.test(phonenum.value) || phonenum.value.trim() === "") {
    telephoneError.textContent = "A valid Telephone number (10 digits)";
  }
  if (!yrbioRex.test(yr_bio.value) || yr_bio.value.trim() === "") {
    bioError.textContent =
      "Bio must contain only lowercase letters , underscores,hyphens, and be 8-50 characters";
  }
  if (
    yrbioRex.test(yr_bio.value) &&
    phonenumRex.test(phonenum.value) &&
    passwordRex.test(password.value) &&
    emailRex.test(email.value) &&
    lastRex.test(lastname.value) &&
    firstRex.test(firstname.value)
  ) {
    result.innerHTML = `
      <h2>first Name: ${firstname.value}</h2><br />
      <h2>Last Name: ${lastname.value}</h2><br />
      <h2>Email Address: ${email.value}</h2><br />
      <h2>Password: ${password.value}</h2><br />
      <h2>Telephone Number: ${phonenum.value}</h2><br />
      <h2>My Bio: ${yr_bio.value}</h2><br />
    `;
  } else {
    window.onload();
  }
});
