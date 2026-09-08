/* Dale College local content store and public renderers. */
(function () {
    const storageKey = "daleCollegeContent";
    const sports = ["rugby", "hockey", "cricket", "athletics", "swimming", "tennis", "cross-country", "chess"];

    const defaultContent = {
        announcements: [],
        posts: [],
        fixtures: sports.reduce((result, sport) => {
            result[sport] = [];
            return result;
        }, {})
    };

    function getContent() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey));
            return {
                announcements: Array.isArray(saved && saved.announcements) ? saved.announcements : [],
                posts: Array.isArray(saved && saved.posts) ? saved.posts : [],
                fixtures: sports.reduce((result, sport) => {
                    result[sport] = saved && saved.fixtures && Array.isArray(saved.fixtures[sport])
                        ? saved.fixtures[sport]
                        : [];
                    return result;
                }, {})
            };
        } catch (error) {
            return defaultContent;
        }
    }

    function saveContent(content) {
        localStorage.setItem(storageKey, JSON.stringify(content));
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>'"]/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            "\"": "&quot;"
        }[character]));
    }

    function formatDate(value) {
        if (!value) return "ADD DATE";
        const date = new Date(`${value}T12:00:00`);
        return Number.isNaN(date.getTime())
            ? value
            : date.toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
    }

    function sportFromPath() {
        const match = window.location.pathname.match(/sports\/([^/]+)\.html$/);
        return match ? match[1] : "";
    }

    function renderAnnouncement() {
        const announcement = getContent().announcements.find(item => item.published !== false);
        if (!announcement || document.querySelector(".live-announcement")) return;

        const banner = document.createElement("aside");
        banner.className = "live-announcement";
        banner.innerHTML = `<span class="live-announcement-label">ANNOUNCEMENT</span><strong>${escapeHtml(announcement.title)}</strong><span>${escapeHtml(announcement.body)}</span>`;
        document.body.insertBefore(banner, document.body.firstChild);
    }

    function renderPosts() {
        const feed = document.querySelector(".news-feed");
        if (!feed) return;
        const content = getContent();
        const posts = content.posts || [];
        feed.innerHTML = posts.length
            ? posts.map(post => `
                <article class="news-card">
                    <p class="eyebrow">${escapeHtml((post.sport || "General").replace(/-/g, " ").toUpperCase())}</p>
                    <h3>${escapeHtml(post.title)}</h3>
                    <p>${escapeHtml(post.body)}</p>
                </article>
            `).join("")
            : '<article class="news-card empty"><p class="eyebrow">NEWS</p><h3>No posts yet.</h3><p>Use the admin page to publish a school update.</p></article>';
    }

    function renderSportFixtures() {
        const sport = sportFromPath();
        if (!sport) return;
        const fixtures = getContent().fixtures[sport] || [];
        const table = document.querySelector(".detail-table");
        if (!table || !fixtures.length) return;

        table.innerHTML = `<div class="detail-row detail-heading"><span>DATE</span><span>OPPOSITION</span><span>VENUE / TEAM</span><span>STATUS</span></div>${fixtures.map(fixture => `<div class="detail-row"><strong>${escapeHtml(formatDate(fixture.date))}</strong><span>${escapeHtml(fixture.opposition)}</span><span>${escapeHtml(fixture.venue)} / ${escapeHtml(fixture.team)}</span><a href="${escapeHtml(fixture.link || "../sport.html")}">${escapeHtml(fixture.status || "Details")}</a></div>`).join("")}`;
    }

    function renderLandingFixtures() {
        const board = document.querySelector(".fixture-board");
        if (!board) return;
        const content = getContent();
        const fixtures = sports.flatMap(sport => (content.fixtures[sport] || []).map(fixture => ({ ...fixture, sport })));
        if (!fixtures.length) return;
        const featured = fixtures[0];
        const remaining = fixtures.slice(1, 6);
        board.innerHTML = `<article class="fixture-feature"><div class="fixture-meta"><span>${escapeHtml(featured.sport.replaceAll("-", " ").toUpperCase())} FIXTURE</span><strong>${escapeHtml(formatDate(featured.date))}</strong></div><div class="fixture-teams"><span>DALE</span><b>VS</b><span>${escapeHtml(featured.opposition)}</span></div><p>${escapeHtml(featured.venue)} / ${escapeHtml(featured.team)}</p><a href="${escapeHtml(featured.link || "https://www.instagram.com/dalecollegeza/")}" target="_blank" rel="noopener" class="fixture-link">${escapeHtml(featured.status || "Fixture details")} <span>↗</span></a></article><div class="fixture-list">${remaining.map(fixture => `<div class="fixture-row"><span>${escapeHtml(fixture.sport.replaceAll("-", " ").toUpperCase())}</span><strong>${escapeHtml(fixture.opposition)}</strong><small>${escapeHtml(formatDate(fixture.date))}</small></div>`).join("")}</div>`;
    }

    window.DaleContent = { getContent, saveContent, sports, formatDate };

    document.addEventListener("DOMContentLoaded", () => {
        renderAnnouncement();
        renderPosts();
        renderSportFixtures();
        renderLandingFixtures();
    });
}());
