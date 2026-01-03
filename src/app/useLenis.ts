"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function useLenisScroll(isLoading: boolean, isClient: boolean) {
    useEffect(() => {
        if (isLoading || !isClient) return;

        // create Lenis *inside* the effect so it’s only ever constructed in the browser
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // kick-off rAF loop
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.closest('.menu-button-container')) {
                return;
            }
            const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;

            

            if (link?.hash) {
                const targetEl = document.querySelector(link.hash);
                if (targetEl) {
                    e.preventDefault();

                    /* --- close the menu --- */
                    document.querySelector(".webpage-content")?.classList.remove("overflowed");
                    document.querySelector("header")?.classList.remove("active");
                    document.querySelector(".nav")?.classList.remove("active");
                    document.querySelector(".menu-button-container")?.classList.add("active");

                    /* --- wait 300 ms, then scroll --- */
                    setTimeout(() => {
                        lenis.scrollTo(targetEl as HTMLElement, { offset: 0, duration: 1.2 });
                    }, 300);
                }
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            lenis.destroy();
            document.removeEventListener("click", handleClick);
        };
    }, [isLoading, isClient]);
}
