import LoadingDots from "@/components/Animations/LoadingDots/page";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Image from "next/image";
import React from "react";

function CardForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isprocessing, setisprocessing] = React.useState(false);
  const [status, setstatus] = React.useState("");
  const [errormsg, seterrormsg] = React.useState("");

  async function submit() {
    if (!stripe || !elements || isprocessing) {
      return;
    }

    setisprocessing(true);

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as any,
      },
    });

    if (result.error) {
      setstatus("error");
      seterrormsg(result.error.message?.replaceAll(".", "") ?? "");
      setTimeout(() => {
        setstatus("");
      }, 2000);
    } else {
      //success
      setstatus("done");
      setTimeout(() => {
        setstatus("");
        window.location.reload();
      }, 2000);
    }

    setisprocessing(false);
  }

  return (
    <div className="w-full">
      <CardElement />
      <div className="w-full mt-10">
        <Image
          src="/images/stripe-badge-white.png"
          alt="Visa"
          width={1000}
          height={300}
        />
      </div>
      {status ? (
        status === "done" ? (
          <label
            htmlFor=""
            className="bg-lime-600 text-synwhite rounded p-1 mt-5 flex flex-row gap-2 items-center"
          >
            Your Card Is Successfully Added
            <Check size={22} weight="bold" />
          </label>
        ) : (
          <label
            htmlFor=""
            className="bg-red-600 text-synwhite rounded p-1 mt-5 flex flex-row gap-2 items-center"
          >
            {errormsg}
            <X size={22} weight="bold" />
          </label>
        )
      ) : (
        <></>
      )}
      <button
        onClick={submit}
        className="bg-synblue mt-5 w-full hover:bg-synblack flex flex-row gap-2 items-center justify-center"
      >
        {isprocessing ? (
          <>
            Processing <LoadingDots fill="var(--synwhite)" width={22} />
          </>
        ) : (
          "Save Card"
        )}
      </button>
    </div>
  );
}

export default CardForm;
