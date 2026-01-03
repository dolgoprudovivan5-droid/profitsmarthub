"use client";

import { Main } from "@/app/pages/Main/main";
import { Advantages } from "@/app/pages/Advantages/advantages";
import { Formats } from "@/app/pages/Formats/formats";
import { CTA } from "@/app/pages/CTA/CTA";
import { TrainingProgram } from "@/app/pages/TrainingProgram/TrainingProgram";
import { InputDesign } from "@/app/pages/Form/InputDesign";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useLenisScroll } from "./useLenis";
import { useState, useEffect, useRef } from "react";

// Глобальная переменная для хранения функции очистки
let globalScrollCleanup: (() => void) | null = null;

// Немедленная блокировка скролла
const blockScrollImmediately = () => {
  if (typeof window === "undefined") return;

  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.body.style.position = "fixed";
  document.body.style.top = "0";
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.bottom = "0";

  const preventScroll = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const preventTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    return false;
  };

  const preventKeyScroll = (e: KeyboardEvent) => {
    if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
      e.preventDefault();
      return false;
    }
  };

  document.addEventListener("wheel", preventScroll, { passive: false });
  document.addEventListener("touchmove", preventTouchMove, { passive: false });
  document.addEventListener("scroll", preventScroll, { passive: false });
  document.addEventListener("keydown", preventKeyScroll, { passive: false });

  globalScrollCleanup = () => {
    document.removeEventListener("wheel", preventScroll);
    document.removeEventListener("touchmove", preventTouchMove);
    document.removeEventListener("scroll", preventScroll);
    document.removeEventListener("keydown", preventKeyScroll);
  };

  return globalScrollCleanup;
};

// Разблокировка скролла
const unblockScroll = () => {
  if (typeof window === "undefined") return;

  if (globalScrollCleanup) {
    globalScrollCleanup();
    globalScrollCleanup = null;
  }

  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.paddingRight = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.bottom = "";

  document.body.style.overflow = "visible";
  document.documentElement.style.overflow = "visible";

  setTimeout(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, 100);
};

// Прелоадер
type PreloaderProps = {
  onComplete?: () => void;
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const progressRef = useRef(0);
  const isCompleteRef = useRef(false);

  const smoothUpdateProgress = (target: number) => {
    const interval = setInterval(() => {
      if (progressRef.current < target) {
        progressRef.current += 1;
        setProgress(progressRef.current);
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  useEffect(() => {
    let loadedCount = 0;
    const totalSteps = 3;

    const completeLoading = () => {
      if (isCompleteRef.current) return;
      isCompleteRef.current = true;

      const interval = setInterval(() => {
        if (progressRef.current < 100) {
          progressRef.current += 1;
          setProgress(progressRef.current);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsSliding(true);
            setTimeout(() => {
              setIsVisible(false);
              onComplete?.();
            }, 800); // slide animation
          }, 300); // pause on 100%
        }
      }, 15);
    };

    const checkStep = () => {
      loadedCount++;
      const target = Math.floor((loadedCount / totalSteps) * 90);
      smoothUpdateProgress(target);

      if (loadedCount >= totalSteps) {
        setTimeout(() => {
          completeLoading();
        }, 200);
      }
    };

    // DOM ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", checkStep);
    } else {
      checkStep();
    }

    // Images
    const images = document.querySelectorAll("img");
    const imagePromises = Array.from(images).map((img) => {
      return new Promise<void>((resolve) => {
        if (img.complete) resolve();
        else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      });
    });

    Promise.race([
      Promise.all(imagePromises),
      new Promise((resolve) => setTimeout(resolve, 5000)), // fail-safe
    ]).then(checkStep);

    // Fonts
    if (document.fonts) {
      document.fonts.ready.then(checkStep);
    } else {
      setTimeout(checkStep, 300);
    }

    const maxTimeout = setTimeout(() => {
      completeLoading();
    }, 8000);

    return () => clearTimeout(maxTimeout);
  }, [onComplete]);

  if (!isVisible) return null;

  const preloaderStyles = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
    transform: isSliding ? "translateY(-100%)" : "translateY(0)",
  };

  const percentageStyles = {
    fontSize: "60px",
    background: "linear-gradient(90deg, #3FEF00 12.39%, #FFF 99.13%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: '"Ermilov", sans-serif'
  };

  return (
    <div style={preloaderStyles}>
      <div style={percentageStyles}>{Math.round(progress)}%</div>
    </div>
  );
};

// Главная
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const cleanup = blockScrollImmediately();
    setIsClient(true);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!isLoading) {
      const timer = setTimeout(() => {
        unblockScroll();
      }, 0); // разблокировка на 1 сек раньше
      return () => clearTimeout(timer);
    }
  }, [isLoading, isClient]);

  useLenisScroll(isLoading, isClient);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
      <>
        <Header isLoading={false} />

        <div style={{ position: "relative", overflow: "hidden", pointerEvents: "none"}}>
      <div className={"webpage-content"}>
        <div className={"background"}>
          <Main />
        <Advantages />
        <Formats />
        <CTA />
        <TrainingProgram />
        </div>
        <InputDesign />
      </div>

      {(!isClient || isLoading) && <Preloader onComplete={handlePreloaderComplete} />}
    </div>
  <Footer />
      </>
  );
}