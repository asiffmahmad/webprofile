# Professional Web Profile - Full Stack Developer

A premium, modern, and high-performance web profile built for developers to showcase their expertise, projects, and professional brand. Designed with a clean SaaS-style aesthetic, this profile is optimized for sharing on LinkedIn and with potential clients.

## 🚀 Features

- **Premium UI/UX**: Modern design with glassmorphism, 3D terminal visuals, and custom typography.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Scroll Reveal Animations**: Smooth entry animations for sections and project cards using Intersection Observer.
- **Tech-Centric Aesthetic**: Integrated developer status badges and syntax-highlighted code visuals.
- **Modular Data**: All content is managed via a single `src/data.js` file for easy updates.

## 🛠 Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Variable System)
- **Deployment**: Optimized for Vercel, Netlify, or GitHub Pages

## 📦 Installation & Local Development

Follow these steps to get the project running on your local machine:

1. **Clone the repository** (if you've already pushed it) or navigate to the project folder:
   ```bash
   cd WebProfile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📤 How to Create a New Repo & Push to Git

If you want to host this on GitHub, follow these steps:

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit: Professional Web Profile setup"
   ```

4. **Create a new repository on GitHub**:
   - Go to [GitHub](https://github.com/new).
   - Give it a name (e.g., `web-profile`).
   - Click **Create repository**.

5. **Connect and Push**:
   Copy the commands from GitHub and run them in your terminal (replace `YOUR_USERNAME` and `REPO_NAME`):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## 📝 Customization

To update your profile details, open `src/data.js` and modify the `profileData` object. You can change your name, role, projects, skills, and contact information without touching any CSS or component logic.

---
Built with ❤️ by Asiff
