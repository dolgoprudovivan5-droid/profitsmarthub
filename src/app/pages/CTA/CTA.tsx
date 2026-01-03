"use client";
import {CTAContent} from "@/components/CTA/CTAContent";
import {assets} from "@/assets/images/assets"
import "@/styles/cta.css"
import {useEffect, useRef} from "react";

export const CTA = () => {

    const individualRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target === individualRef.current) {
                    individualRef.current?.classList.add("visible");
                }
            });
        }, {
            threshold: 0.5,
        });

        if (individualRef.current) observer.observe(individualRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id={"cta"}>
            <div ref={individualRef} className="wrapper reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={assets.cta.src}
                    alt=""
                    className={"cta-image"}
                />
                <CTAContent/>
            </div>
        </section>
    );
};

export default CTA;
