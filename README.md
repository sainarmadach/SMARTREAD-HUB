# SmartRead Hub

SmartRead Hub is an AI-powered content summarization tool that transforms lengthy documents, web pages, or text into concise summaries. The tool features a modern React frontend built with Vite, a robust FastAPI backend, and a handy browser extension for summarizing visible web content. SmartRead Hub is designed to help users save time, boost productivity, and gain insights from complex content quickly.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React + Vite)](#frontend-react)
  - [Browser Extension](#browser-extension)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Multiple Input Options:** Summarize content from PDFs, pasted text, or URLs.
- **Visible Content Summarization:** Use the browser extension to summarize any webpage with a single click.
- **Summary History:** Automatically saves past summaries with options to reuse or delete them.
- **Dark/Light Mode:** A modern, responsive UI with a dark mode as the default.
- **Smooth Animations & Modern Design:** Enjoy a sleek and animated interface powered by framer-motion.
- **Asynchronous Processing:** Optimized backend that uses asynchronous chunk processing for faster summarization.
- **Keyword Extraction:** Automatically extract key points from input content.

## Project Structure

```
SmartRead-Hub/
├── client/
├── server/
├── summarizer-extension/
├── README.md
└── .gitignore
```

## ✅ Prerequisites

## Backend Requirements:

Python 3.10+ (3.8+ minimum)

pip for package management

## Frontend Requirements:

Node.js v16+

npm (comes with Node.js)

React + TypeScript + Vite setup

## Browser Extension Requirements:

A modern Chromium-based browser like Google Chrome or Microsoft Edge

Enable “Developer Mode” to load the unpacked extension

## Installation

### Backend (FastAPI)

```bash
cd SmartRead-Hub/server
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate for macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React + Vite)

```bash
cd ../client
npm install
npm run dev
```

### Browser Extension

- Go to `chrome://extensions`
- Enable "Developer mode"
- Click "Load unpacked" and select the `summarizer-extension` folder

## Running the Project

- Backend: `uvicorn app.main:app --reload`
- Frontend: `npm run dev`
- Extension: Load as unpacked in Chrome

## Usage

- **Landing Page:** Intro page with "Get Started" button
- **Upload Page:** Upload PDFs, paste text, or input URLs
- **Summary Page:** Displays summary and extracted keywords
- **History Page:** View, reuse, or delete past summaries
- **Extension:** Summarize current visible webpage content

## Future Features

- Multi-language support
- Chapter-wise summaries
- User authentication & cloud history
- Export to Notion, Google Docs, etc.

## Contributing

```bash
git checkout -b feature/your-feature
git commit -am 'Add feature'
git push origin feature/your-feature
```

Then, open a pull request.

## License

This project is licensed under the MIT License.
