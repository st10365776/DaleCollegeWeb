document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;
    const rootPrefix = path.includes("/sports/") ? "../" : "";

    const normalizeUrl = (value) => {
        if (!value || value.startsWith("http") || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("data:")) {
            return value;
        }

        if (value.startsWith("/")) {
            return value;
        }

        return `${rootPrefix}${value}`;
    };

    const injectMarkup = (rawHtml) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = rawHtml;

        wrapper.querySelectorAll("[href]").forEach((element) => {
            const nextValue = normalizeUrl(element.getAttribute("href"));
            if (nextValue) {
                element.setAttribute("href", nextValue);
            }
        });

        wrapper.querySelectorAll("[src]").forEach((element) => {
            const nextValue = normalizeUrl(element.getAttribute("src"));
            if (nextValue) {
                element.setAttribute("src", nextValue);
            }
        });

        return Array.from(wrapper.childNodes);
    };

    const inject = async (id, fileName) => {
        const placeholder = document.getElementById(id);
        if (!placeholder) return;
        try {
            const response = await fetch(`${rootPrefix}${fileName}`, { cache: "no-store" });
            const html = await response.text();
            const nodes = injectMarkup(html);
            placeholder.replaceWith(...nodes);
        } catch (error) {
            console.warn(`Failed to load ${fileName}:`, error);
        }
    };

    await Promise.all([
        inject("site-header", "header.html"),
        inject("site-footer", "footer.html")
    ]);

    window.dispatchEvent(new CustomEvent("layoutReady"));
});
