document.addEventListener("DOMContentLoaded", () => {
    const statusNode = document.getElementById("save-status");
    const announcementForm = document.getElementById("announcement-form");
    const postForm = document.getElementById("post-form");
    const fixtureForm = document.getElementById("fixture-form");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    const getContent = () => {
        try {
            return JSON.parse(localStorage.getItem("daleCollegeContent")) || { announcements: [], posts: [], fixtures: {} };
        } catch (error) {
            return { announcements: [], posts: [], fixtures: {} };
        }
    };

    const saveContent = (content) => {
        localStorage.setItem("daleCollegeContent", JSON.stringify(content));
        if (statusNode) {
            statusNode.textContent = "Saved locally in this browser.";
        }
        updateOverviewSummary();
    };

    const updateOverviewSummary = () => {
        const content = getContent();
        const announcements = content.announcements || [];
        const posts = content.posts || [];
        const fixtures = Object.values(content.fixtures || {}).reduce((total, entries) => total + (entries || []).length, 0);

        const announcementsNode = document.getElementById("summary-announcements");
        const postsNode = document.getElementById("summary-posts");
        const fixturesNode = document.getElementById("summary-fixtures");

        if (announcementsNode) announcementsNode.textContent = announcements.length;
        if (postsNode) postsNode.textContent = posts.length;
        if (fixturesNode) fixturesNode.textContent = fixtures;
    };

    const renderAnnouncementList = () => {
        const list = document.getElementById("announcement-list");
        if (!list) return;
        const content = getContent();
        list.innerHTML = (content.announcements || []).length
            ? (content.announcements || []).map((item, index) => `
                <div class="saved-item">
                    <div>
                        <strong>${escapeHtml(item.title)}</strong>
                        <span>${escapeHtml(item.body)}</span>
                    </div>
                    <button type="button" data-remove="announcement" data-index="${index}">Remove</button>
                </div>
            `).join("")
            : '<div class="saved-item"><div><strong>No announcements yet.</strong><span>Add a general update to appear above the site.</span></div></div>';
    };

    const renderPostList = () => {
        const list = document.getElementById("post-list");
        if (!list) return;
        const content = getContent();
        list.innerHTML = (content.posts || []).length
            ? (content.posts || []).map((item, index) => `
                <div class="saved-item">
                    <div>
                        <strong>${escapeHtml(item.title)}</strong>
                        <small>${escapeHtml(item.sport || "General")} / ${escapeHtml(item.body)}</small>
                    </div>
                    <button type="button" data-remove="post" data-index="${index}">Remove</button>
                </div>
            `).join("")
            : '<div class="saved-item"><div><strong>No posts yet.</strong><span>Save a school update or match recap here.</span></div></div>';
    };

    const renderFixtureList = () => {
        const list = document.getElementById("fixture-list");
        if (!list) return;
        const content = getContent();
        const fixtureEntries = Object.entries(content.fixtures || {}).flatMap(([sport, fixtures]) => 
            (fixtures || []).map((fixture, index) => ({ sport, fixture, index }))
        );

        list.innerHTML = fixtureEntries.length
            ? fixtureEntries.map(({ sport, fixture, index }) => `
                <div class="saved-item">
                    <div>
                        <strong>${escapeHtml(sport.toUpperCase())} / ${escapeHtml(fixture.opposition)}</strong>
                        <small>${escapeHtml(fixture.date)} / ${escapeHtml(fixture.venue)} / ${escapeHtml(fixture.team)}</small>
                    </div>
                    <button type="button" data-remove="fixture" data-sport="${sport}" data-index="${index}">Remove</button>
                </div>
            `).join("")
            : '<div class="saved-item"><div><strong>No fixtures yet.</strong><span>Add a sport match or event to populate the board.</span></div></div>';
    };

    const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.tab;
            tabButtons.forEach((tab) => {
                const isActive = tab === button;
                tab.classList.toggle("active", isActive);
                tab.setAttribute("aria-selected", String(isActive));
            });

            tabPanels.forEach((panel) => {
                const isActive = panel.id === target;
                panel.classList.toggle("active", isActive);
                panel.setAttribute("aria-hidden", String(!isActive));
            });
        });
    });

    tabButtons.forEach((button) => {
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(button.classList.contains("active")));
    });

    tabPanels.forEach((panel) => {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-hidden", String(!panel.classList.contains("active")));
    });

    announcementForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(announcementForm);
        const content = getContent();
        content.announcements = [...(content.announcements || []), {
            title: formData.get("title").trim(),
            body: formData.get("body").trim(),
            published: true
        }];
        saveContent(content);
        announcementForm.reset();
        renderAnnouncementList();
    });

    postForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(postForm);
        const content = getContent();
        content.posts = [...(content.posts || []), {
            title: formData.get("title").trim(),
            sport: formData.get("sport"),
            body: formData.get("body").trim()
        }];
        saveContent(content);
        postForm.reset();
        renderPostList();
    });

    fixtureForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(fixtureForm);
        const sport = formData.get("sport");
        const content = getContent();
        const payload = {
            date: formData.get("date"),
            opposition: formData.get("opposition").trim(),
            venue: formData.get("venue").trim(),
            team: formData.get("team").trim(),
            link: formData.get("link").trim() || "https://www.instagram.com/dalecollegeza/",
            status: formData.get("status").trim() || "Details"
        };
        content.fixtures = content.fixtures || {};
        content.fixtures[sport] = [...(content.fixtures[sport] || []), payload];
        saveContent(content);
        fixtureForm.reset();
        renderFixtureList();
    });

    document.addEventListener("click", (event) => {
        const target = event.target.closest("[data-remove]");
        if (!target) return;

        const content = getContent();
        const type = target.dataset.remove;
        const index = Number(target.dataset.index);

        if (type === "announcement") {
            content.announcements.splice(index, 1);
        }

        if (type === "post") {
            content.posts.splice(index, 1);
        }

        if (type === "fixture") {
            const sport = target.dataset.sport;
            if (content.fixtures && content.fixtures[sport]) {
                content.fixtures[sport].splice(index, 1);
            }
        }

        saveContent(content);
        renderAnnouncementList();
        renderPostList();
        renderFixtureList();
    });

    renderAnnouncementList();
    renderPostList();
    renderFixtureList();
    updateOverviewSummary();
});
