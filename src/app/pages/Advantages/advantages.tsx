"use client";

import React, { useLayoutEffect, useRef } from "react";
import { AdvantageCard } from "@/components/Advantages/advantage-card";
import { SectionTitle } from "@/components/SectionTitle";
import "@/styles/advantages.css";
import { assets } from "@/assets/images/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScreen } from "@/contexts/ScreenContext"

gsap.registerPlugin(ScrollTrigger);

export const Advantages: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null); // обёртка, в ней все .row
    const { isPhone, isTablet } = useScreen()

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {
            const rows = gsap.utils.toArray<HTMLDivElement>(".row");

            rows.forEach((row, index) => {
                const isLastRow = index === rows.length - 1; // ← последняя строка?

                const [left, right] = Array.from(row.children) as HTMLElement[];

                const leftCard = Array.from(left.children)[0] as HTMLElement;
                const rightCard = Array.from(right.children)[0] as HTMLElement;

                // ─── ЛЕВАЯ карточка ──────────────────────────────────
                gsap.set(leftCard, {
                    boxShadow: "0 3px 10px 0 #FFF inset",
                    transformOrigin: "center top",
                });
                gsap.to(leftCard, {
                    boxShadow:
                        "0px 3px 9.9px 0px #FFF inset, 0px 5px 15px 5px #164C02 inset",
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "15% bottom",
                        scrub: true,
                    },
                });

                // Fade‑out только если это не последняя строка
                if ((!isLastRow && !isPhone) || isPhone) {
                    gsap.set(left, {
                        opacity: 1,
                        transformOrigin: "center top",
                    });
                    gsap.to(left, {
                        opacity: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: isPhone ? "100% bottom" : "125% bottom",
                            end: isPhone ? "130% bottom" : "175% bottom",
                            scrub: true,
                        },
                    });
                }
                if ((!isLastRow && !isPhone) || isPhone) {
                    ScrollTrigger.create({
                        trigger: row,
                        start: "+25% center",
                        end: "bottom top",
                        pin: left,
                        anticipatePin: 1,
                    });
                } else{
                    ScrollTrigger.create({
                        trigger: row,
                        start: "+25% center",
                        end: "+75% center",
                        pin: left,
                        anticipatePin: 1,
                    });
                }

                // ─── ПРАВАЯ карточка ─────────────────────────────────
                gsap.set(rightCard, {
                    boxShadow: "0 3px 10px 0 #FFF inset",
                    transformOrigin: "center top",
                });
                gsap.to(rightCard, {
                    boxShadow:
                        "0px 3px 9.9px 0px #FFF inset, 0px 5px 15px 5px #164C02 inset",
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "25% bottom",
                        end: "75% bottom",
                        scrub: true,
                    },
                });

                if (!isLastRow) {
                    gsap.set(right, {
                        opacity: 1,
                        transformOrigin: "center top",
                    });
                    gsap.to(right, {
                        opacity: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: isPhone ? "160% bottom" : "175% bottom",
                            end: isPhone ? "190% bottom" : "225% bottom",
                            scrub: true,
                        },
                    });
                }
                if (!isLastRow) {
                    ScrollTrigger.create({
                        trigger: row,
                        start: "75% center",
                        end: "250% top",
                        pin: right,
                        anticipatePin: 1,
                    });
                }
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, [isPhone, isTablet]);

    return (
        <section id="advantages">
            <SectionTitle text="ПРЕИМУЩЕСТВА" isAdvantages={true}/>
            <div className="advantages-wrapper" ref={wrapperRef}>
                <div className="row">
                    <div className="left">
                        <AdvantageCard
                            backgroundImage={assets.freeLearning.src}
                            title="Бесплатное обучение"
                        />
                    </div>
                    <div className="right">
                        <AdvantageCard
                            backgroundImage={assets.individualAndGroup.src}
                            title="Индивидуальные и групповые занятия"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="left">
                        <AdvantageCard
                            backgroundImage={assets.assistance.src}
                            title="Сопровождение на протяжении всего времени работы"
                        />
                    </div>
                    <div className="right">
                        <AdvantageCard
                            backgroundImage={assets.homework.src}
                            title="Домашние задания"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="left">
                        <AdvantageCard
                            backgroundImage={assets.ownAccounts.src}
                            title="Каждый ученик работает по своим биржам самостоятельно но по нашей информации
"
                        />
                    </div>
                    <div className="right">
                        <AdvantageCard
                            backgroundImage={assets.personalMeet.src}
                            title="При работе с большими активами возможна личная встреча"
                        />
                    </div>
                </div>

                <div className="row last">
                    <div className="left">
                        <AdvantageCard
                            backgroundImage={assets.signContract.src}
                            title="Подписание договора"
                        />
                    </div>
                    <div className="right">
                        <AdvantageCard
                            backgroundImage={assets.ourInterest.src}
                            title="Наш интерес 25% от дохода, отправляешь раз в 10 дней"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Advantages;