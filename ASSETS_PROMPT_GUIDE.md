# 🎨 Shubh Vivah — Custom Asset Guide & AI Generation Prompts

This guide outlines every asset used by the **Shubh Vivah (Temple Mandap & 3D Gate)** theme.
All assets are currently pre-loaded and working in `public/assets/shubh-vivah/`.

If you wish to create and replace any asset with your own custom images (using **Midjourney, DALL-E 3, Flux, or Photoshop**), follow the specifications and prompts below.

---

## 🏛️ 1. Temple Gate & 3D Swinging Doors (Opening Animation)

The opening gate consists of an **outer frame** and **two door leaves** (left and right) that swing open with 3D perspective physics:

### A. Landscape Gate (Desktop View — 1920×1280 or 3:2 aspect ratio)
- **Folder Location**: `public/assets/shubh-vivah/gate/`
- **Files**:
  - `landscape.webp`: The stone temple facade with a center door archway opening.
  - `landscape-left.webp`: The left carved wooden door panel (transparent background around edges).
  - `landscape-right.webp`: The right carved wooden door panel.
  - `landscape-opening.png`: Mask cutout for the opening.

#### 🤖 AI Generation Prompt for Gate Facade:
> **Prompt**: `Ancient carved Indian temple entrance archway, ornate sandstone architectural relief carving, traditional Hindu temple stone facade at dusk, deep royal crimson and warm antique gold ambient lighting, center opening with dark sanctum inside, majestic Rajasthani and Maharashtrian temple gate architecture, 8k resolution, cinematic lighting, photorealistic --ar 3:2`

#### 🤖 AI Generation Prompt for Left & Right Carved Doors:
> **Prompt**: `Ornate ancient Indian teakwood temple door panel, intricately carved elephant and floral motifs, antique brass studs and handle, traditional Indian mandir door texture, isolated on transparent background, straight frontal perspective, photorealistic craftsmanship --ar 1:3`

---

### B. Portrait Gate (Mobile View — 1024×1536 or 2:3 aspect ratio)
- **Folder Location**: `public/assets/shubh-vivah/gate/`
- **Files**:
  - `portrait.webp`: Vertical mobile temple entrance.
  - `portrait-left.webp`: Left door panel for mobile.
  - `portrait-right.webp`: Right door panel for mobile.

#### 🤖 AI Generation Prompt:
> **Prompt**: `Vertical mobile wallpaper perspective of a grand Indian temple gateway, carved stone pillars, hanging marigold garlands, dusk sky, center entrance archway with wooden doors, rich Indian royal aesthetic, 8k resolution --ar 2:3`

---

## 🌅 2. Sunset Marigold Mandap (Main Hero Background)

- **Folder Location**: `public/assets/shubh-vivah/hero/`
- **Files**:
  - `mandap-desktop-v2.webp`: Desktop hero background (1920×1080)
  - `mandap-mobile-v2.webp`: Mobile hero background (1080×1920)

#### 🤖 AI Generation Prompt:
> **Prompt**: `Ultra-luxurious Indian wedding mandap at golden hour sunset, draped in thousands of fresh orange and yellow marigold flower garlands, glowing brass samai oil lamps with gentle flickering flames, royal temple courtyard backdrop, golden bokeh fairy lights, auspicious festive traditional Indian wedding ambience, cinematic warmth, 8k photorealistic --ar 16:9`

*(For mobile, use the same prompt with `--ar 9:16`)*

---

## 🪔 3. Samai Brass Lamps & Date Banner

- **Folder Location**: `public/assets/shubh-vivah/banner/`
- **Files**:
  - `plaque-v2.webp`: Auspicious wooden/brass date plaque.
  - `left.webp`: Traditional tall brass *samai* oil lamp with five burning wicks (left side).
  - `right.webp`: Traditional tall brass *samai* oil lamp (right side).

#### 🤖 AI Generation Prompt for Samai Lamps:
> **Prompt**: `Traditional tall south Indian brass samai oil lamp with diya flames burning gently, ornate peacocks carved on top, isolated on transparent PNG background, warm golden metal texture, festive temple lamp --ar 1:4`

#### 🤖 AI Generation Prompt for Date Plaque:
> **Prompt**: `Royal Indian antique brass and teakwood invitation plaque, ornate filigree border with subtle gold leaf engraving, blank center for text, isolated on transparent background, high-end craftsmanship --ar 3:1`

---

## 👑 4. Couple Royal Gilded Frames

- **Folder Location**: `public/assets/shubh-vivah/couple/`
- **Files**:
  - `groom-frame.webp`: Ornate golden portrait frame for the groom.
  - `bride-frame.webp`: Matching ornate golden portrait frame for the bride.

#### 🤖 AI Generation Prompt:
> **Prompt**: `Elaborate antique Indian gold foil jharokha picture frame, royal peacock and floral crest, ornate traditional Rajasthani gold filigree, transparent oval cutout in the center for portrait photograph, isolated on transparent PNG background --ar 3:4`

> 💡 **Tip**: You can place actual portrait photos of **Ankit** and **Palak** directly behind these frames!

---

## 🔔 5. Hanging Temple Bells (Family Shrine)

- **Folder Location**: `public/assets/shubh-vivah/family/`
- **Files**:
  - `bell.webp`: Traditional Indian brass temple bell (*ghanti*) with hanging chain.
  - `frame.webp`: Small decorative family shrine arch.
  - `man.webp` & `woman.webp`: Family blessing avatar icons.

#### 🤖 AI Generation Prompt:
> **Prompt**: `Traditional Indian temple brass bell ghanti hanging from an ornate brass link chain, antique polished golden brass, isolated on transparent background, clean edges --ar 1:3`

---

## 📜 6. Suspended Ceremony Boards (Itinerary Timeline)

- **Folder Location**: `public/assets/shubh-vivah/events/sign/`
- **Files**:
  - `frame.webp`: Hanging wooden plaque frame with decorative chains.
  - `date.webp`, `time.webp`, `venue.webp`, `dress.webp`: Small ornamental icons/badges.

#### 🤖 AI Generation Prompt:
> **Prompt**: `Traditional Indian festive hanging wooden sign board, gold metal corners, suspended by marigold flower strings and brass hooks, parchment paper texture inside, blank center for event details, isolated on transparent background --ar 4:3`

---

## 📁 Summary of File Structure

```
public/assets/shubh-vivah/
├── paper-texture.svg
├── gate/
│   ├── landscape.webp
│   ├── landscape-left.webp
│   ├── landscape-right.webp
│   ├── landscape-opening.png
│   ├── portrait.webp
│   ├── portrait-left.webp
│   └── portrait-right.webp
├── hero/
│   ├── mandap-desktop-v2.webp
│   └── mandap-mobile-v2.webp
├── banner/
│   ├── plaque-v2.webp
│   ├── left.webp
│   └── right.webp
├── couple/
│   ├── groom-frame.webp
│   └── bride-frame.webp
├── family/
│   ├── bell.webp
│   ├── frame.webp
│   ├── man.webp
│   └── woman.webp
├── events/
│   └── sign/
│       ├── frame.webp
│       ├── date.webp
│       ├── time.webp
│       ├── venue.webp
│       └── dress.webp
└── countdown/
    └── banner.webp
```

Whenever you want to replace an image, simply export your new image in **WebP or PNG** format, name it identically to the filename above, and replace it in the corresponding folder!

