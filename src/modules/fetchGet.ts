import Config from "@/resources/config";
import { deleteCookie } from "cookies-next";

async function fetchGet(path: string, secure: boolean) {
  return fetch(`${Config().api}/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      /* Authorization: 'Bearer YOUR_TOKEN_HERE', */
    },
    credentials: secure ? "include" : undefined,
  })
    .then((e) => e.json())
    .then((response) => {
      if (response.expired) {
        localStorage.clear();
        deleteCookie("SYNU");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      return response;
    })
    .catch((err) => {
      localStorage.clear();
      deleteCookie("SYNU");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
}

export default fetchGet;
