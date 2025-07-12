import React, { ReactNode } from "react";

import { useTheme } from "../../theme";
import { SpacingNames } from "../../theme/typings";

const Card: React.FC<{
  radius?: SpacingNames
  padding?: SpacingNames
  marginTop?: SpacingNames
  marginBottom?: SpacingNames
  hideShadow?: boolean
  children?: ReactNode
}> = ({
  radius = "md",
  padding = "sm",
  marginTop = "md",
  marginBottom = "md",
  hideShadow = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <div
      className={`container p-${theme.spacing[padding]} rounded-${theme.spacing[radius]} mt-${theme.spacing[marginTop]} mb-${theme.spacing[marginBottom]}`}
      style={{
        ...(!hideShadow && { boxShadow: theme.styles.shadow.md }),
      }}
    >
      {props.children}
    </div>
  );
};

export default Card;
