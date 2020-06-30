import { h } from "preact";

import { Box } from "./Box";
import { SvgSend } from "./svg/SvgSend";
import { SvgStatic } from "./svg/SvgStatic";

//
// styles
//

const styleButton = {
    alignItems: "center",
    backgroundColor: "#2f46b2",
    borderRadius: "32px",
    color: "white",
    display: "flex",
    height: "32px",
    justifyContent: "center",
    outlined: "none",
    width: "32px",
};

const styleInput = {
    border: 0,
    maxWidth: "100%",
    minWidth: 150,
};

const styleTextLine = {
    lineHeight: 1.25,
    margin: 0,
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
}) => {
    return (
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
            width="100%"
        >
            <Box
                alignItems="center"
                height="100%"
                justifyContent="center"
                flexBasis="0"
                flexGrow="1"
                flexShrink="0"
                overflow="visible"
                position="relative"
            >
                {!isSubmitted ? (
                    <SvgStatic
                        style={{
                            maxHeight: "calc(100% + 40px)",
                            width: "calc(100% - 100px)",
                        }}
                    />
                ) : (
                    <SvgSend
                        style={{
                            maxHeight: "calc(100% + 40px)",
                            width: "calc(100% - 100px)",
                        }}
                    />
                )}
            </Box>
            <Box
                alignItems="center"
                display="flex"
                height={200}
                justifyContent="center"
                flexBasis="0"
                flexGrow="1"
                flexDirection="column"
                flexShrink="0"
                width="100%"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow={0}
                    width="100%"
                >
                    <p style={styleTextLine}>Каждое воскресенье</p>
                    <p style={styleTextLine}>узнавай о новых статьях</p>
                    <p style={styleTextLine}>из рассылки главреда</p>
                </Box>
                <Box
                    alignItems="center"
                    backgroundColor={
                        !isSubmitted
                            ? "rgba(255,255,255,1)"
                            : "rgba(255,255,255,0)"
                    }
                    borderRadius={55}
                    flexDirection="row"
                    flexGrow={0}
                    height={55}
                    justifyContent="center"
                    paddingLeft={20}
                    paddingRight={20}
                    marginTop={30}
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
                                onChange={onEmailChange}
                                placeholder="Введите ваш email"
                                style={styleInput}
                                type="text"
                                value={email}
                            />
                        ) : (
                            <p style={styleTextLine}>Спасибо за подписку</p>
                        )}
                    </Box>
                    <Box display="flex" flexGrow={0} marginLeft={10}>
                        {!isSubmitted ? (
                            <button
                                disabled={isSubmitting}
                                onClick={onSubscribe}
                                style={styleButton}
                            >
                                ⭢
                            </button>
                        ) : (
                            <span onClick={handleSubscribe} style={styleButton}>
                                ✓
                            </span>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
