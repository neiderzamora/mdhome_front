import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
    <Link href="/">
      <p className="flex text-5xl text-center justify-center font-semibold text-primary-100 hover:text-primary-200">
        {/* <span className="text-secondary-100">MD</span>Home */}
        <Image
        src="/base_logo_transparent_background.png"
        alt="MDHome Logo"
        width={300}
        height={150}
        />
      </p>
    </Link>
  </div>
);

export default Logo;
