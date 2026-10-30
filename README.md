# 🌸 Ankit & Palak — Wedding Invitation Website (React + Vite)

A royal, romantic pastel wedding invitation website built with **React 18** and **Vite**, featuring interactive 3D envelope unsealing, ambient canvas animations, live countdown, itinerary celebrations, venue showcase, gallery lightbox, calendar `.ics` reminders, and RSVP system.

---

## ✨ Features & Architecture

- **💌 Interactive 3D Envelope**:
  - Realistic 3D perspective fold with flap rotation, dori cords with tassels, and wax seal.
  - Interactive click or button tap to untie the dori, pop the seal, and launch celebratory pastel confetti (`canvas-confetti`).
  - Smooth animated transition scrolling down to the sacred blessings.
- **✨ Auspicious Blessings (ॐ श्री गणेशाय नमः)**:
  - Royal Rajasthani arch frame, Sanskrit shloka, and blessings for the newlyweds.
- **💑 Couple & Invitation Cards**:
  - Bespoke typography using *Allura* script, *Cormorant Garamond*, and *Noto Serif Devanagari*.
  - Gold divider ornamental accents and floating floral elements.
- **⏳ Save The Date & Live Countdown**:
  - Live real-time countdown to **20 November 2026 (Asia/Kolkata timezone)** with Days, Hours, Minutes, and Seconds.
  - One-click `.ics` calendar file download for Apple Calendar / Outlook.
  - Direct one-click Google Calendar event generation.
  - Direct Google Maps directions link for Hotel Grand Xenia.
- **📅 The Celebrations (11 Ceremonies)**:
  - Comprehensive wedding schedule covering Thursday 19 Nov and Friday 20 Nov.
  - Filter tabs: **All Events (11)**, **Thursday · 19 Nov (5)**, and **Friday · 20 Nov (6)**.
  - Interactive ceremony cards with custom illustrations.
  - Clicking any ceremony opens the **Event Details Modal** with timing, dress code, venue location, directions, and ceremony-specific calendar export.
- **🏛️ Venue Showcase**:
  - **Hotel Grand Xenia** (Primary Wedding Venue): Foy Sagar Road, Ajmer.
  - **Bravia Hotel** (Pre-wedding Celebrations): Panchsheel Nagar, Ajmer.
  - Address details, highlighted venue features, and Google Maps integration.
- **📸 Moments & Details (Gallery)**:
  - 6 photo tiles with hover zoom elevation and custom captions.
  - Fullscreen **Lightbox Modal** with previous/next keyboard navigation and image preview.
- **💌 Interactive RSVP Form**:
  - Guest Name, Attendance ("Joyfully accepts" / "Regretfully declines"), Guest Count, and Personal Wishes for the couple.
  - Confetti celebration upon accepting.
  - Persistent state saved to `localStorage` with an edit option.
- **🎵 Romantic Synthesized Ambient Music**:
  - Built-in Web Audio API romantic bell synthesizer playing the exact melodic sequence in real-time.
  - Interactive play/pause toggle with animated sound frequency bars in the topbar.
- **🌸 Ambient Particles & Drifting Petals**:
  - High-performance HTML5 Canvas ambient fairy lights and falling rose petal physics.
  - 16 CSS floating petals with varied trajectories, respecting `prefers-reduced-motion`.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
Ankit_Palak_Wedding_Website_Package/
├── index.html                   # Vite HTML entry point with Google Fonts
├── index.vanilla.html           # Original static HTML backup
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration (port 3000, relative base)
├── public/
│   └── assets/                  # Public webp image assets served by Vite
├── assets/                      # Original root assets
└── src/
    ├── main.jsx                 # React root render
    ├── App.jsx                  # Main coordinator component & section observer
    ├── index.css                # Royal pastel color variables, arch, envelope & animations
    ├── data/
    │   └── weddingData.js       # Centralized couple data, 11 ceremonies, venues, gallery
    ├── utils/
    │   ├── audio.js             # Web Audio API ambient melodic synthesizer
    │   └── calendar.js          # .ics calendar invite downloader & Google Cal helper
    └── components/
        ├── Topbar.jsx           # Monogram pill, progress indicator & music toggle
        ├── NavDots.jsx          # Floating side navigation dots
        ├── AmbientBackground.jsx# Canvas fairy-lights & drifting petal system
        ├── EnvelopeScene.jsx    # 3D interactive envelope with dori, seal & confetti
        ├── GaneshaScene.jsx     # Sacred Ganesh Sthapana & shloka
        ├── InviteScene.jsx      # Together with our families invitation card
        ├── CoupleScene.jsx      # Ankit & Palak typography card
        ├── DetailsScene.jsx     # 20 Nov 2026, live countdown & calendar links
        ├── CelebrationsSection.jsx # 11 wedding ceremonies with day filter tabs
        ├── OurStorySection.jsx  # Together forever quotes & family welcome
        ├── VenueSection.jsx     # Hotel Grand Xenia & Bravia Hotel cards & maps
        ├── GallerySection.jsx   # Photo grid with modal zoom
        ├── RsvpSection.jsx      # Interactive RSVP form with localStorage persistence
        ├── FinaleScene.jsx      # Final blessings, "आप सादर आमंत्रित हैं" & replay button
        ├── EventModal.jsx       # Ceremony popup with details & individual calendar export
        └── LightboxModal.jsx    # Fullscreen gallery image viewer
```

---

## 🎨 Color Palette & Design System

- **Blush**: `#f7e4e5`
- **Ivory**: `#fffaf5`
- **Rose**: `#a64f61`
- **Rose Accent**: `#c67d89`
- **Gold**: `#c6a16b`
- **Sage**: `#a7b6a2`
- **Ink**: `#62494a`
- **Fonts**: *Cormorant Garamond* (Serif), *Allura* (Royal Calligraphy), *Noto Serif Devanagari* (Sanskrit).

