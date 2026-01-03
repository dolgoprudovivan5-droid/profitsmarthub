

//best
import React, {useEffect, useRef, useState} from 'react';
import {easeInOut, motion, AnimatePresence} from 'framer-motion';
import {ContentSection} from "./ContentSection";
import {NavigationArrow} from "./NavigationArrow";
import {useScreen} from '@/contexts/ScreenContext';

export const ProgramContent: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const individualRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);
    const {isTablet, isPhone} = useScreen();

    const contentData = [
        {
            title: "1. Знакомство",
            items: [
                "2. Зачем тебе крипта",
                "3. Что такое крипта",
                "4. Что такое блокчейны и почему их много",
                "5.1. Какие есть блокчейны и зачем их так много",
                "5.2. Основные группы блокчейнов (PoW/PoS, EVM/non-EVM, L1/L2)",
                "5.3. Эксплореры",
            ],
        },
        {
            title: "6. Основные единицы в крипте: монеты, токены, стейблкоины и NFT",
            items: ["6.1. Монета", "6.2. Токены", "6.3. Стейблкоины", "6.4. NFT"],
        },
        {
            title: "7. Что такое крипта ещё раз или какие есть проекты",
            items: [
                "7.1. Блокчейны",
                "7.2. DeFi",
                "7.3. Инфраструктурные проекты",
                "7.4. NFT",
                "7.5. GameFi",
                "7.6. Мемкоины/щиткоины",
            ],
        },
        {
            title: "8. Крипта: как торговать, хранить и купить её",
            items: [
                "8.1. Как торговать криптой",
                "8.2. Как хранить крипту",
                "8.3. Как купить крипту (подробный гайд)",
            ],
        },
        {
            title: "10. Фазы рынка и причём тут халвинг Биткоина. Безопасность в крипте. Очень важно!",
            items: [
                "10.1. Базовые советы",
                "10.2. Виды скама в крипте",
                "11.1. Цикл жизни типичного проекта",
                "11.2. Фонды. Немного про распределение денег в крипте",
                "11.3. Поиск и анализ проектов"
            ],
        },
        {
            title: "12. Виды заработка на крипте",
            items: [
                "12.1. Инвестиции + трейдинг",
                "12.2. Паблик Сейлы (ICO, IDO)",
                "12.3. Аирдропы",
                "12.4. Майнинг и ноды",
                "12.5. NFT",
                "12.6. Мемкоины/щиткоины",
                "12.7. Play-to-Earn",
                "12.8. Арбитраж",
                "12.9. DeFi",
                "12.10. Амбассадорство"
            ],
        },
        {
            title: "13. Мультиаккаунтинг. Как зарабатывать на крипте в 100 раз больше",
            items: [
                "13.1. Кошельки",
                "13.2. Соцсети + почта",
                "13.3. Анонимизация фермы (прокси + антидетект)",
                "13.4. Ончейн-гигиена",
                "13.5. Мультиаккаунтинг через софт"
            ],
        },
        {
            title: "14. Полезные инструменты и расходники для мультиаккаунтинга",
            items: [
                "14.1. Рейтинги и графики криптовалют",
                "14.2. Эксплореры",
                "14.3. Трекеры кошельков и портфеля",
                "14.4. Календари",
                "14.5. Криптокошельки",
                "14.6. Холодные кошельки"
            ],
        },
        {
            title: "",
            items: [
                "14.7. Централизованные криптобиржи (CEX)",
                "14.8. Криптообменники",
                "14.9. Ресёрч",
                "14.10. Трекинг инвестиций",
                "14.11. Децентрализованные биржи (DEX)",
                "14.12. Мосты",
                "14.13. DeFi аналитика",
                "14.14. NFT Маркетплейсы",
                "14.15. Фишечные сервисы",
                "14.16. Инструменты по блокчейнам (EVM/TON/Solana/SUI/Aptos/Starknet/Bitcoin)",
                "14.17. Расходники для мультиаккаунтинга"
            ],
        }
    ];

    const numSlide = isPhone ? 1 : isTablet ? 2 : 4;

    // Группируем контент по слайдам
    const slides = [];
    for (let i = 0; i < contentData.length; i += numSlide) {
        slides.push(contentData.slice(i, i + numSlide));
    }

    const totalSlides = slides.length;
    const currentSections = slides[currentSlide] || [];

    // Эффект для корректировки позиции при изменении разрешения
    useEffect(() => {
        if (currentSlide >= totalSlides) {
            setCurrentSlide(Math.max(0, totalSlides - 1));
        }
    }, [isPhone, isTablet, currentSlide, totalSlides]);

    // Варианты анимации для контейнера секций
    const slideVariants = {
        enter: (direction: 'next' | 'prev') => ({
            x: direction === 'next' ? 60 : -60,
            opacity: 0,
            scale: 1
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: 'next' | 'prev') => ({
            x: direction === 'next' ? -60 : 60,
            opacity: 0,
            scale: 1
        })
    };

    // Варианты анимации для отдельных секций
    const sectionVariants = {
        enter: {opacity: 0, y: 0},
        center: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.05,    // ← Задержка между секциями
                duration: 0.6,          // ← Скорость появления секции
                ease: easeInOut
            }
        }),
        exit: {opacity: 0, y: 0}
    };

    // Переход анимации
    const transition = {
        duration: 0.3,  // ← ОСНОВНАЯ СКОРОСТЬ - уменьшите это значение
        ease: easeInOut
    };

    // Обработчики кнопок
    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            setDirection('next');
            setCurrentSlide(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setDirection('prev');
            setCurrentSlide(prev => prev - 1);
        }
    };

    useEffect(() => {
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
        <div>
            <div className={"program-content reveal"} ref={individualRef}>
                <div className={"program-content-container"}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className={"program-content-text"}
                        >
                            <div className={"program-row"}>
                                {currentSections.slice(0, 2).map((section, index) => (
                                    <motion.div
                                        key={`${currentSlide}-${index}`}
                                        custom={index}
                                        variants={sectionVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                    >
                                        <ContentSection
                                            title={section.title}
                                            items={section.items}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            {!isTablet && !isPhone &&
                                <div className={"program-row"}>
                                    {currentSections.slice(2, 4).map((section, index) => (
                                        <motion.div
                                            key={`${currentSlide}-${index + 2}`}
                                            custom={index + 2}
                                            variants={sectionVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                        >
                                            <ContentSection
                                                title={section.title}
                                                items={section.items}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <nav className="carousel-navigation reveal" ref={groupRef}>
                <NavigationArrow
                    direction="prev"
                    onClick={handlePrev}
                    isActive={currentSlide > 0}
                />
                <NavigationArrow
                    direction="next"
                    onClick={handleNext}
                    isActive={currentSlide < totalSlides - 1}
                />
            </nav>
        </div>
    );
};

export default ProgramContent;