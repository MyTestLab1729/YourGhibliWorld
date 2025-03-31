# Ghibli Photo Studio 🌟

A beautiful, interactive photo gallery website inspired by Studio Ghibli's magical worlds. Create your own Ghibli-themed portfolio to showcase your AI-generated Ghibli-style artwork.

## ✨ Features

- 🎨 Multiple Ghibli-inspired themes (Totoro, Spirited Away, Princess Mononoke, Howl's Moving Castle)
- 🌓 Light and dark theme variants
- 🖼️ Beautiful photo gallery with lightbox view
- 📱 Fully responsive design
- 🎭 Customizable character profile
- 🌟 Smooth animations and transitions
- 🔄 Dynamic theme switching
- 📸 GitHub repository integration for media storage

## 🚀 Getting Started

### Prerequisites
- A GitHub account
- Basic knowledge of HTML/CSS/JavaScript
- Your AI-generated Ghibli-style artwork

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ghibli-photo-studio.git
   cd ghibli-photo-studio
   ```

2. **Configure GitHub Repository**
   - Create a new GitHub repository for your media files
   - Update the GitHub configuration in `script.js`:
   ```javascript
   const GITHUB_REPO = 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME';
   const GITHUB_BRANCH = 'main'; // or 'master' depending on your default branch
   ```

3. **Add Your Media**
   - Upload your AI-generated Ghibli artwork to your GitHub repository
   - Supported formats: JPG, JPEG, PNG, GIF, WEBP
   - Images will be automatically loaded into the gallery

4. **Customize Your Profile**
   - Add your character image as `character-image.jpg` in the `Home-Media` folder
   - Update the character description in `script.js` or create a text file in `Home-txts/character-description.txt`
   - Add portfolio images to the `Home-Media` folder

5. **Launch the Website**
   - Open `index.html` in your web browser
   - Or deploy to a web hosting service

## 🎨 Customization Guide

### Adding New Themes
1. Add your theme to the `themes` array in `script.js`:
   ```javascript
   const themes = [
       { name: 'your-theme', label: 'Your Theme Name' },
       // ... existing themes
   ];
   ```

2. Add corresponding CSS variables in `styles.css`:
   ```css
   [data-theme="your-theme"] {
       --primary-color: #your-color;
       --secondary-color: #your-color;
       --accent-color: #your-color;
       --text-color: #your-color;
       --bg-color: #your-color;
       --card-bg: #your-color;
       --shadow-color: rgba(0,0,0,0.1);
       --gradient-start: #your-color;
       --gradient-end: #your-color;
   }
   ```

### Customizing the Layout
- Modify the grid layout in `styles.css`
- Adjust animations and transitions
- Customize the lightbox behavior

## 📱 File Structure

```
ghibli-photo-studio/
├── index.html              # Home page
├── gallery.html           # Gallery page
├── styles.css             # Styles and themes
├── script.js              # Main functionality
├── Home-Media/           # Local media for home page
│   ├── character-image.jpg
│   └── portfolio*.jpg
├── Home-txts/            # Text content
│   └── character-description.txt
└── Media/                # Local fallback images
    └── gallery*.jpg
```

## 🎯 Best Practices

1. **Image Optimization**
   - Optimize your images before uploading
   - Use appropriate image formats (WEBP for better performance)
   - Maintain consistent aspect ratios

2. **Theme Colors**
   - Use Ghibli-inspired color palettes
   - Ensure good contrast for readability
   - Test both light and dark variants

3. **Content Organization**
   - Keep your GitHub repository organized
   - Use meaningful file names
   - Update descriptions and alt text

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Studio Ghibli's magical worlds
- Built with pure HTML, CSS, and JavaScript
- Uses Font Awesome for icons
- GitHub API for media storage

## 🌟 Support

If you find this project helpful, please consider:
- Starring the repository
- Sharing with other Ghibli fans
- Contributing improvements

---

Made with ❤️ for the Ghibli community 