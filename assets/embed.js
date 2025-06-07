// Embed mode detection script
document.addEventListener('DOMContentLoaded', function() {
    // Check if page is being loaded in an iframe
    (function(){
        const inIframe = window.self !== window.top;
        
        // If we're in an iframe, apply embed-mode by default
        // We'll use URL parameters to control this behavior
        if (inIframe) {
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const embedMode = urlParams.get('embed');
            
            // If embed parameter is explicitly set to 'false', don't apply embed mode
            // Otherwise, apply it by default when in an iframe
            if (embedMode !== 'false') {
                document.documentElement.classList.add('embed-mode');
                console.log('→ embed-mode class applied');
            } else {
                console.log('→ embed-mode disabled via URL parameter');
            }
        }
    })();
});

