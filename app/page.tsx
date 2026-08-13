"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState<string>(".......");
  const [theme, setTheme] = useState({
    dark: "hsl(220, 100%, 5%)",
    mid: "hsl(220, 50%, 30%)",
    light: "hsl(220, 100%, 92%)",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // update the favicon to match the current theme
  useEffect(() => {
    const favicon =
      document.querySelector<HTMLLinkElement>("#dynamic-favicon") ??
      Object.assign(document.createElement("link"), {
        id: "dynamic-favicon",
        rel: "icon",
        type: "image/svg+xml",
      });

    if (!favicon.parentNode) {
      document.head.appendChild(favicon);
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="${theme.dark}" />
        <circle cx="16" cy="16" r="7" fill="${theme.light}" />
      </svg>
    `;

    favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }, [theme]);

  const handleTimeClick = () => {
    const hue = Math.floor(Math.random() * 360);
    const dark = `hsl(${hue}, 100%, 5%)`;
    const mid = `hsl(${hue}, 50%, 30%)`;
    const light = `hsl(${hue}, 100%, 92%)`;
    setTheme({ dark, mid, light });
  };

  const timeParts = time.match(/^(.+?)(\s?[AP]M?)?$/);
  const mainTime = timeParts?.[1] ?? time;
  const meridiem = timeParts?.[2] ?? "";
  const [hours, minutes] = mainTime.split(":");

  return (
    <div
      className="h-full flex flex-col gap-4 p-4 md:flex-row md:justify-start md:pt-20 md:pl-20"
      style={{
        backgroundColor: theme.dark,
        color: theme.light,
      }}
    >
      <div className="pt-20 md:pt-0">
        <button
          className="font-mono text-sm cursor-pointer"
          onClick={handleTimeClick}
          style={{ color: theme.mid }}
        >
          <span>{hours}</span>
          <span className="blink-colon">:</span>
          <span>{minutes}</span>
          <span>{meridiem}</span>
        </button>
      </div>
      <div className="max-w-xl pt-20 md:pt-0">
        <h1>Jake Grella</h1>
        <p className="pt-4">
          I live in Los Angeles and work as a software engineer at Northwestern
          Mutual, building the platform underwriters use to manage their daily
          work. I&apos;m a software builder, but I&apos;m also intensely
          interested in figuring out what&apos;s worth building.
        </p>
        <p className="pt-4">
          That curiosity follows me outside of work too. I build internet-based
          tools for people and brands on the side, and long walks with my wife
          and dog tend to turn into unplanned audits of whatever business,
          building, or city situation we stumble upon. People close to me call
          me Mr. Fix It, or Mr. Fun Fact, which I take as compliments.
        </p>
        <p className="pt-4">You can reach me at jake@jakegrella.com.</p>
      </div>
    </div>
  );
}
