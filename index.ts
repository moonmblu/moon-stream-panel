import { render, h } from "preact";
import { App } from "./panel";

declare const ENV: { [key: string]: string };

const { LOGIN_URL } = ENV;

function getUserData() {
  const href = new URL(window.location.href);

  const user = href.searchParams.get("user") || undefined;
  const token = href.searchParams.get("token") || undefined;

  history.pushState({}, "", window.location.origin);

  return { user, token };
}

function onLoad() {
  render(h(App, getUserData()), document.body);
}

window.addEventListener("load", onLoad);
