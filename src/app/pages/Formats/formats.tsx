
"use client";
import * as React from "react";
import { assets } from "@/assets/images/assets";
import { SectionTitle } from "@/components/SectionTitle"
import "@/styles/formats.css"

export function Formats() {
    const individualRef = React.useRef<HTMLDivElement>(null);
    const groupRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target === individualRef.current) {
                    individualRef.current?.classList.add("visible");

                    // Задержка перед появлением второй карточки
                    setTimeout(() => {
                        groupRef.current?.classList.add("visible");
                    }, 300);
                }
            });
        }, {
            threshold: 0.5,
        });

        if (individualRef.current) observer.observe(individualRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id={"formats"}>
            <SectionTitle text="формат обучения" />

            <div className="cards-container">
                <article
                    ref={individualRef}
                    className="individual-card reveal"
                    style={{
                        background: `url(${assets.individualBg.src})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="format-card-content">
                        <div>{assets.individualIcon}</div>
                        <h3>Индивидуальные</h3>
                    </div>
                </article>

                <article
                    ref={groupRef}
                    className="group-card reveal"
                    style={{
                        background: `url(${assets.groupBg.src})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="format-card-content">
                        <div>{assets.groupIcon}</div>
                        <h3>Групповые</h3>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Formats;
