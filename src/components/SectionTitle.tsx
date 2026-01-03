

"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScreen } from "@/contexts/ScreenContext"

gsap.registerPlugin(ScrollTrigger);

export function SectionTitle({ text, isAdvantages = false, }: { text: string, isAdvantages?: boolean; }) {
    const sectionRef = useRef<HTMLDivElement>(null); // full-height wrapper
    const innerRef   = useRef<HTMLDivElement>(null); // element we’ll pin
    const invisibleRef   = useRef<HTMLDivElement>(null); // element we’ll pin
    const titleRef   = useRef<HTMLHeadingElement>(null); // the <h1>
    const { isPhone, isTablet } = useScreen()


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(titleRef.current, { scale: 0.4, transformOrigin: "center top" });

            // Scale animation as section enters
            gsap.to(titleRef.current, {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: invisibleRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                },
            });

            if (isAdvantages) {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: (isPhone || isTablet) ? "-75% top" : "top top",
                    end: isPhone ? "2300% top" : isTablet ? "1150% top" : "1400% top",
                    pin: innerRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                });
                

            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isPhone, isTablet, isAdvantages]);

    return (
        <div ref={sectionRef} className={`section-title ${isAdvantages ? "advantages" : ""}`}>
            <div ref={innerRef} >
                <h1 ref={titleRef}>{text}</h1>
            </div>
            <div className={"invisible-trigger"} ref={invisibleRef}></div>
        </div>
    );
}
