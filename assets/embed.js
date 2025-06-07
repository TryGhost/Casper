// Embed mode detection script
document.addEventListener('DOMContentLoaded', function() {
    // Check if page is being loaded in an iframe
    (function(){
        const inIframe = window.self !== window.top;
        let allowed = false;

        if (inIframe) {
            try {
                const host = window.parent.location.hostname;
                // adjust these to whatever you actually want to allow:
                allowed = (
                    host === 'dungeon.church'
                    || host === 'lore.dungeon.church'
                    || host.endsWith('.dungeon.church')
                );
                console.log('Embed parent host:', host, '→ allowed?', allowed);
            } catch (_err) {
                // cross-origin parent: you can't read .location
                console.warn('Cannot read parent domain (cross-origin)');
            }
        }

        if (inIframe && allowed) {
            document.documentElement.classList.add('embed-mode');
            console.log('→ embed-mode class applied');
        }
    })();
});

