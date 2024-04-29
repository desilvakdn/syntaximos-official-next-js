import { getCookie } from "cookies-next";

export default function fetchGet(url, secure = true) {
  let accesstoken = getCookie("syn_a");

  let headers = {};

  if (secure) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesstoken}`,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((e) => e.json())
    .then((data) => {
      if (data.refresh) {
        window.location.reload();
      } else if (data.status) {
      }
    });
  return fetch(url).then((res) => res.json());
}
