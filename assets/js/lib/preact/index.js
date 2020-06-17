import { h, render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import { SvgSend } from "./svg/send";
import { SvgStatic } from "./svg/static";

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
    padding: "10px",
};

const styleTextLine = {
    lineHeight: 1.25,
    margin: 0,
};

//
// view
//

const Box = ({
    alignItems = "flex-start",
    backgroundColor = "none",
    borderRadius = "0px",
    children,
    display = "flex",
    elementProps = {},
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
                paddingTop,
                position,
                width,
                ...elementProps,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

const FormSubscribe = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const refCotainer = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubscribe = async () => {
        setIsSubmitting(true);
        try {
            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                throw new Error("Введите корректный email адрес");
            }
            const fd = new FormData();
            fd.append("email", email);
            const res = await fetch(
                `https://api.noty.one/subscribe/16/551/default/email/true/`,
                { body: fd, method: "POST" }
            );
            if (res.status === 200) {
                setIsSubmitted(true);
            }
        } catch (error) {
            alert(error.message);
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        document.getElementById("preact-form-subscribe").style = "width: 100%;";
    }, []);

    return (
        <Box
            backgroundColor="#F2F5FA"
            display="flex"
            elementProps={{ ref: refCotainer }}
            flexDirection="row"
            flexWrap="nowrap"
            height="220px"
            marginBottom="20px"
            marginTop="20px"
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
                display="flex"
                height="100%"
                justifyContent="center"
                flexBasis="0"
                flexGrow="1"
                flexDirection="column"
                flexShrink="0"
            >
                <Box display="flex" flexDirection="column" flexGrow={0}>
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
                    borderRadius="55px"
                    flexDirection="row"
                    flexGrow={0}
                    height="55px"
                    justifyContent="center"
                    marginTop="30px"
                    padding="20px"
                >
                    <Box
                        alignItems="center"
                        display="flex"
                        flexGrow={1}
                        justifyContent="center"
                    >
                        {!isSubmitted ? (
                            <input
                                onChange={handleEmailChange}
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
                                onClick={handleSubscribe}
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

const FormSubscribeApp = <FormSubscribe />;

render(FormSubscribeApp, document.getElementById("preact-form-subscribe"));
