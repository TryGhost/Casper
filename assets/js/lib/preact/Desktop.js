import { h } from "preact";

import { Box } from "./Box";
import { SvgSend } from "./svg/SvgSend";
import { SvgStatic } from "./svg/SvgStatic";

//
// styles
//

const svgStyle = {
    maxHeight: "calc(100% + 80px)",
    width: "100%",
};

//
// view
//

export const Desktop = ({
    email,
    isSubmitted,
    isSubmitting,
    onEmailChange,
    onSubscribe,
}) => (
    <Box
        alignItems="center"
        backgroundColor="#F2F5FA"
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="center"
        height={220}
        marginBottom={50}
        marginTop={50}
        overflow="visible"
        paddingBottom={20}
        paddingLeft={20}
        paddingRight={20}
        paddingTop={20}
        width="100%"
    >
        <Box
            alignItems="center"
            height="100%"
            justifyContent="center"
            flexBasis={0}
            flexGrow={1}
            flexShrink={0}
            overflow="visible"
            position="relative"
        >
            {!isSubmitted ? (
                <SvgStatic style={svgStyle} />
            ) : (
                <SvgSend style={svgStyle} />
            )}
        </Box>
        <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            flexBasis={0}
            flexGrow={1}
            flexDirection="column"
            flexShrink={0}
            width="100%"
        >
            <Box
                display="flex"
                flexDirection="column"
                flexGrow={1}
                width="100%"
            >
                <p className="subscription-form-textline_desktop">
                    Каждое воскресенье
                </p>
                <p className="subscription-form-textline_desktop">
                    узнавай о новых статьях
                </p>
                <p className="subscription-form-textline_desktop">
                    из рассылки главреда
                </p>
            </Box>
            <Box
                alignItems="center"
                backgroundColor={
                    !isSubmitted ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"
                }
                borderRadius={55}
                flexDirection="row"
                flexGrow={0}
                height={55}
                justifyContent="center"
                paddingLeft={20}
                paddingRight={20}
                width="100%"
            >
                <Box
                    alignItems="center"
                    display="flex"
                    flexGrow={1}
                    flexShrink={1}
                    justifyContent="flex-start"
                >
                    {!isSubmitted ? (
                        <input
                            className="subscription-form-input"
                            onChange={onEmailChange}
                            placeholder="Введите ваш email"
                            type="text"
                            value={email}
                        />
                    ) : (
                        <p className="subscription-form-textline_desktop">
                            Спасибо за подписку
                        </p>
                    )}
                </Box>
                <Box display="flex" flexGrow={0} marginLeft={10}>
                    {!isSubmitted ? (
                        <button
                            className="subscription-form-button"
                            disabled={isSubmitting}
                            onClick={onSubscribe}
                        >
                            ⭢
                        </button>
                    ) : (
                        <span
                            className="subscription-form-button"
                            onClick={handleSubscribe}
                        >
                            ✓
                        </span>
                    )}
                </Box>
            </Box>
        </Box>
    </Box>
);
