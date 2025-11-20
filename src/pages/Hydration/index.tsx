import { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import HydrationQuickAdd from "../../components/HydrationQuickAdd/HydrationQuickAdd";
import style from "./Hydration.module.css";

export default function Hydration() {
  return (
    <div className={style.container}>
      <Logo />
      <HydrationQuickAdd />
    </div>
  );
}
