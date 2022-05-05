import { h, Fragment } from "preact";
import { memo, useState } from "preact/compat";
import { Loader } from "moon-ui/build/Loader";
import { LOGIN_URL } from "./env";
import "./index.scss";

function redirectToLogin(logout?: boolean) {
  const url = new URL(LOGIN_URL);

  if (logout) {
    url.searchParams.set("logout", logout.toString());
  }
  url.searchParams.set("redirectApp", "panel");
  window.location.replace(url.toString());
}

export const App = memo(function ({
  user,
  token,
}: {
  user?: string;
  token?: string;
}) {
  const [loading, setLoading] = useState(true);

  if (!user || !token) {
    setTimeout(redirectToLogin, 500);
    return <Loader />;
  }

  if (loading) {
    setTimeout(() => setLoading(false), 1000)
    return <Loader />;
  }

  return (
    <>
      <pre>
        {JSON.stringify(
          { ...JSON.parse(user), token: JSON.parse(token) },
          undefined,
          4
        )}
      </pre>
      <button onClick={() => redirectToLogin(true)}>logout</button>
    </>
  );
});
