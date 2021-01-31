(function (window, document) {
    try {
        const TEMPLATE = `
        <label class="hashtag-toggle__label tag" for="id-hashtag-toggle">
                        <span class="hashtag-toggle__show-all">все</span>
                        <span class="hashtag-toggle__hide">скрыть</span>
                    </label>
        `;

        const hashtagToggler = document.createElement("li");
        hashtagToggler.innerHTML = TEMPLATE;

        const targetContainer = document.querySelector(".site-header-subnav");
        const targetListContainer = targetContainer.querySelector(".nav");
        const targetListElements = targetListContainer.querySelectorAll("li");
        const target = targetListElements[0];

        if (targetListContainer && target && hashtagToggler) {
            targetListContainer.insertBefore(hashtagToggler, target);
        }
    } catch (error) {
        console.warn(error);
    }
})(window, document);
