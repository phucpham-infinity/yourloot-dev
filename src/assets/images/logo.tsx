import logo from "./yourloot-logotype-full-horizontal.png";

export default function LogoImage() {
  return (
    <img
      src={logo}
      alt="Logo Yourloot"
      className=" w-70 h-10 object-cover rounded-xl shadow-lg"
    />
  );
}
