# YouTube Playlist Explorer

A modern React-based tool for exploring, analyzing, and managing YouTube playlists with a focus on usability and extensibility.

---

## Overview

**YouTube Playlist Explorer** enables users to:
- Fetch and display playlist details using the YouTube Data API
- Analyze playlist metrics and video statistics
- Export playlist data for further use
- Enjoy an intuitive UI built with the latest web technologies

---

## Demo

<!-- Replace with your live demo link if available -->
[Live Demo](https://yt-playlistmanager.netlify.app/)

---

## Features

- 🎵 **Explore Playlists:** Display titles, thumbnails, durations, and stats for all videos in a playlist
- 📊 **Analyze Data:** See totals for views, likes, and durations
- 🗂️ **Export Functionality:** Download playlist data as CSV or JSON
- ⚡ **Fast & Responsive:** Built with Vite, React 18, and Tailwind CSS
- 🔒 **Google OAuth:** Secure sign-in using Google for personalized features

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- YouTube Data API Key ([get one here](https://developers.google.com/youtube/v3/getting-started))

### Steps

```bash
git clone https://github.com/efe-ct/youtubeplaylistexplorer.git
cd youtubeplaylistexplorer
npm install
# or
yarn install
```

---

## Usage

1. **Set up your API key**

   Create a `.env` file in the project root:
   ```
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   ```

2. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Visit**

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Configuration

- **API Key:** Required for YouTube Data access, set via `.env`
- **OAuth:** Configure Google OAuth client via [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **UI Settings:** Tweak styles in `tailwind.config.js`

---

## Tech Stack

- **Frontend:** [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **HTTP:** [Axios](https://axios-http.com/)
- **Dates:** [date-fns](https://date-fns.org/)
- **Authentication:** [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)

Dependencies and devDependencies can be found in [`package.json`](https://github.com/efe-ct/youtubeplaylistexplorer/blob/main/package.json).

---

## Example API Usage

YouTube Data API Docs: [YouTube API v3](https://developers.google.com/youtube/v3/docs/)

Example call to list playlist items:
```http
GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=YOUR_PLAYLIST_ID&key=YOUR_API_KEY
```

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) if available.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

## Contact

- Repository: [efe-ct/youtubeplaylistexplorer](https://github.com/efe-ct/youtubeplaylistexplorer)
- Author: [@efe-ct](https://github.com/efe-ct)

---

> _If you find this project helpful, consider starring the repo!_

```
- [View package.json](https://github.com/efe-ct/youtubeplaylistexplorer/blob/main/package.json)
