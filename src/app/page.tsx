import background from "@/assets/homepage-bg.png";
import Image from "next/image";

export default function Home() {
  return (
    <Image
      className='background-img'
      src={background}
      alt='background'
      style={{
        position: "absolute",
        top: 0,
        zIndex: -1,
        objectFit: "cover",
        width: "100dvw",
        height: "100dvh",
      }}
    ></Image>
  );
}
