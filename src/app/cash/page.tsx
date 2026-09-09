"use client";

import { useEffect } from "react";
import { PhoneApp } from "@/components/phone-app";

export default function Page() {
  useEffect(() => {
    if (window.location.hash !== "#cash") window.location.hash = "cash";
  }, []);
  return <PhoneApp />;
}
