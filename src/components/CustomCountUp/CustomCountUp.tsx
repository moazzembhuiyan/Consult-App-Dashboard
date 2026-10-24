"use client";

import CountUp from "react-countup";

type CustomCountUpProps = {
  start?: number;
  end?: number | null;
  duration?: number;
};

export default function CustomCountUp({
  start,
  end,
  duration,
}: CustomCountUpProps) {
  return (
    <CountUp
      start={start || 0}
      end={end ?? 0}
      duration={duration || 5}
      separator=" "
      enableScrollSpy={true}
    />
  );
}
