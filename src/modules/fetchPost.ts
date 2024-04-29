import Config from "@/resources/config";
import { deleteCookie } from "cookies-next";

async function fetchPost(
  path: string,
  data: Record<string, any>,
  secure: boolean
) {
  return fetch(`${Config().api}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      /* Authorization: 'Bearer YOUR_TOKEN_HERE', */
    },
    body: JSON.stringify(data),
    credentials: secure ? "include" : undefined,
  })
    .then((e) => e.json())
    .then((response) => {
      if (response.expired) {
        localStorage.clear();
        deleteCookie("SYNU");
        deleteCookie("SYNA");
        deleteCookie("SYNR");
        deleteCookie("SYNLOG");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      return response;
    })
    .catch((err) => {
      localStorage.clear();
      deleteCookie("SYNU");
      deleteCookie("SYNA");
      deleteCookie("SYNR");
      deleteCookie("SYNLOG");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
}

export default fetchPost;
