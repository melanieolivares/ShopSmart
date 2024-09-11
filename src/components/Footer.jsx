import Menu from "./Menu";
export default function Footer({ setUrlModalVisibility }) {
  return (
    <div className="h-24 bg-backgroundBody z-10 p-4 border-t-1 shadow flex items-center justify-between">
      <Menu />

      <button
        className="z-10 p-1 border-1 rounded-full bg-background shadow"
        onClick={() => setUrlModalVisibility(true)}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-10 text-mainSVG transition-colors duration-300 ease-in-out hover:text-mainSVG/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
