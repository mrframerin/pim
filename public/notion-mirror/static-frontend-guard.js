(function () {
  var blockedPathPatterns = [
    /^\/api(?:\/|$)/,
    /^\/front-api(?:\/|$)/,
    /^\/login(?:\/|$)/,
    /^\/signup(?:\/|$)/,
    /^\/oauth(?:\/|$)/,
    /^\/auth(?:\/|$)/
  ];

  var blockedHostPatterns = [
    /(^|\.)notion\.so$/,
    /(^|\.)sentry\.io$/,
    /(^|\.)segment\.io$/,
    /(^|\.)segment\.com$/,
    /(^|\.)amplitude\.com$/,
    /(^|\.)amplitude\.com\.cdn\.cloudflare\.net$/,
    /(^|\.)statsigapi\.net$/,
    /(^|\.)statsig\.com$/,
    /(^|\.)accounts\.google\.com$/,
    /(^|\.)transcend-cdn\.com$/,
    /(^|\.)transcend\.io$/,
    /(^|\.)splunk\.com$/,
    /(^|\.)splunkcloud\.com$/,
    /(^|\.)google-analytics\.com$/,
    /(^|\.)googletagmanager\.com$/,
    /(^|\.)doubleclick\.net$/
  ];

  function toUrl(input) {
    try {
      var raw = typeof input === "string" ? input : input && input.url;
      return raw ? new URL(raw, window.location.href) : null;
    } catch (_) {
      return null;
    }
  }

  function isBlocked(input) {
    var url = toUrl(input);
    if (!url) return false;

    if (url.origin === window.location.origin) {
      return blockedPathPatterns.some(function (pattern) {
        return pattern.test(url.pathname);
      });
    }

    return blockedHostPatterns.some(function (pattern) {
      return pattern.test(url.hostname);
    });
  }

  function localizeAssetUrl(value) {
    if (typeof value !== "string") return value;
    try {
      var url = new URL(value, window.location.href);
      if (url.origin === window.location.origin && url.pathname === "/_next/image") {
        var imageUrl = url.searchParams.get("url");
        if (imageUrl && imageUrl.indexOf("/front-static/") === 0) {
          return "/notion-mirror" + imageUrl;
        }
      }
      if (url.origin === window.location.origin && url.pathname.startsWith("/_next/static/")) {
        return "/notion-mirror" + url.pathname + url.search + url.hash;
      }
      if (url.origin === window.location.origin && url.pathname.startsWith("/front-static/")) {
        return "/notion-mirror" + url.pathname + url.search + url.hash;
      }
    } catch (_) {}
    return value
      .replace(/^\/_next\/static\//, "/notion-mirror/_next/static/")
      .replace(/^\/front-static\//, "/notion-mirror/front-static/");
  }

  function safeScriptUrl(value) {
    if (isBlocked(value)) return "data:text/javascript,";
    return localizeAssetUrl(value);
  }

  function localizeSrcset(value) {
    if (typeof value !== "string") return value;
    return value
      .split(",")
      .map(function (candidate) {
        var parts = candidate.trim().split(/\s+/);
        if (!parts[0]) return candidate;
        parts[0] = localizeAssetUrl(parts[0]);
        return parts.join(" ");
      })
      .join(", ");
  }

  function neutralizeAuthLinks(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('a[href^="/login"], a[href^="/signup"]').forEach(function (link) {
      link.setAttribute("href", "#");
    });
    root.querySelectorAll('[data-analytics-href^="/login"], [data-analytics-href^="/signup"]').forEach(function (node) {
      node.setAttribute("data-analytics-href", "#");
    });
  }

  var emptyJson = new Response("{}", {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });

  if (window.fetch) {
    var originalFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      if (!isBlocked(input) && typeof input === "string") input = localizeAssetUrl(input);
      if (isBlocked(input)) return Promise.resolve(emptyJson.clone());
      return originalFetch(input, init);
    };
  }

  if (window.XMLHttpRequest) {
    var originalOpen = XMLHttpRequest.prototype.open;
    var originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
      url = localizeAssetUrl(url);
      this.__notionMirrorBlocked = isBlocked(url);
      arguments[1] = url;
      return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
      if (!this.__notionMirrorBlocked) return originalSend.apply(this, arguments);
      setTimeout(function (xhr) {
        try {
          Object.defineProperty(xhr, "readyState", { value: 4 });
          Object.defineProperty(xhr, "status", { value: 200 });
          Object.defineProperty(xhr, "responseText", { value: "{}" });
          xhr.onreadystatechange && xhr.onreadystatechange();
          xhr.onload && xhr.onload();
        } catch (_) {}
      }, 0, this);
    };
  }

  if (navigator.sendBeacon) {
    navigator.sendBeacon = function () {
      return true;
    };
  }

  [
    [typeof HTMLScriptElement !== "undefined" && HTMLScriptElement.prototype, "src"],
    [typeof HTMLLinkElement !== "undefined" && HTMLLinkElement.prototype, "href"],
    [typeof HTMLImageElement !== "undefined" && HTMLImageElement.prototype, "src"],
    [typeof HTMLImageElement !== "undefined" && HTMLImageElement.prototype, "srcset"],
    [typeof HTMLSourceElement !== "undefined" && HTMLSourceElement.prototype, "src"],
    [typeof HTMLSourceElement !== "undefined" && HTMLSourceElement.prototype, "srcset"]
  ].forEach(function (entry) {
    var prototype = entry[0];
    var attribute = entry[1];
    if (!prototype) return;

    var descriptor = Object.getOwnPropertyDescriptor(prototype, attribute);

    if (!descriptor || !descriptor.set) return;

    Object.defineProperty(prototype, attribute, {
      get: descriptor.get,
      set: function (value) {
        if (attribute === "srcset") return descriptor.set.call(this, localizeSrcset(value));
        if (this.tagName === "SCRIPT" && attribute === "src") return descriptor.set.call(this, safeScriptUrl(value));
        return descriptor.set.call(this, localizeAssetUrl(value));
      }
    });
  });

  var originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    var lowerName = String(name).toLowerCase();
    if (lowerName === "srcset") {
      value = localizeSrcset(value);
    } else if (
      (this.tagName === "SCRIPT" && lowerName === "src") ||
      (this.tagName === "LINK" && lowerName === "href") ||
      (this.tagName === "IMG" && lowerName === "src") ||
      (this.tagName === "SOURCE" && lowerName === "src")
    ) {
      value = this.tagName === "SCRIPT" ? safeScriptUrl(value) : localizeAssetUrl(value);
    }
    return originalSetAttribute.call(this, name, value);
  };

  document.addEventListener(
    "click",
    function (event) {
      var link = event.target && event.target.closest && event.target.closest("a[href]");
      if (!link) return;

      var url = toUrl(link.getAttribute("href"));
      if (!url) return;

      if (isBlocked(url.href)) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true
  );

  neutralizeAuthLinks(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(neutralizeAuthLinks);
      if (mutation.type === "attributes") neutralizeAuthLinks(mutation.target && mutation.target.ownerDocument);
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "data-analytics-href"]
  });
})();
