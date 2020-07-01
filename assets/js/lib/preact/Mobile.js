import { h } from "preact";

import { Box } from "./Box";
import { SvgSend } from "./svg/SvgSend";
import { SvgStatic } from "./svg/SvgStatic";

//
// styles
//

const styleSvg = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -20%)",
    maxWidth: 280,
};

//
// view
//

export const Mobile = ({
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
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="center"
        height={480}
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
            flexGrow={3}
            flexShrink={0}
            overflow="visible"
            position="relative"
            width="100%"
        >
            {!isSubmitted ? (
                <SvgStatic style={styleSvg} />
            ) : (
                <SvgSend style={styleSvg} />
            )}
        </Box>
        <Box
            alignItems="center"
            display="flex"
            height={200}
            justifyContent="center"
            flexBasis={0}
            flexGrow={2}
            flexDirection="column"
            flexShrink={0}
            width="100%"
        >
            <Box
                display="flex"
                flexDirection="column"
                flexGrow={1}
                justifyContent="center"
                width="100%"
            >
                <p className="subscription-form-textline_mobile">
                    Каждое воскресенье
                </p>
                <p className="subscription-form-textline_mobile">
                    узнавай о новых статьях
                </p>
                <p className="subscription-form-textline_mobile">
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
                    justifyContent="center"
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
                        <p className="subscription-form-textline_mobile">
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
