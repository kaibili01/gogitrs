const getCookie = name => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts
      .pop()
      .split(";")
      .shift();
  }
};
if (getCookie("jwt")) {
  window.location.href = "/feed";
}
