import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import useMedia from "use-media";

import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

//
// view
//

const FormSubscribe = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isWide = useMedia({ minWidth: "800px" });

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

    return isWide ? (
        <Desktop
            email={email}
            isSubmitted={isSubmitted}
            isSubmitting={isSubmitting}
            onEmailChange={handleEmailChange}
            onSubscribe={handleSubscribe}
        />
    ) : (
        <Mobile
            email={email}
            isSubmitted={isSubmitted}
            isSubmitting={isSubmitting}
            onEmailChange={handleEmailChange}
            onSubscribe={handleSubscribe}
        />
    );
};

const $preactFormSubscribe = document.getElementById("preact-form-subscribe");

const FormSubscribeApp = <FormSubscribe />;

if ($preactFormSubscribe) {
    render(FormSubscribeApp, $preactFormSubscribe);
}
