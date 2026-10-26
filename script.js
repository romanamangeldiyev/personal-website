/* Roman Amangeldiyev — site bootstrap.
   Core UI behavior and SEO/GEO enhancements are split so both can evolve
   without duplicating logic across pages. */
(function () {
  "use strict";
  ["script-core.js", "seo-enhancements.js"].forEach(function (src) {
    var s = document.createElement("script");
    s.src = src;
    s.async = false;
    document.head.appendChild(s);
  });
})();
