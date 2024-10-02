function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const getCredentials = () => {
    if (getCookie("email") === "" || getCookie("password") === "") {
        window.location.replace("login.html");
    }

    return {
        'email': getCookie("email"),
        'password': getCookie("password")
    };
}

export default getCredentials;