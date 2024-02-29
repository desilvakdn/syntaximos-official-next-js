export default function LoadingDots({
  width,
  fill,
}: {
  width: number;
  fill: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        background: "rgba(255, 255, 255, 0)",
        display: "block",
      }}
      width={`${width}px`}
      height={`${width}px`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={fill}
        stroke-width="18"
        r="41"
        stroke-dasharray="193.20794819577225 66.40264939859075"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}
