import {StartLearningButton} from "@/components/start-learning-button";
import {useScreen} from '@/contexts/ScreenContext';

export const CTAContent = () => {

    const {isPhone} = useScreen();

    return (
        <>
            <div className={"cta-content-section"}>
                <h1>Работаем на {isPhone ? <br/> : ""} долгий срок</h1>
                <p className={"description"}>
                    Мы подскажем, как зарабатывать, {isPhone ? "" : <br/>} с качественной аналитикой и поддержкой
                </p>
                <a href={"#form"}>
                    <StartLearningButton/>
                </a>
            </div>
            <div className={"black-zone"}></div>
        </>
    );
};
