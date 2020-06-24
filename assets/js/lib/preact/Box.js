import { h } from "preact";

export const Box = ({
    alignItems = "flex-start",
    backgroundColor = "none",
    borderRadius = "0px",
    children,
    display = "flex",
    flex = "0 0 auto",
    flexBasis = "auto",
    flexDirection = "row",
    flexGrow = 0,
    flexShrink = 0,
    height = "auto",
    justifyContent = "flex-start",
    marginBottom = 0,
    marginLeft = 0,
    marginTop = 0,
    overflow = "auto",
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    position = "realtive",
    style = {},
    width = "auto",
}) => {
    return (
        <div
            style={{
                alignItems,
                backgroundColor,
                borderRadius,
                display,
                flex,
                flexBasis,
                flexDirection,
                flexGrow,
                flexShrink,
                height,
                justifyContent,
                marginBottom,
                marginLeft,
                marginTop,
                overflow,
                padding,
                paddingBottom,
                paddingLeft,
                paddingRight,
                paddingTop,
                position,
                width,
                ...style,
            }}
        >
            {children}
        </div>
    );
};
