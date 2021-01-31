(function (window, document) {
    if (!window.Casper) {
        window.Casper = {};
    }

    function fixMobileMenuInputId() {
        const sameInputs = document.querySelectorAll("#id-site-nav-open");
        const sameInputsLabelsOpen = document.querySelectorAll(".menu-open__label");
        const sameInputsLabelsClose = document.querySelectorAll(".menu-close__label");
        if (sameInputs[0] && sameInputsLabelsOpen[0] && sameInputsLabelsClose[0]) {
            sameInputs[0].id = 'id-site-nav-open-main';
            sameInputsLabelsOpen[0].setAttribute('for', 'id-site-nav-open-main');
            sameInputsLabelsClose[0].setAttribute('for', 'id-site-nav-open-main');
        }
    }

    fixMobileMenuInputId();
})(window, document);
