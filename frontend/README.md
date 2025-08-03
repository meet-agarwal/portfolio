# Portfolio Builder

A modern, responsive portfolio website builder with an intuitive editing interface.

## Features

- **Beautiful Portfolio Display**: Clean, modern design with responsive layout
- **Easy Editing**: User-friendly interface to edit portfolio content without touching JSON files
- **Admin Mode**: Secure editing with password protection
- **Create New Portfolios**: Simple form to create new portfolios
- **Manage Multiple Portfolios**: View and manage all portfolios from one place
- **Real-time Updates**: Changes are saved immediately and reflected on the website

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Start the Backend Server**:
   ```bash
   cd portfolio-server
   npm install
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend**:
   ```bash
   cd meetportfolio
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## How to Use

### Viewing Portfolios

- Visit `http://localhost:5173` to see the landing page
- Click on any portfolio to view it
- Or visit directly: `http://localhost:5173/portfolio-id`

### Creating a New Portfolio

1. Go to the landing page (`http://localhost:5173`)
2. Click "Create Your Portfolio"
3. Fill in:
   - Portfolio ID (URL slug, e.g., "john-doe")
   - Your Name
   - Your Role
4. Click "Create Portfolio"
5. You'll be redirected to your new portfolio

### Editing a Portfolio

1. **Enable Admin Mode**:
   - Click the "🔒 Enable Edit" button in the top-left corner
   - Enter password: `admin123` or `edit`
   - Or click 5 times on the top-left corner of the screen

2. **Edit Content**:
   - Click the "✏️ Edit Portfolio" button (appears when admin mode is enabled)
   - Use the form to edit all sections:
     - Header (name, role, description, skills, social links)
     - About (text and links)
     - Experience (job cards)
     - Projects (project cards)
     - Additional Section
     - Footer (text and links)

3. **Save Changes**:
   - Click "Save Portfolio" to save your changes
   - Changes are immediately reflected on the website

### Managing Portfolios

When in admin mode, you can:
- View all portfolios on the landing page
- Delete portfolios (click the 🗑️ icon)
- Create new portfolios
- Edit existing portfolios

## Portfolio Structure

Each portfolio is stored as a JSON file with the following structure:

```json
{
  "header": {
    "name": "Your Name",
    "role": "Your Role",
    "desc": "Your description",
    "skills": ["Skill 1", "Skill 2"],
    "icons": {
      "github": { "link": "url", "iconSrc": "faGithub" },
      "linkedin": { "link": "url", "iconSrc": "faLinkedin" }
    }
  },
  "about": {
    "txt": ["Paragraph 1", "Paragraph 2"],
    "link": { "Link Text": "url" }
  },
  "experience": {
    "cards": [
      {
        "dates": "Date Range",
        "role": "Job Title",
        "company": "Company Name",
        "companyLink": "url",
        "desc": "Job description",
        "tags": ["Tag1", "Tag2"]
      }
    ],
    "links": { "label": "Resume", "src": "url" }
  },
  "project": {
    "cards": [
      {
        "date": "Date",
        "Title": "Project Title",
        "projectLink": "url",
        "desc": "Project description",
        "tags": ["Tag1", "Tag2"],
        "img": "image-url"
      }
    ],
    "links": { "label": "View All", "src": "url" },
    "limit": 2
  },
  "section": {
    "cards": [],
    "links": { "label": "More", "src": "url" }
  },
  "footer": {
    "txt": ["Footer text"],
    "link": { "Link Text": "url" }
  }
}
```

## Security

- Admin mode requires a password (`admin123` or `edit`)
- Only enabled users can edit portfolios
- All changes are validated before saving

## Customization

- Modify the password in `AdminToggle.jsx`
- Add new sections by updating the `PortfolioEditor.jsx`
- Customize styling in the CSS files
- Add new portfolio templates in `CreatePortfolio.jsx`

## Troubleshooting

- **Portfolio not found**: Make sure the portfolio ID exists in the `portfolios` folder
- **Can't save changes**: Check that the backend server is running
- **Admin mode not working**: Try refreshing the page and entering the password again

## Contributing

Feel free to submit issues and enhancement requests!
