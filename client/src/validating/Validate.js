
// regular expression to check if email is valid
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// regular expression to check if password is valid
function handleValidate(name, value, setUser, user) {
  if (name === "email") {
    setUser({ ...user, email: value });
    if (emailRegex.test(value)) {
      setUser({ ...user, [name]: value, emailError: "" });
    }
    else {
      setUser({ ...user, [name]: value, emailError: "Invalid email" });
    }
  } else if (name === "password") {
    setUser({ ...user, password: value });
    if (value.length < 20) {
      setUser({ ...user, [name]: value, passwordError: "" });
    }
    else {
      setUser({ ...user, [name]: value, passwordError: "Password must be atleast 6 characters" });
    }
  }
}

export default handleValidate;