// Google Analytics with real ID
(function() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YZ57YVQNC8';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-YZ57YVQNC8');
    console.log('Google Analytics loaded with ID G-YZ57YVQNC8');
})();
