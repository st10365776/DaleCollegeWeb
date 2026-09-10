# Dale College Website

A static website for Dale College Boys' High School, presenting the school's history, academics, sport, admissions, contact information, and administration pages.

## Getting Started

This project does not require a build step or package installation.

### Preview locally

From the project directory, start any local static file server. For example, with Python:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

Opening `index.html` directly may work, but a local server is recommended so shared HTML fragments and browser asset loading behave consistently.

## Site Areas

### Public pages

- `index.html` - Home page
- `about.html` - About the college
- `academics.html` - Academic information
- `sport.html` - Sport overview
- `admissions.html` - Admissions information
- `contact.html` - Contact information
- `sports/` - Individual sport pages, including athletics, chess, choir, cricket, cross-country, debating, hockey, and rugby

### Admin pages

The `admin/` directory contains the administration interface pages for content areas such as academics, admissions, gallery, news, sport, settings, and overview. Authentication-related behavior is handled by `js/admin-auth.js`.

## Project Structure

```text
.
├── *.html              Public pages and shared fragments
├── admin/              Administration interface pages
├── assets/             Images, media, and videos
├── sports/             Individual sport detail pages
├── css/                Stylesheets, responsive rules, and animations
└── js/                 Navigation, layout, animation, content, and admin scripts
```

## Main Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: DM Sans and Oswald

## Development Notes

- Keep paths relative so the site can be hosted as a static website.
- Shared header and footer fragments are stored in `header.html` and `footer.html`; sport pages have their own shared fragments in `sports/`.
- Place static media in `assets/` and keep page-specific styling in the existing CSS files where practical.
