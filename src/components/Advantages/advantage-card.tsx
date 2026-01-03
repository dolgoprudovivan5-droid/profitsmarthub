"use client";
import * as React from "react";

interface AdvantageCardProps {
    backgroundImage: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    title: string;
    overlayPosition?: "left" | "right" | "center";
    className?: string;
}

export const AdvantageCard: React.FC<AdvantageCardProps> = ({
                                                                backgroundImage,
                                                                title,
                                                            }) => {

    const cardStyle = {
        background: `url(${backgroundImage})`,
    };

    return (
        <article
            className={"advantage-card"}
            style={cardStyle}
        >
            <h3 className={"card-title"}>{title}</h3>
        </article>
    );
};
