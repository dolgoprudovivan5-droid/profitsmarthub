interface ContentSectionProps {
    title: string;
    items: string[];
}

export const ContentSection: React.FC<ContentSectionProps> = ({
                                                           title,
                                                           items,
                                                       }) => {
    return (
        <div className={"program-content-section"}>
            {title != "" && <h3>{title}</h3>}
            <div className={"section-items"}>
                {items.map((item, index) => (
                    <p key={index} className={"section-item"}>
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ContentSection;