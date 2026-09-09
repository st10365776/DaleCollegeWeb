(function () {
    const AUTH_KEY = "daleCollegeAdminSession";
    const ADMIN_USER = "admin";
    const ADMIN_PASSWORD = "DaleCollege2026!";

    const getSession = () => {
        try {
            return JSON.parse(localStorage.getItem(AUTH_KEY)) || { loggedIn: false, username: "" };
        } catch (error) {
            return { loggedIn: false, username: "" };
        }
    };

    const saveSession = (session) => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    };

    const isLoggedIn = () => {
        const session = getSession();
        return session.loggedIn === true && session.username === ADMIN_USER;
    };

    const login = (username, password) => {
        const normalisedUser = String(username || "").trim();
        const normalisedPassword = String(password || "").trim();

        if (normalisedUser !== ADMIN_USER || normalisedPassword !== ADMIN_PASSWORD) {
            return { success: false, message: "Incorrect username or password." };
        }

        const session = { loggedIn: true, username: ADMIN_USER };
        saveSession(session);
        return { success: true, message: "Login successful." };
    };

    const logout = () => {
        saveSession({ loggedIn: false, username: "" });
        window.location.href = "login.html";
    };

    document.addEventListener("DOMContentLoaded", () => {
        const pagePath = window.location.pathname.split("/").pop();

        if (pagePath === "login.html") {
            if (isLoggedIn()) {
                window.location.href = "index.html";
                return;
            }

            const form = document.getElementById("admin-login-form");
            const status = document.getElementById("login-status");

            if (form) {
                form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const formData = new FormData(form);
                    const result = login(formData.get("username"), formData.get("password"));

                    if (status) {
                        status.textContent = result.message;
                        status.classList.toggle("error", !result.success);
                    }

                    if (result.success) {
                        window.location.href = "landing.html";
                    }
                });
            }

            return;
        }

        if (!isLoggedIn()) {
            window.location.href = "login.html";
            return;
        }

        if (pagePath === "landing.html") {
            window.location.href = "index.html";
            return;
        }

        const userNode = document.getElementById("admin-current-user");
        if (userNode) {
            userNode.textContent = "Signed in as admin";
        }

        const logoutButton = document.querySelector("[data-admin-logout]");
        if (logoutButton) {
            logoutButton.addEventListener("click", (event) => {
                event.preventDefault();
                logout();
            });
        }
    });

    window.daleCollegeAdminAuth = {
        ADMIN_USER,
        ADMIN_PASSWORD,
        getSession,
        saveSession,
        isLoggedIn,
        login,
        logout
    };
})();
