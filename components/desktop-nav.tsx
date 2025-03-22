import Link from "next/link";
import { Button } from "./ui/button";
import ThemeSwitch from "./theme-changer";

function DesktopNav() {
  return (
    <nav>
      <div className="md:flex gap-5">
        <div className="flex gap-2 pr-5">
          <div className="flex justify-center items-center pr-2 cursor-pointer">
            <ThemeSwitch />
          </div>
          <Link href={"/survey"}>
            <Button variant="outline">Try Gen</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
