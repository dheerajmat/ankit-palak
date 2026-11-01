export const coupleData = {
  groom: "Ankit",
  bride: "Palak",
  names: "Ankit & Palak",
  groomParents: "Son of Lt. Mrs. Rashmi & Mr. Pradeep Mathur",
  brideParents: "Daughter of Deepa Mathur & Rakesh Mathur",
  dateText: "20 November 2026",
  targetDate: "2026-11-20T00:00:00+05:30",
  location: "Ajmer, Rajasthan",
  hashtag: "#fromAMtoPM",
  monogram: "assets/ap-monogram.webp",
  heroImage: "assets/hero-palace.webp",
  dividerImage: "assets/gold-divider.webp",
  invitationQuote: "“Some moments become memories. Some memories become forever. We would be honoured to have you with us as our forever begins.”",
  subQuote: "With the blessings of our families, Ankit & Palak invite you to share in the joy of their wedding."
};

export const groomsFamilyData = [
  {
    id: "father",
    role: "FATHER OF THE GROOM",
    name: "PRADEEP MATHUR",
    image: "/assets/shubh-vivah/family/man.webp"
  },
  {
    id: "mother",
    role: "MOTHER OF THE GROOM",
    name: "LATE RASHMI MATHUR",
    image: "/assets/shubh-vivah/family/woman.webp"
  },
  {
    id: "brother",
    role: "BROTHER OF THE GROOM",
    name: "VARUN MATHUR",
    image: "/assets/shubh-vivah/family/man.webp"
  }
];

export const bridesFamilyData = [
  {
    id: "bride-father",
    role: "FATHER OF THE BRIDE",
    name: "RAKESH MATHUR",
    image: "/assets/shubh-vivah/family/man.webp"
  },
  {
    id: "bride-mother",
    role: "MOTHER OF THE BRIDE",
    name: "DEEPA MATHUR",
    image: "/assets/shubh-vivah/family/woman.webp"
  },
  {
    id: "bride-brother",
    role: "BROTHER OF THE BRIDE",
    name: "CHINMAY MATHUR",
    image: "/assets/shubh-vivah/family/man.webp"
  }
];

export const venueData = {
  bravia: {
    id: "bravia",
    name: "Bravia Hotel",
    role: "Pre-Wedding & Baraat Celebrations",
    address: "Panchsheel Nagar",
    city: "Ajmer, Rajasthan",
    dates: "19 & 20 November 2026",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    tagline: "Festive Pre-Wedding Mela & Royal Baraat Venue",
    ceremonies: [
      { name: "Ganesh Sthapana", date: "19 Nov", time: "8:30 AM onwards", icon: "🔱" },
      { name: "Mehendi Ceremony", date: "19 Nov", time: "11:00 AM onwards", icon: "🌿" },
      { name: "Haldi Hues (Tel Manda)", date: "20 Nov", time: "11:00 AM", icon: "✨" },
      { name: "Bhaat (Mayera)", date: "20 Nov", time: "2:00 PM", icon: "🎁" },
      { name: "Carnival Celebration", date: "20 Nov", time: "4:00 PM onwards", icon: "🎪" },
      { name: "Grand Baraat", date: "20 Nov", time: "7:00 PM onwards", icon: "🎺" }
    ]
  },
  grandXenia: {
    id: "grand-xenia",
    name: "Hotel Grand Xenia",
    role: "Sangeet, Reception & Sacred Phere",
    address: "Foy Sagar Road, Hathi Khera",
    city: "Ajmer, Rajasthan 305001",
    dates: "19 & 20 November 2026",
    mapUrl: "https://maps.google.com/?q=Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    mapQuery: "Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    tagline: "Grand Royal Palace Ambience & Sacred Matrimony",
    ceremonies: [
      { name: "Sagai (Engagement)", date: "19 Nov", time: "5:30 PM", icon: "💍" },
      { name: "Sangeet Sandhya", date: "19 Nov", time: "6:00 PM onwards", icon: "🪕" },
      { name: "Royal Dinner Banquet", date: "19 Nov", time: "8:30 PM onwards", icon: "🍽️" },
      { name: "Wedding Dinner & Reception", date: "20 Nov", time: "9:30 PM onwards", icon: "✨" },
      { name: "Seven Vows (Sacred Phere)", date: "20 Nov", time: "Midnight onwards", icon: "🔥" }
    ]
  },
  // Retained aliases for backward compatibility with DetailsScene
  primary: {
    name: "Hotel Grand Xenia",
    title: "Wedding Celebration Venue",
    address: "Foy Sagar Road, Hathi Khera",
    city: "Ajmer, Rajasthan 305001",
    date: "20 November 2026 · Evening celebration",
    mapQuery: "Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    mapUrl: "https://maps.google.com/?q=Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    features: []
  },
  secondary: {
    name: "Bravia Hotel",
    title: "Pre-Wedding & Baraat Venue",
    address: "Panchsheel Nagar",
    city: "Ajmer, Rajasthan",
    date: "19 & 20 November 2026",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    features: []
  }
};

