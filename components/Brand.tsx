import Image from "next/image";

export default function Brand() {
  return (
    <a className="wordmark" href="#home" aria-label="Shafin home">
      <Image
        className="brand-logo"
        src="/brand/shafin-mark.png"
        alt=""
        width={36}
        height={36}
      />
      SHAFIN<span>.</span>
    </a>
  );
}
