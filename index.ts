declare const ENV: { [key: string]: string };

const { LOGIN_URL } = ENV;

function redirectToLogin(logout?: boolean) {
  const url = new URL(LOGIN_URL);

  if (logout) {
    url.searchParams.set("logout", logout.toString());
  }
  url.searchParams.set("redirectApp", "panel");
  window.location.replace(url.toString());
}

function getUserData() {
  const href = new URL(window.location.href);

  const user = href.searchParams.get("user");
  const token = href.searchParams.get("token");

  if (!user || !token) {
    throw new Error("Invalid user");
  }

  history.pushState({}, "", window.location.origin);

  return { user, token };
}

function onLoad() {
  try {
    const { token, user } = getUserData();
    const userData = document.createElement("pre");
    userData.innerText = JSON.stringify(
      { ...JSON.parse(user), token: JSON.parse(token) },
      undefined,
      4
    );
    const logoutButton = document.createElement('button');
    logoutButton.innerText = "logout"
    logoutButton.addEventListener('click', () => redirectToLogin(true))
    document.body.append(userData, logoutButton);
  } catch {
    redirectToLogin();
  }
}

window.addEventListener("load", onLoad);