export const eventsData = [
  {
    id: "ganesh-sthapana",
    name: "Ganesh Sthapana",
    day: "Thursday",
    date: "19 Nov 2026",
    dayGroup: "day1",
    time: "8:30 AM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "An auspicious beginning filled with blessings and traditional rituals.",
    image: "/assets/event-ganesh-sthapana.webp",
    dressCode: "Any Choice",
    icon: "ॐ"
  },
  {
    id: "mehendi",
    name: "Mehendi",
    day: "Thursday",
    date: "19 Nov 2026",
    dayGroup: "day1",
    time: "11:00 AM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "A little colour, laughter, music and fragrant henna art.",
    image: "/assets/event-mehendi.webp",
    dressCode: "Traditional",
    icon: "✿"
  },
  {
    id: "engagement",
    name: "Engagement",
    day: "Thursday",
    date: "19 Nov 2026",
    dayGroup: "day1",
    time: "5:30 PM onwards",
    venue: "Hotel Grand Xenia, Foy Sagar Road, Ajmer",
    mapQuery: "Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    desc: "Celebrating the promise of forever with rings, smiles, and heartfelt toasts.",
    image: "/assets/event-engagement.webp",
    dressCode: "Indo Western",
    icon: "💍"
  },
  {
    id: "sangeet",
    name: "Sangeet",
    day: "Thursday",
    date: "19 Nov 2026",
    dayGroup: "day1",
    time: "6:00 PM onwards",
    venue: "Hotel Grand Xenia, Foy Sagar Road, Ajmer",
    mapQuery: "Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    desc: "An unforgettable evening of dance performances, music, and togetherness.",
    image: "/assets/event-sangeet.webp",
    dressCode: "Indo Western",
    icon: "♪"
  },
  {
    id: "dinner-day1",
    name: "Celebratory Dinner",
    day: "Thursday",
    date: "19 Nov 2026",
    dayGroup: "day1",
    time: "9:00 PM onwards",
    venue: "Hotel Grand Xenia, Foy Sagar Road, Ajmer",
    mapQuery: "Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    desc: "A royal Rajasthani banquet with good food and beautiful company.",
    image: "/assets/event-wedding-dinner.webp",
    dressCode: "Indo Western",
    icon: "🍽️"
  },
  {
    id: "lagun",
    name: "Lagun",
    day: "Friday",
    date: "20 Nov 2026",
    dayGroup: "day2",
    time: "8:00 AM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "Beginning the wedding day with family blessings and sacred rituals.",
    image: "/assets/event-lagun.webp",
    dressCode: "Traditional",
    icon: "🪔"
  },
  {
    id: "haldi",
    name: "Tel Manda / Haldi",
    day: "Friday",
    date: "20 Nov 2026",
    dayGroup: "day2",
    time: "11:00 AM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "Traditions, fragrant turmeric paste, flower showers, and happy memories.",
    image: "/assets/event-haldi.webp",
    dressCode: "Traditional",
    icon: "🌼"
  },
  {
    id: "bhaat",
    name: "Bhaat",
    day: "Friday",
    date: "20 Nov 2026",
    dayGroup: "day2",
    time: "2:00 PM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "A cherished family ceremony celebrating maternal uncle's blessings.",
    image: "/assets/event-bhaat.webp",
    dressCode: "Kurta",
    icon: "🎁"
  },
  {
    id: "carnival",
    name: "Carnival",
    day: "Friday",
    date: "20 Nov 2026",
    dayGroup: "day2",
    time: "4:00 PM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "Fun games, live counters, laughter, and high-energy pre-wedding cheer.",
    image: "/assets/event-carnival.webp",
    dressCode: "Pastel Colour Traditional",
    icon: "🎪"
  },
  {
    id: "baraat",
    name: "Baraat",
    day: "Friday",
    date: "20 Nov 2026",
    dayGroup: "day2",
    time: "7:00 PM onwards",
    venue: "Bravia Hotel, Panchsheel Nagar, Ajmer",
    mapQuery: "Bravia+Hotel+Panchsheel+Nagar+Ajmer",
    mapUrl: "https://maps.app.goo.gl/jwVDGoxKc6mFUmZp6",
    desc: "Join the grand royal procession as we dance towards forever.",
    image: "/assets/event-baraat.webp",
    dressCode: "Grand Ethnic",
    icon: "🎺"
  },
  {
    id: "wedding-dinner",
    name: "Wedding Dinner & Reception",
    day: "Friday",
    date: "20 Nov 2026",
    dayGroup: "day2",
    time: "9:30 PM onwards",
    venue: "Hotel Grand Xenia, Foy Sagar Road, Ajmer",
    mapQuery: "Hotel+Grand+Xenia+Foy+Sagar+Road+Hathi+Khera+Ajmer+Rajasthan",
    desc: "Celebrate the newlyweds under the starry sky with sumptuous dining and celebrations.",
    image: "/assets/event-wedding-dinner.webp",
    dressCode: "Grand Ethnic",
    icon: "✨"
  }
];

