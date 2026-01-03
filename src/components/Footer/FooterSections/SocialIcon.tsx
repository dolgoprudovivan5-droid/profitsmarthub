import React from "react";

interface SocialIconProps {
  svg: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ svg }) => {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};
