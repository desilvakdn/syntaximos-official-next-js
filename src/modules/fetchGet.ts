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
    .then(async (response) => {
      if (response.expired) {
        deleteCookie("SYNU", {
          path: "/",
          domain: Config().api.includes("localhost")
            ? "localhost"
            : process.env.NEXT_PUBLIC_WEB_URL_COOKIE_DELETION,
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.reload();
      } else {
        return response;
      }
    })
    .catch(async (err) => {
      deleteCookie("SYNU", {
        path: "/",
        domain: Config().api.includes("localhost")
          ? "localhost"
          : process.env.NEXT_PUBLIC_WEB_URL_COOKIE_DELETION,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    });
}

export default fetchGet;
