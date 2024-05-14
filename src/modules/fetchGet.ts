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
      console.log(response);
      if (response.expired) {
        localStorage.clear();
        deleteCookie("SYNU");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.reload();
      } else {
        return response;
      }
    })
    .catch(async (err) => {
      console.log(err);
      localStorage.clear();
      deleteCookie("SYNU");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    });
}

export default fetchGet;
