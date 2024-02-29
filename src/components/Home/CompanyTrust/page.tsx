"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Logos {
  [key: string]: JSX.Element;
}

export default function TrustedBy() {
  const [active, setactive] = useState(0);

  let badges = [
    "fiverr",
    "google",
    "facebook",
    "ebay",
    "stripe",
    "etsy",
    "amazon",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setactive((prevActive) => (prevActive >= 6 ? 0 : prevActive + 1));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);
  return (
    <>
      <div className="my-10">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "backInOut" }}
          className="flex flex-col justify-center items-center text-center"
        >
          <h2>Trusted By Big Giants All Over The World</h2>
          <label htmlFor="" className="opacity-50">
            We&apos;re Building Softwares Following Latest Standards Making Us
            Notable For Bigger Giants
          </label>
        </motion.div>
        <div className="content flex flex-row flex-wrap justify-center items-center gap-10">
          {badges.map((item, index) => (
            <motion.label
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.6 + 0.1 * index,
                ease: "backInOut",
              }}
              htmlFor=""
            >
              {logos(item, active)}
            </motion.label>
          ))}
        </div>
      </div>
    </>
  );
}

function logos(name: string, activenum: number): JSX.Element {
  const logo: Logos = {
    fiverr: (
      <svg
        className="w-[100px] h-[100px] md:w-[170px] md:h-[170px]"
        fill={activenum === 0 ? "var(--synblue)" : "var(--synwhite)"}
        viewBox="0 0 24 24"
        style={{ transition: "all 0.3s ease-in" }}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
      </svg>
    ),
    google: (
      <svg
        className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
        viewBox="0 0 20 20"
        style={{ transition: "all 0.3s ease-in" }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>google [#178]</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-300.000000, -7399.000000)"
            fill={activenum === 1 ? "var(--synblue)" : "var(--synwhite)"}
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M263.821537,7247.00386 L254.211298,7247.00386 C254.211298,7248.0033 254.211298,7250.00218 254.205172,7251.00161 L259.774046,7251.00161 C259.560644,7252.00105 258.804036,7253.40026 257.734984,7254.10487 C257.733963,7254.10387 257.732942,7254.11086 257.7309,7254.10986 C256.309581,7255.04834 254.43389,7255.26122 253.041161,7254.98137 C250.85813,7254.54762 249.130492,7252.96451 248.429023,7250.95364 C248.433107,7250.95064 248.43617,7250.92266 248.439233,7250.92066 C248.000176,7249.67336 248.000176,7248.0033 248.439233,7247.00386 L248.438212,7247.00386 C249.003881,7245.1669 250.783592,7243.49084 252.969687,7243.0321 C254.727956,7242.65931 256.71188,7243.06308 258.170978,7244.42831 C258.36498,7244.23842 260.856372,7241.80579 261.043226,7241.6079 C256.0584,7237.09344 248.076756,7238.68155 245.090149,7244.51127 L245.089128,7244.51127 C245.089128,7244.51127 245.090149,7244.51127 245.084023,7244.52226 L245.084023,7244.52226 C243.606545,7247.38565 243.667809,7250.75975 245.094233,7253.48622 C245.090149,7253.48921 245.087086,7253.49121 245.084023,7253.49421 C246.376687,7256.0028 248.729215,7257.92672 251.563684,7258.6593 C254.574796,7259.44886 258.406843,7258.90916 260.973794,7256.58747 C260.974815,7256.58847 260.975836,7256.58947 260.976857,7256.59047 C263.15172,7254.63157 264.505648,7251.29445 263.821537,7247.00386"
                id="google-[#178]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    ),
    facebook: (
      <svg
        className="w-[60px] h-[60px] md:w-[110px] md:h-[110px]"
        fill={activenum === 2 ? "var(--synblue)" : "var(--synwhite)"}
        style={{ transition: "all 0.3s ease-in" }}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z" />
      </svg>
    ),
    ebay: (
      <svg
        className="w-[65px] h-[65px] md:w-[110px] md:h-[110px]"
        fill={activenum === 3 ? "var(--synblue)" : "var(--synwhite)"}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transition: "all 0.3s ease-in" }}
        viewBox="0 0 40.368 40.367"
      >
        <g>
          <path
            id="eBay_3_"
            d="M36.239,11.438l-3.146,6.76l-2.91-6.76h-4.459l0.752,1.512c-0.424-0.047-0.895-0.094-1.41-0.094
      c-1.174,0-2.207,0.188-2.91,0.756c-0.75,0.474-1.174,1.371-1.174,2.744h3.1c0-0.899,0.047-1.752,1.174-1.752
      s1.268,0.709,1.268,1.656v0.896c-1.783-0.047-3.521,0-4.602,0.854c-0.469-0.474-1.079-0.758-2.017-0.758
      c-1.126,0-1.878,0.33-2.535,1.276H17.32v-5.91h-3.098v5.343c-0.468-0.236-1.032-0.379-1.689-0.521
      c-1.081-0.235-2.489-0.379-4.272-0.379C0.798,17.061,0,19.376,0,22.072c0,3.121,0.938,5.297,8.261,5.297
      c1.69,0,3.146-0.188,4.319-0.428c0.61-0.141,1.174-0.33,1.643-0.564v2.316h2.958v-1.229h0.046c0.564,1.086,1.41,1.465,2.629,1.465
      c2.582,0,3.004-2.316,3.1-4.396c0.234,0.049,0.469,0.049,0.75,0.049c1.361,0,2.254-0.568,2.91-1.701h0.047l0.143,1.512h2.908
      c-0.047-0.709-0.141-1.418-0.141-2.127v-2.979l1.27,2.603v5.53h4.084v-5.53l5.441-10.449L36.239,11.438L36.239,11.438z
      M8.26,18.766c2.723,0,2.629,1.369,2.629,2.316H5.725C5.725,20.277,5.679,18.766,8.26,18.766z M12.578,23.775h-0.046H10.7
      c0,0.854-0.422,1.797-2.441,1.797c-2.487,0-2.535-1.748-2.535-2.93h8.496v1.133H12.578z M19.902,22.973
      c0,2.838-0.188,4.02-1.314,4.02c-1.08,0-1.269-1.182-1.269-4.02c0-2.221,0-3.781,1.269-3.781
      C19.948,19.191,19.902,20.752,19.902,22.973z M24.971,22.643c-1.031,0-1.172-0.994-1.172-1.797c0-1.986,1.172-1.844,2.723-1.938
      C26.52,20.135,26.803,22.643,24.971,22.643z"
          />
        </g>
      </svg>
    ),
    stripe: (
      <svg
        className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
        fill={activenum === 4 ? "var(--synblue)" : "var(--synwhite)"}
        viewBox="0 0 32 32"
        style={{ transition: "all 0.3s ease-in" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.25 10.435l-2.165 0.46-0.010 7.12c0 1.315 0.99 2.165 2.305 2.165 0.73 0 1.265-0.135 1.56-0.295v-1.69c-0.285 0.115-1.685 0.525-1.685-0.785v-3.16h1.685v-1.89h-1.685zM12.705 13.015l-0.135-0.655h-1.92v7.66h2.215v-5.155c0.525-0.69 1.41-0.555 1.695-0.465v-2.040c-0.3-0.105-1.335-0.3-1.855 0.655zM17.32 9.4l-2.23 0.475v1.81l2.23-0.475zM2.245 14.615c0-0.345 0.29-0.48 0.755-0.485 0.675 0 1.535 0.205 2.21 0.57v-2.090c-0.735-0.29-1.47-0.405-2.205-0.405-1.8 0-3 0.94-3 2.51 0 2.46 3.375 2.060 3.375 3.12 0 0.41-0.355 0.545-0.85 0.545-0.735 0-1.685-0.305-2.43-0.71v2c0.825 0.355 1.66 0.505 2.425 0.505 1.845 0 3.115-0.79 3.115-2.39 0-2.645-3.395-2.17-3.395-3.17zM32 16.28c0-2.275-1.1-4.070-3.21-4.070s-3.395 1.795-3.395 4.055c0 2.675 1.515 3.91 3.675 3.91 1.060 0 1.855-0.24 2.46-0.575v-1.67c-0.605 0.305-1.3 0.49-2.18 0.49-0.865 0-1.625-0.305-1.725-1.345h4.345c0.010-0.115 0.030-0.58 0.030-0.795zM27.605 15.44c0-1 0.615-1.42 1.17-1.42 0.545 0 1.125 0.42 1.125 1.42zM21.96 12.21c-0.87 0-1.43 0.41-1.74 0.695l-0.115-0.55h-1.955v10.24l2.22-0.47 0.005-2.51c0.32 0.235 0.795 0.56 1.57 0.56 1.59 0 3.040-1.16 3.040-3.98 0.005-2.58-1.465-3.985-3.025-3.985zM21.43 18.335c-0.52 0-0.83-0.19-1.045-0.42l-0.015-3.3c0.23-0.255 0.55-0.44 1.060-0.44 0.81 0 1.37 0.91 1.37 2.070 0.005 1.195-0.545 2.090-1.37 2.090zM15.095 20.020h2.23v-7.66h-2.23z" />
      </svg>
    ),
    etsy: (
      <svg
        className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
        fill={activenum === 5 ? "var(--synblue)" : "var(--synwhite)"}
        style={{ transition: "all 0.3s ease-in" }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.139 14.058c-.438 0-.693-.294-.693-1.058v-2.696l1.456.112.074-.694-1.496.074v-1.53h-.438c-.216 1.201-.759 1.638-1.488 1.712v.364h.869v3.062c0 .836.588 1.271 1.313 1.271.585 0 1.202-.255 1.418-.763l-.217-.255c-.108.18-.402.401-.798.401zm-3.494-.803c-.294.69-.767.729-1.24.729h-1.53c-.508 0-.729-.186-.729-.62v-2.258s1.092 0 1.457.039c.291.035.438.109.546.473l.108.511h.438l-.039-1.309.074-1.278h-.434l-.147.585c-.073.399-.147.438-.546.508-.508.038-1.457.038-1.457.038V7.979c0-.112 0-.147.185-.147h2.291c.402 0 .62.326.763.98l.147.512h.399c.039-1.457.074-2.074.074-2.074s-.981.105-1.562.105H3.53L2 7.324v.399l.508.107c.367.074.475.147.475.473 0 0 .039.984.039 2.619 0 1.639-.039 2.623-.039 2.623 0 .291-.108.399-.475.473L2 14.131v.396l1.565-.035h2.623c.581 0 1.965.035 1.965.035.034-.361.216-1.964.255-2.146H8.04l-.395.874zm6.04-2.622c0-.474.437-.655.875-.655.36 0 .653.147.729.325l.255.729.361-.035c0-.364.038-.838.111-1.201-.328-.147-.983-.221-1.421-.221-.984 0-1.747.441-1.747 1.387 0 1.674 2.44 1.31 2.44 2.549 0 .399-.256.729-.876.729-.581 0-.837-.294-.945-.585l-.29-.693h-.369c.04.476.074.948 0 1.382 0 0 .767.294 1.531.294 1.022 0 1.858-.507 1.858-1.457 0-1.674-2.512-1.421-2.512-2.548zm6.369-.945v.364l.259.074c.252.07.36.178.36.363 0 .108-.034.144-.073.291-.108.291-.802 2.003-1.162 2.767a75.566 75.566 0 0 1-1.093-2.949c-.035-.073-.035-.108-.035-.146 0-.148.105-.292.361-.326l.329-.074v-.364l-1.346.073-1.096-.039v.368l.187.069c.251.074.287.11.469.512.693 1.53 1.457 3.529 1.716 4.15-.584 1.019-1.204 1.309-1.677 1.309-.291 0-.399-.147-.435-.329l-.146-.763-.4.035c-.073.477-.147.984-.255 1.383.287.182.616.294 1.053.293.691 0 1.675-.182 2.623-2.332l1.601-3.747c.145-.293.182-.329.546-.476l.183-.144v-.362l-.945.034-1.024-.034z" />
      </svg>
    ),
    amazon: (
      <svg
        className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g id="7935ec95c421cee6d86eb22ecd1149e3">
          <path
            style={{
              display: "inline",
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: activenum === 6 ? "var(--synblue)" : "var(--synwhite)",
              transition: "all 0.3s ease-in",
            }}
            d="M293.596,233.97
      c0,26.322,0.627,48.264-12.651,71.65c-10.724,19.022-27.791,30.698-46.749,30.698c-25.905,0-41.069-19.73-41.069-48.979
      c0-57.525,51.607-67.983,100.469-67.983V233.97z M361.701,398.655c-4.48,4.005-10.934,4.283-15.971,1.567
      c-22.446-18.64-26.462-27.263-38.718-45.009c-37.07,37.767-63.335,49.094-111.356,49.094c-56.871,0-101.09-35.085-101.09-105.269
      c0-54.833,29.688-92.112,72.023-110.394c36.647-16.086,87.836-19.004,127.006-23.397v-8.774c0-16.074,1.253-35.091-8.218-48.979
      c-8.217-12.43-24.013-17.542-37.905-17.542c-25.76,0-48.67,13.196-54.288,40.552c-1.178,6.094-5.612,12.11-11.745,12.425
      l-65.459-7.092c-5.524-1.241-11.676-5.682-10.074-14.119c15.036-79.421,86.762-103.418,151.037-103.418
      c32.857,0,75.823,8.774,101.729,33.63c32.857,30.71,29.7,71.65,29.7,116.248v105.223c0,31.65,13.138,45.543,25.487,62.615
      c4.317,6.128,5.292,13.44-0.209,17.92c-13.8,11.571-38.324,32.869-51.811,44.87L361.701,398.655z M454.261,417.377
      c-62.721,26.602-130.884,39.461-192.884,39.461c-91.933,0-180.924-25.209-252.882-67.096c-6.302-3.668-10.968,2.797-5.733,7.532
      c66.702,60.236,154.845,96.425,252.732,96.425c69.846,0,150.949-21.971,206.903-63.254
      C471.646,423.598,463.72,413.361,454.261,417.377z M470.962,467.655c-2.043,5.106,2.345,7.172,6.964,3.296
      c30.014-25.116,37.767-77.716,31.615-85.317c-6.093-7.532-58.565-14.021-90.599,8.461c-4.921,3.481-4.062,8.24,1.394,7.59
      c18.036-2.17,58.182-6.986,65.343,2.183C492.828,413.036,477.717,450.779,470.962,467.655z"
          ></path>
        </g>
      </svg>
    ),
  };

  return logo[name];
}