export const galleryData = [
  {
    id: 1,
    title: "Blush Blooms",
    desc: "Delicate pastel florals crafted with love",
    image: "/assets/floral-blooms.webp"
  },
  {
    id: 2,
    title: "With Blessings",
    desc: "Ceremonial elegance and sacred traditions",
    image: "/assets/event-ganesh-sthapana.webp"
  },
  {
    id: 3,
    title: "Golden Lights",
    desc: "Warmly lit palace celebration spaces",
    image: "/assets/venue-banquet.webp"
  },
  {
    id: 4,
    title: "Sealed With Love",
    desc: "Royal wax seal and handcrafted invitation",
    image: "/assets/envelope-reference.webp"
  },
  {
    id: 5,
    title: "Soft Botanical Details",
    desc: "Artisanal decor aesthetics and pastel palettes",
    image: "/assets/decor-board.webp"
  },
  {
    id: 6,
    title: "Forever Begins",
    desc: "Romantic outdoor lawns under the Ajmer stars",
    image: "/assets/venue-outdoor-lawn.webp"
  }
];

export const shubhVivahGalleryData = [
  {
    id: 1,
    title: "Sunset Mandap",
    desc: "Auspicious marigold floral mandap glowing at sunset",
    image: "/assets/shubh-vivah/gallery/mandap.jpg"
  },
  {
    id: 2,
    title: "Palace Jharokha",
    desc: "Intricately carved sandstone balconies and arches",
    image: "/assets/shubh-vivah/gallery/jharokha.jpg"
  },
  {
    id: 3,
    title: "Temple Courtyard",
    desc: "Sacred courtyard illuminated by brass samai lamps",
    image: "/assets/shubh-vivah/gallery/courtyard.jpg"
  },
  {
    id: 4,
    title: "Haldi Traditions",
    desc: "Fragrant turmeric, flower showers and festive cheer",
    image: "/assets/shubh-vivah/gallery/haldi.jpg"
  },
  {
    id: 5,
    title: "Lake Palace Serenade",
    desc: "Tranquil reflections under the Rajasthani sky",
    image: "/assets/shubh-vivah/gallery/lake.jpg"
  },
  {
    id: 6,
    title: "The Grand Gateway",
    desc: "Ancient carved mandir archway welcoming loved ones",
    image: "/assets/shubh-vivah/gallery/gate.jpg"
  }
];
