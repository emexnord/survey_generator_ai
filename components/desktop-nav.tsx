import Link from "next/link";
import { Button } from "./ui/button";
import ThemeSwitch from "./theme-changer";

function DesktopNav() {
  return (
    <nav>
      <div className="md:flex gap-5">
        <div className="flex gap-2 pr-5">
          {/* <ModeToggle /> */}
          <Link href="#">
            <Button className="" variant="link">
              Security
            </Button>
          </Link>
          <Link href="#">
            <Button className="mr-4" variant="link">
              Pricing
            </Button>
          </Link>
          <div className="flex justify-center items-center pr-2 cursor-pointer">
            <ThemeSwitch />
          </div>
          <Button variant="secondary">Enter App</Button>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
