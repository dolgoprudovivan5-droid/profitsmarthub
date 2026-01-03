
"use client";
import {useEffect, useState} from "react";
import {StartLearningButton} from "@/components/start-learning-button"
import "@/styles/header.css"
import { useScreen } from "@/contexts/ScreenContext"
import { assets } from "@/assets/images/assets"

interface Props {
    isLoading: boolean;
}

export function Header({isLoading}: Props) {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const { isPhone, isTablet } = useScreen();

    function handleMenuButtonClick() {
        // Блокировка скролла только для мобильных устройств и планшетов
        if (isPhone || isTablet) {
            // Сохраняем текущую позицию скролла
            const scrollY = window.scrollY;
            setCurrentScrollY(scrollY);
            
            // Получаем ширину полосы прокрутки
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            
            // Применяем стили для блокировки скролла с компенсацией полосы прокрутки
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            
            // Компенсируем сдвиг для фиксированных элементов (если нужно)
            const header = document.querySelector('header');
            if (header) {
                header.style.paddingRight = `${scrollBarWidth}px`;
            }
        }
        
        // Активируем меню
        document.querySelector('.webpage-content')?.classList.add('overflowed');
        document.querySelector('header')?.classList.add('active');
        document.querySelector('.nav')?.classList.add('active');
        document.querySelector(".menu-button-container")?.classList.remove('active');
    }

    function handleCloseButtonClick() {
        // Убираем стили блокировки скролла только для мобильных устройств и планшетов
        if (isPhone || isTablet) {
            // Убираем стили блокировки скролла
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
            
            // Убираем компенсацию для header
            const header = document.querySelector('header');
            if (header) {
                header.style.paddingRight = '';
            }
            
            // Возвращаем скролл на прежнюю позицию
            window.scrollTo(0, currentScrollY);
        }
        
        // Деактивируем меню
        document.querySelector('.webpage-content')?.classList.remove('overflowed');
        document.querySelector('header')?.classList.remove('active');
        document.querySelector('.nav')?.classList.remove('active');
        document.querySelector(".menu-button-container")?.classList.add('active');
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
            if (window.scrollY > lastScrollY && isScrolled) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, isScrolled]);

    if (isLoading) return null;

    return (
        <header
            style={{
                position: "fixed",
                top: visible ? "0" : "calc(-13vh)",
                left: 0,
                transition: "top 0.3s ease-in-out, background 0.3s ease-in-out",
                background: isScrolled ? "rgba(0, 0, 0, 0.9)" : "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 9999, // Убедимся что header всегда сверху
            }}
        >
            <div className={`nav`}>
                {(isPhone || isTablet) ?
                    <div className={"close-button-container"}>
                        <button className={"closeButton"} onClick={handleCloseButtonClick}>
                            {assets.close}
                        </button>
                    </div>
                    : ""
                }
                <nav>
                    <a href="#main" className="nav-link" onClick={handleCloseButtonClick}>Главная</a>
                    <a href="#advantages" className="nav-link" onClick={handleCloseButtonClick}>Преимущества</a>
                    <a href="#formats" className="nav-link" onClick={handleCloseButtonClick}>Формат</a>
                    <a href="#program" className="nav-link" onClick={handleCloseButtonClick}>Програма</a>
                </nav>
                <a href="#form" onClick={handleCloseButtonClick}>
                    <StartLearningButton/>
                </a>
            </div>
            {(isPhone || isTablet) ?
                <div className={"menu-button-container active"}>
                    <button className={"menu-button"} onClick={handleMenuButtonClick}>
                        {assets.burgerMenu}
                    </button>
                </div>
                : ""
            }
        </header>
    );
}

export default Header;