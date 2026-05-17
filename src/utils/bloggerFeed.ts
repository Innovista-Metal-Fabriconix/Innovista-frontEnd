const buildJsonpUrl = (url: string, callbackName: string) => {
  const hasAlt = /[?&]alt=/i.test(url);
  let jsonpUrl = url;
  if (hasAlt) {
    jsonpUrl = url.replace(/([?&]alt=)([^&]+)/i, "$1json-in-script");
  } else {
    jsonpUrl += url.includes("?")
      ? "&alt=json-in-script"
      : "?alt=json-in-script";
  }
  const joiner = jsonpUrl.includes("?") ? "&" : "?";
  return `${jsonpUrl}${joiner}callback=${callbackName}`;
};

export const fetchBloggerFeedJsonp = <T>(url: string, timeoutMs = 12000) => {
  return new Promise<T>((resolve, reject) => {
    const callbackName = `__bloggerJsonp_${Date.now()}_${Math.random()
      .toString(16)
      .slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      script.remove();
      delete (globalThis as Record<string, unknown>)[callbackName];
    };

    const timer = globalThis.setTimeout(() => {
      cleanup();
      reject(new Error("Blogger feed JSONP timeout"));
    }, timeoutMs);

    (globalThis as Record<string, unknown>)[callbackName] = (data: unknown) => {
      globalThis.clearTimeout(timer);
      cleanup();
      resolve(data as T);
    };

    script.src = buildJsonpUrl(url, callbackName);
    script.onerror = () => {
      globalThis.clearTimeout(timer);
      cleanup();
      reject(new Error("Blogger feed JSONP failed"));
    };
    document.body.appendChild(script);
  });
};
