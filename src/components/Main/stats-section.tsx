"use client";
import * as React from "react";
import '@/styles/stats-section.css'

interface StatItemProps {
    value: string;
    label: string;
}

function StatItem({ value, label }: StatItemProps) {
    return (
        <div className={"stat-item"}>
            <div className={"stat-value"}>{value}</div>
            <div className={"stat-label"}>{label}</div>
        </div>
    );
}

export function StatsSection() {
    return (
        <div className={"stats-container"}>
            <div className={"stats-grid"}>
                <StatItem value="3+" label="лет на рынке" />
                <StatItem value="5" label="профессионалов в команде" />
                <StatItem value="500+" label="обученых студентов" />
                <StatItem value="89" label="практикующих трейдеров" />
            </div>
        </div>
    );
}
