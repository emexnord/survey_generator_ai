import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps, useEffect, useState } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure this runs only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until theme is available
  if (!mounted) {
    return <div className="opacity-0">Gen-survey</div>;
  }
  const color = theme === "dark" ? "#ffffff" : "#000000"; // White for dark mode, Black for light mode

  return (
    <div
      className="font-bold tracking-wide"
      style={{
        fontSize: 20,
        color: color,
      }}
    >
      Gen-survey
    </div>
  );
};

export default Logo;
