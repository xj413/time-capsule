import { CultureCapsule } from '../models/cultureCapsule';

export const cultureCapsules: CultureCapsule[] = [
  {
    id: "tokyo-japan",
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    timelinePeriod: "Ancient to Modern (8th Century - Present)",
    capsuleColor: "#FF6B9D",
    perspectives: [
      {
        role: "General History",
        summary: "Tokyo, originally Edo, transformed from a 12th century fishing village into the political center of Japan by 1603 under the Tokugawa shogunate. Rebuilt fiercely after the 1923 earthquake and WWII, it stands today as a modern, sprawling hyper-metropolis.",
      },
      {
        role: "Elder",
        summary: "Before the skyscrapers, we saw Mt. Fuji almost every clear morning. The rhythm of the city was slower, deeply tied to the local merchants and the cycles of the neighborhood temples.",
      },
      {
        role: "First-time Visitor",
        summary: "An overwhelming ocean of neon, impeccable public transit, and staggering politeness. The contrast between high-speed bullet trains and quiet, incense-filled shrines tucked away in alleys is breathtaking.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Food",
        title: "Konbini Culture",
        content: "Convenience stores ('konbini') are the lifeblood of quick meals, offering shockingly fresh onigiri (rice balls), bentos, and seasonal sweets.",
      },
      {
        category: "Misconception vs Reality",
        title: "Quiet Commutes",
        content: "Misconception: Tokyo is loud all the time.\nReality: Trains acting at 150% capacity are bizarrely silent. People read, sleep, or text, maintaining strict social harmony.",
      },
      {
        category: "Routines",
        title: "The Sento",
        content: "Despite tiny apartments, many still visit local sento (public bathhouses) to soak, chat with neighbors, and drink fruit milk afterward.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1668563966338-38394330adf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMEphcGFuJTIwY2l0eXNjYXBlJTIwbmlnaHR8ZW58MXx8fHwxNzcyODg3ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "1",
        author: "Yuki Tanaka",
        date: "March 2, 2026",
        text: "Visited the Senso-ji Temple at dawn. The morning mist and incense created an almost ethereal atmosphere. This place has stood for over 1,300 years—you can feel the weight of history in every stone.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-1",
        author: "Kenji Sato",
        date: "March 5, 2026",
        transcription: "My favorite sound in Tokyo isn't the train melodies; it's the quiet hum of my neighborhood at 5 AM when the tofu seller makes his rounds on a bicycle.",
        duration: "0:18",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-1",
        author: "Sarah",
        question: "Is it really considered rude to eat while walking in public?",
        answer: "Yes, it generally is! We prefer to stop, eat or drink near a convenience store or vending machine, then throw away the trash right there, rather than walking with food.",
        answeredBy: "Hiroshi",
      },
    ],
  },
  {
    id: "paris-france",
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    timelinePeriod: "Ancient to Modern (3rd Century BC - Present)",
    capsuleColor: "#FFC857",
    perspectives: [
      {
        role: "General History",
        summary: "Paris began as a Gallo-Roman settlement and evolved into the cultural capital of France. Renovated extensively by Haussmann in the 19th century, it remains the historic 'City of Light' through wars and revolutions.",
      },
      {
        role: "Local",
        summary: "The postcards show the Eiffel Tower, but real Paris happens on café terraces and along the Canal Saint-Martin, where locals debate politics over cheap wine and watch the world go by.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Routines",
        title: "Boulangerie Runs",
        content: "A daily ritual involves picking up a fresh, warm baguette. It's almost mandatory to bite the end off (le quignon) while walking home.",
      },
      {
        category: "Slang",
        title: "Verlan",
        content: "Parisians love 'verlan' (inverting words). 'Fou' (crazy) becomes 'Ouf', creating a constantly evolving street vocabulary.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mjg1NzE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "3",
        author: "Sophie Laurent",
        date: "March 5, 2026",
        text: "Sunset from Trocadéro overlooking the Eiffel Tower. Every visit feels like the first time. The tower sparkles on the hour and the whole city seems to hold its breath.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-2",
        author: "Camille",
        date: "March 4, 2026",
        transcription: "You know you're Parisian when you complain about the tourists in the summer, but secretly love walking by the Seine at midnight when everyone else is asleep.",
        duration: "0:22",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-2",
        author: "Alex",
        question: "How do you navigate the cafe culture? Do I wait to be seated?",
        answer: "If you just want a quick coffee, stand at the bar (it's cheaper too!). If you sit at a table, you can usually just sit down, but eye contact and a polite 'Bonjour' goes a long way.",
        answeredBy: "Julien",
      },
    ],
  },
  {
    id: "giza-egypt",
    name: "Giza",
    country: "Egypt",
    lat: 29.9792,
    lng: 31.1342,
    timelinePeriod: "Ancient Egypt (2580 BC - Present)",
    capsuleColor: "#E8B86D",
    perspectives: [
      {
        role: "General History",
        summary: "The Giza Plateau houses the Great Pyramid of Khufu, built around 2580 BC. These marvels of ancient engineering have overseen thousands of years of human history under the gaze of the Sphinx.",
      },
      {
        role: "Resident",
        summary: "We live in the shadow of giants. To the world they are mysteries, but to us, they are the backdrop to our daily commute, the golden peaks visible above the dust and noise of Cairo.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Food",
        title: "Koshary",
        content: "The ultimate comfort food: a carb-heavy mix of rice, macaroni, lentils, and chickpeas, topped with spicy tomato sauce and crispy onions. It fuels the city.",
      },
      {
        category: "Misconception vs Reality",
        title: "Desert Isolation",
        content: "Misconception: The pyramids are in the middle of a vast desert.\nReality: The city of Giza pushes right up against the plateau. You can see the pyramids from a nearby KFC.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1708174419265-7cc6225031b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0fGVufDF8fHx8MTc3Mjg5NDQyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "5",
        author: "Ahmed Hassan",
        date: "February 25, 2026",
        text: "Standing before the Great Pyramid at sunrise. My ancestors built this 4,500 years ago without modern tools. The scale is incomprehensible until you're there.",
      },
      {
        id: "5a",
        author: "Sarah",
        date: "March 10, 2026",
        text: "The sound and light show at night is a bit cheesy, but watching the Sphinx lit up against the pitch-black desert sky is still completely unforgettable.",
      },
      {
        id: "5b",
        author: "Omar",
        date: "April 2, 2026",
        text: "We rode camels out into the dunes just as the sun set. Seeing all three pyramids aligned in the distance is the only way to really appreciate the geometry.",
      }
    ],
    voiceNotes: [
      {
        id: "vn-3",
        author: "Amira",
        date: "March 1, 2026",
        transcription: "People think we live in the desert, but Giza is loud, chaotic, and so full of life. It’s funny looking out your kitchen window and seeing the pyramids right there above KFC.",
        duration: "0:15",
        audioUrl: "",
      },
      {
        id: "vn-3a",
        author: "Tariq",
        date: "May 14, 2026",
        transcription: "Take plenty of water and don't let anyone pressure you into a camel ride if you don't want one. A firm 'La shukran' (no thank you) is all you need.",
        duration: "0:12",
        audioUrl: "",
      }
    ],
    questions: [
      {
        id: "q-3",
        author: "Lucas",
        question: "Is it safe to wander around the local neighborhoods near the pyramids?",
        answer: "Yes, it's generally safe and people are very hospitable. Just be prepared for crowds, aggressive vendors near the tourist zones, and always negotiate cab fares first!",
        answeredBy: "Mahmoud",
      },
      {
        id: "q-3a",
        author: "Emma",
        question: "Is going inside the Great Pyramid worth the extra ticket?",
        answer: "Only if you want the sheer physical experience of being inside a mountain of stone. It's hot, claustrophobic, and empty. I loved it, but it's not for everyone.",
        answeredBy: "Youssef",
      }
    ],
  },
  {
    id: "machu-picchu-peru",
    name: "Machu Picchu",
    country: "Peru",
    lat: -13.1631,
    lng: -72.5450,
    timelinePeriod: "Inca Empire (1450 AD - Present)",
    capsuleColor: "#95E1D3",
    perspectives: [
      {
        role: "General History",
        summary: "Built around 1450 CE, this 'Lost City' was a royal Inca estate perched high in the Andes. Abandoned during the Spanish Conquest, its dry-stone walls remain an architectural marvel.",
      },
      {
        role: "Indigenous Weaver",
        summary: "The stones tell one story, but our textiles tell another. We still weave the symbols of our ancestors into our clothes, keeping the spiritual connection to the Apus (mountains) alive.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Traditions",
        title: "Pachamama",
        content: "Deep respect for Pachamama (Mother Earth) still dictates agricultural practices. Offerings of chicha (corn beer) and coca leaves are common before planting or harvests.",
      },
      {
        category: "Food",
        title: "Cuy & Potatoes",
        content: "Thousands of varieties of potatoes are grown in the Sacred Valley, often served alongside Cuy (guinea pig), a traditional Andean delicacy.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1568517868534-1637be8943be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNodSUyMFBpY2NodSUyMFBlcnUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcyODA5NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "7",
        author: "Carlos Mendoza",
        date: "March 6, 2026",
        text: "Hiked the Inca Trail for 4 days. When you first see the Sun Gate view of Machu Picchu in the morning mist, you understand why the Incas chose this sacred place.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-4",
        author: "Rosa",
        date: "February 28, 2026",
        transcription: "My grandmother still speaks only Quechua. She says the tourists look at the stones, but they forget to listen to the mountains. The Apus (mountain spirits) are what protect us.",
        duration: "0:20",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-4",
        author: "David",
        question: "How do locals feel about the mass tourism at Machu Picchu?",
        answer: "It's a double-edged sword. It brings essential income to our families, but we worry about the erosion of the site and the commercialization of our sacred traditions.",
        answeredBy: "Mateo",
      },
    ],
  },
  {
    id: "agra-india",
    name: "Agra",
    country: "India",
    lat: 27.1767,
    lng: 78.0081,
    timelinePeriod: "Mughal Empire (1632 AD - Present)",
    capsuleColor: "#C5A3FF",
    perspectives: [
      {
        role: "General History",
        summary: "The Taj Mahal, completed in 1653, was commissioned by Mughal Emperor Shah Jahan. Built by 20,000 artisans, it represents the absolute pinnacle of Mughal architecture and eternal devotion.",
      },
      {
        role: "Artisan",
        summary: "We are the descendants of the carvers who inlaid the marble. While the world sees a monument, we see the geometry, the sweat, and the legacy of craftsmanship passed down our bloodlines.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Craft",
        title: "Parchin Kari",
        content: "The ancient art of marble inlay is still practiced in cramped workshops across Agra, preserving the exact techniques used on the Taj Mahal.",
      },
      {
        category: "Food",
        title: "Petha",
        content: "Agra's signature sweet, Petha, is made from ash gourd and sugar. Walking the narrow alleys, you'll see massive vats boiling it fresh.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1688735472397-076a9577c060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYWolMjBNYWhhbCUyMEluZGlhJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3Mjg5NDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "9",
        author: "Priya Sharma",
        date: "February 27, 2026",
        text: "Watched the Taj Mahal transform at sunrise. The white marble literally glows pink in the morning light. It's a monument to eternal love built by 20,000 hands.",
      },
      {
        id: "9a",
        author: "Alex",
        date: "November 14, 2026",
        text: "The symmetry is what breaks your brain. Everything, even the reflection in the pool, is absolutely mathematically perfect. Except Shah Jahan's own asymmetrical tomb.",
      }
    ],
    voiceNotes: [
      {
        id: "vn-5",
        author: "Imran",
        date: "March 3, 2026",
        transcription: "My family has lived near the Taj gates for six generations. We wake up to the call to prayer and the smell of Petha sweets being cooked. It's crowded, but it is home.",
        duration: "0:18",
        audioUrl: "",
      },
      {
        id: "vn-5a",
        author: "Sunita",
        date: "April 1, 2026",
        transcription: "Don't just look straight ahead. Look at the Pietra Dura inlay work on the walls. The flowers are made of carnelian, lapis lazuli, and jade.",
        duration: "0:22",
        audioUrl: "",
      }
    ],
    questions: [
      {
        id: "q-5",
        author: "Emma",
        question: "Is exploring the city beyond the Taj Mahal worth it?",
        answer: "Absolutely! The true heart of Agra is in the Kinari Bazaar and trying our street food. Don't leave without tasting Bedmi Puri for breakfast.",
        answeredBy: "Raj",
      },
    ],
  },
  {
    id: "great-wall-china",
    name: "Great Wall",
    country: "China",
    lat: 40.4319,
    lng: 116.5704,
    timelinePeriod: "Ancient China (7th Century BC - 17th Century)",
    capsuleColor: "#F38181",
    perspectives: [
      {
        role: "General History",
        summary: "Spanning 13,000 miles, the Great Wall was built over 2,000 years to protect Chinese states from nomadic invasions. The Ming Dynasty constructed the iconic brick and stone sections visible today.",
      },
      {
        role: "Local Farmer",
        summary: "To tourists it is a wonder of the world. To us in the rural villages nearby, the 'Wild Wall' is just a backdrop to our apricot orchards and daily farming routines.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Misconception vs Reality",
        title: "One Unbroken Wall",
        content: "Misconception: It's a single continuous wall.\nReality: It's actually a sprawling network of disconnected walls, trenches, and natural barriers spanning mountains and deserts.",
      },
      {
        category: "Routines",
        title: "Village Life",
        content: "Villages near unrestored sections live a quiet agrarian life, far removed from the hyper-modernity of Beijing, relying on small-scale tourism and agriculture.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1495361174397-84e5b61bb77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHcmVhdCUyMFdhbGwlMjBDaGluYSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzI3ODU0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "11",
        author: "Li Wei",
        date: "March 4, 2026",
        text: "Hiked the Jinshanling section at dawn. The wall snakes across mountain ridges as far as the eye can see. Over 2,000 years of human determination in stone.",
      },
      {
        id: "11a",
        author: "Wei Wei",
        date: "August 12, 2026",
        text: "The sheer steepness of some sections is terrifying. You aren't walking; you are climbing on your hands and knees. The soldiers stationed here lived brutal lives.",
      },
      {
        id: "11b",
        author: "Zhang Hao",
        date: "October 10, 2026",
        text: "My grandmother remembers when people used to take bricks from the unrestored sections to build their houses. Now, those same villages earn their living protecting it.",
      }
    ],
    voiceNotes: [
      {
        id: "vn-6",
        author: "Mr. Wang",
        date: "February 22, 2026",
        transcription: "When I was young, we used to run along the unrestored watchtowers playing games. To the world it's a monument, to us in the village, it was just our backyard wall.",
        duration: "0:22",
        audioUrl: "",
      },
      {
        id: "vn-6a",
        author: "Chloe",
        date: "May 5, 2026",
        transcription: "Do not go during the 'Golden Week' national holiday. You will literally be shoulder-to-shoulder on the wall unable to move. Go in late November. It's freezing, but empty.",
        duration: "0:15",
        audioUrl: "",
      }
    ],
    questions: [
      {
        id: "q-6",
        author: "Chris",
        question: "Is it true it's very crowded everywhere on the wall?",
        answer: "Only near Beijing at sections like Mutianyu and Badaling. If you go to the Jiankou or Simatai sections, you might be the only person there for hours.",
        answeredBy: "Jin",
      },
    ],
  },
  {
    id: "sydney-australia",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    timelinePeriod: "Indigenous to Modern (60,000 BC - Present)",
    capsuleColor: "#4ECDC4",
    perspectives: [
      {
        role: "General History",
        summary: "Home to the Eora Nation for 60,000 years before British arrival in 1788. Sydney evolved from a penal colony to a modern global hub, punctuated by the 1973 opening of the iconic Opera House.",
      },
      {
        role: "First Nations",
        summary: "This was, is, and always will be Aboriginal land. The harbor is not just beautiful water; it is a complex tapestry of our ancient songlines and dreaming stories.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Routines",
        title: "Coastal Walks",
        content: "Bondi to Coogee is an iconic weekend routine. Sydneysiders treat the beaches as their collective backyard, swimming year-round.",
      },
      {
        category: "Slang",
        title: "Aussie Abbreviations",
        content: "Everything is shortened: 'Arvo' (afternoon), 'Servo' (gas station), 'Tradie' (tradesperson). It's a hallmark of the egalitarian, relaxed culture.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1718185795639-c442aff612cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTeWRuZXklMjBPcGVyYSUyMEhvdXNlJTIwQXVzdHJhbGlhfGVufDF8fHx8MTc3Mjg3OTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "13",
        author: "Emma Thompson",
        date: "March 7, 2026",
        text: "Kayaked in the harbor at sunset with the Opera House and Harbour Bridge framing the view. The shells seem to glow. It's a modern wonder built on ancient land.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-7",
        author: "Liam",
        date: "March 2, 2026",
        transcription: "Nothing beats finishing work on a Friday, taking the ferry from Circular Quay, and feeling the salt spray. Then grabbing a pie at Harry's Cafe de Wheels.",
        duration: "0:12",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-7",
        author: "Olivia",
        question: "Is Bondi Beach really the best beach to visit?",
        answer: "It's iconic, but a bit of a tourist trap. Locals prefer taking the coastal walk to Bronte or Tamarama, or heading north to Manly or Freshwater for better surf and fewer crowds.",
        answeredBy: "Chloe",
      },
    ],
  },
  {
    id: "nairobi-kenya",
    name: "Nairobi",
    country: "Kenya",
    lat: -1.2921,
    lng: 36.8219,
    timelinePeriod: "Colonial to Modern (1899 - Present)",
    capsuleColor: "#AA96DA",
    perspectives: [
      {
        role: "General History",
        summary: "Founded in 1899 as a railway camp, 'Enkare Nyrobi' grew into Kenya's capital. It holds a crucial place in the legacy of East African independence and modernization.",
      },
      {
        role: "Tech Entrepreneur",
        summary: "We are the 'Silicon Savannah'. The energy here is electric. We are building world-class fintech solutions by day but hitting the vibrant afrobeats clubs by night.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Culture",
        title: "Matatu Art",
        content: "The privately owned minibuses (matatus) are rolling art galleries pumping loud music, featuring graffiti of global pop culture mixed with local heroes.",
      },
      {
        category: "Food",
        title: "Nyama Choma",
        content: "Roasted meat (nyama choma), usually goat, eaten with the hands alongside ugali (maize meal) and kachumbari (tomato onion salad). It's the ultimate social food.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1731355775969-c8f5aa4aa6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2FmYXJpJTIwS2VueWElMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzI4OTQ0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "15",
        author: "Amara Okonkwo",
        date: "February 26, 2026",
        text: "Safari in Nairobi National Park with giraffes and the city skyline in the background. Where else can you see wild lions with skyscrapers behind them?",
      },
    ],
    voiceNotes: [
      {
        id: "vn-8",
        author: "Karanja",
        date: "March 1, 2026",
        transcription: "The heartbeat of Nairobi is the Matatu. When you jump on one, the music is blasting, the art on the chassis is loud... it's organized chaos, but it gets you there.",
        duration: "0:16",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-8",
        author: "Mikael",
        question: "How do you navigate the traffic?",
        answer: "Patience, podcasts, and knowing the side routes! Sometimes taking a boda boda (motorcycle taxi) is the only way to beat the jam, but hold on tight.",
        answeredBy: "Njeri",
      },
    ],
  },
  {
    id: "new-york-usa",
    name: "New York",
    country: "United States",
    lat: 40.7128,
    lng: -74.0060,
    timelinePeriod: "Colonial to Modern (1624 - Present)",
    capsuleColor: "#FFB6B9",
    perspectives: [
      {
        role: "General History",
        summary: "From Dutch New Amsterdam to a global metropolis, NYC has been the ultimate crucible of American immigration, processing millions through Ellis Island under the gaze of the Statue of Liberty.",
      },
      {
        role: "Lifelong Resident",
        summary: "The skyline changes, the rents go up, but the soul remains. It's found in the nod you give the bodega guy every morning, and the unspoken solidarity during a delayed subway ride.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Food",
        title: "Dollar Slices & Bodegas",
        content: "The ultimate egalitarian foods: folding a cheap, hot slice of pizza while walking, or grabbing a Bacon, Egg & Cheese from the corner bodega.",
      },
      {
        category: "Misconception vs Reality",
        title: "Rude New Yorkers",
        content: "Misconception: New Yorkers are mean.\nReality: We're just in a hurry. We value efficiency over politeness. Ask for directions, and we'll help instantly—but don't stop walking.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1655845836463-facb2826510b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrJTIwQ2l0eSUyME1hbmhhdHRhbiUyMHNreWxpbmV8ZW58MXx8fHwxNzcyODM0Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "17",
        author: "Maria Garcia",
        date: "March 6, 2026",
        text: "Walked across Brooklyn Bridge at dusk. Looking back at the Manhattan skyline with the One World Trade Center standing tall—a symbol of resilience.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-9",
        author: "Tony",
        date: "February 27, 2026",
        transcription: "We might seem rude because we walk fast and ignore you, but if you ask for directions on the subway platform, three people will stop to argue about the fastest train to take.",
        duration: "0:14",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-9",
        author: "Lena",
        question: "What's the subway etiquette I should know so I don't annoy people?",
        answer: "Never block the doors. Take your backpack off and put it between your legs. And when you walk on the sidewalk, stick to the right like you're driving! Don't stop abruptly.",
        answeredBy: "Marcus",
      },
    ],
  },
  {
    id: "rio-brazil",
    name: "Rio de Janeiro",
    country: "Brazil",
    lat: -22.9068,
    lng: -43.1729,
    timelinePeriod: "Colonial to Modern (1565 - Present)",
    capsuleColor: "#FCBAD3",
    perspectives: [
      {
        role: "General History",
        summary: "Founded in 1565 by the Portuguese, Rio was the capital of Brazil until 1960. It blends spectacular natural mountain terrain with dense urbanization, watched over by Christ the Redeemer.",
      },
      {
        role: "Favela Resident",
        summary: "The postcard only shows the sand and the wealthy areas. The heartbeat and rhythm of Rio—the true samba, the resilience—comes from the complex communities on the hillsides.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Culture",
        title: "Rodas de Samba",
        content: "Impromptu samba circles can break out anywhere. Musicians gather around a table with percussion and guitars, and everyone joins in singing and dancing.",
      },
      {
        category: "Routines",
        title: "Beach Democracy",
        content: "The beach (like Copacabana or Ipanema) is the great equalizer. Everyone from every class mingles in minimal clothing, playing futevôlei and drinking fresh mate.",
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1678044865436-29d7fcca4ffe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBCcmF6aWwlMjBiZWFjaHxlbnwxfHx8fDE3NzI4OTQ0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      {
        id: "19",
        author: "Lucas Silva",
        date: "February 28, 2026",
        text: "Watched the sunset from Sugarloaf Mountain. The city spreads between mountains and ocean—nature and urban life intertwined. Cristo Redentor watches over all.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-10",
        author: "Beatriz",
        date: "March 5, 2026",
        transcription: "Sundays in Rio are magic. The avenues close to cars, everyone is on bikes, running, drinking cold coconut water. The sea breeze mixes with the sound of the drums.",
        duration: "0:21",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-10",
        author: "John",
        question: "Is it safe to visit the favelas?",
        answer: "Some pacified favelas like Vidigal offer amazing guided tours and views. But you should never wander into one alone or unguided—always go with a local community guide.",
        answeredBy: "Rafael",
      },
    ],
  },
  {
    id: "accra-ghana",
    name: "Accra",
    country: "Ghana",
    lat: 5.6037,
    lng: -0.1870,
    timelinePeriod: "Pre-Colonial to Modern (15th Century - Present)",
    capsuleColor: "#F2A900",
    perspectives: [
      {
        role: "General History",
        summary: "Accra grew from a collection of coastal Ga villages into the capital of the Gold Coast. After independence in 1957 led by Kwame Nkrumah, it became a symbol of pan-African liberation.",
      },
      {
        role: "Returnee",
        summary: "Coming back during the Year of Return changed my life. You feel an immediate, profound kinetic energy in the air—from the markets of Makola to the tech hubs in Osu.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Food",
        title: "Jollof Rice Wars",
        content: "Ghanaian Jollof is arguably the best (don't tell Nigerians). It's a staple at every event, fiercely debated, and best served with kelewele (spicy fried plantains).",
      },
      {
        category: "Culture",
        title: "Azonto and Afrobeats",
        content: "Music is inescapable here. The latest Afrobeats tracks blast from tro-tros (minibuses) and roadside stalls constantly.",
      }
    ],
    images: ["/accra.png"],
    stories: [
      {
        id: "20",
        author: "Kofi",
        date: "April 18, 2026",
        text: "The energy of Makola market is overwhelming but beautiful. You can find absolutely everything, provided you know how to bargain.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-11",
        author: "Ama",
        date: "January 2, 2026",
        transcription: "You have not experienced Accra until you take a tro-tro. The mate shouting the destinations out the window is the unofficial soundtrack of the city.",
        duration: "0:15",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-11",
        author: "Sarah",
        question: "Is December the best time to visit?",
        answer: "Yes! 'Detty December' is legendary. The parties, festivals, and diaspora returning make the city electric, though very crowded.",
        answeredBy: "Kwame",
      },
    ],
  },
  {
    id: "london-uk",
    name: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
    timelinePeriod: "Roman Londinium to Modern (43 AD - Present)",
    capsuleColor: "#CC2028",
    perspectives: [
      {
        role: "General History",
        summary: "Founded by the Romans as Londinium, it survived plagues, fires, and the Blitz to become one of the world's most diverse financial and cultural hubs on the River Thames.",
      },
      {
        role: "Commuter",
        summary: "Mind the gap. It's a city of unwritten rules: stand on the right on escalators, never make eye contact on the Tube, and endure the drizzle with a silent inner resilience.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Routines",
        title: "Pub Culture",
        content: "The local pub isn't just about drinking; it's the living room of the community. A Sunday Roast with a pint is an institution.",
      },
      {
        category: "Misconception vs Reality",
        title: "Terrible Food",
        content: "Misconception: British food is terrible.\nReality: London is arguably the culinary capital of Europe now, with incredible depth from Brick Lane curries to Borough Market delicacies.",
      }
    ],
    images: ["https://images.unsplash.com/photo-1513635269975-59693e0cd8ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBjaXR5fGVufDF8fHx8MTc3Mjg5NTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080"],
    stories: [
      {
        id: "21",
        author: "James",
        date: "May 10, 2026",
        text: "Walking along South Bank at twilight is undefeated. The London Eye, the Tate Modern... the skyline blends Victorian brick with glass skyscrapers perfectly.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-12",
        author: "Oliver",
        date: "September 20, 2026",
        transcription: "If you want to feel the true speed of the city, try walking slowly at King's Cross station at 8:30 AM on a Tuesday. You will be trampled.",
        duration: "0:12",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-12",
        author: "Ahmed",
        question: "Is the Tube easy to navigate?",
        answer: "Incredibly easy. Just tap your contactless card on the yellow reader and follow the colored lines. But download Citymapper just in case.",
        answeredBy: "Lucy",
      },
    ],
  },
  {
    id: "edinburgh-scotland",
    name: "Edinburgh",
    country: "Scotland",
    lat: 55.9533,
    lng: -3.1883,
    timelinePeriod: "Middle Ages to Modern (12th Century - Present)",
    capsuleColor: "#005EB8",
    perspectives: [
      {
        role: "General History",
        summary: "A city split in two: the medieval Old Town with its labyrinthine closes, and the Georgian New Town. It has served as Scotland's capital since 1437, shadowed by a volcano-perched castle.",
      },
      {
        role: "Student",
        summary: "Living here feels like you're inside a Gothic novel. The mist rolling off Arthur's Seat and the dark, towering tenements make even walking to class a dramatic event.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Culture",
        title: "The Fringe",
        content: "Every August, the population doubles as the city hosts the world's largest arts festival. Every pub, basement, and street corner becomes a stage.",
      },
      {
        category: "Slang",
        title: "Ken?",
        content: "You'll quickly learn local Scots words: 'Ken' (know), 'Braw' (good/nice), and 'Baltic' (freezing cold, which it usually is).",
      }
    ],
    images: ["https://images.unsplash.com/photo-1543884347-24a91a92ebd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZGluYnVyZ2glMjBTY290bGFuZHxlbnwxfHx8fDE3NzI4OTUyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    stories: [
      {
        id: "22",
        author: "Fiona",
        date: "February 28, 2026",
        text: "Climbed Arthur's Seat in the freezing wind before dawn. Seeing the sun rise over the Firth of Forth with the whole city laid out below is worth the frozen fingers.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-13",
        author: "Ewan",
        date: "November 5, 2026",
        transcription: "The weather changes every five minutes. Bring a waterproof layer. Seriously, an umbrella is useless here because the wind will just snap it in half.",
        duration: "0:14",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-13",
        author: "Mark",
        question: "Is a weekend enough to see it?",
        answer: "To see the Castle, the Mile, and hike Arthur's Seat? Yes. To actually feel the vibe of the pubs in Leith? No. Give it 4 days.",
        answeredBy: "Catriona",
      },
    ],
  },
  {
    id: "scottish-highlands",
    name: "Highlands",
    country: "Scotland",
    lat: 57.3061,
    lng: -4.6158,
    timelinePeriod: "Ancient Glacial to Modern",
    capsuleColor: "#228B22",
    perspectives: [
      {
        role: "General History",
        summary: "A rugged, mountainous region shaped by glaciers and defined by deep glens and lochs. Historically home to fiercely independent clans, the area was culturally decimated by the 18th-century Highland Clearances.",
      },
      {
        role: "Crofter",
        summary: "The land is harsh but it belongs to us. You respect the erratic weather, you watch the sheep, and you find comfort in the absolute, overwhelming silence of the glens.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Nature",
        title: "Munro Bagging",
        content: "A popular obsession here is climbing 'Munros' (mountains over 3,000 feet). There are 282 of them, and ticking them off is a grueling point of pride.",
      },
      {
        category: "Misconception vs Reality",
        title: "Tartan Daily",
        content: "Misconception: Everyone wears kilts every day.\nReality: Kilts are mostly for weddings, ceilidhs (dances), or rugby matches. You're more likely to see locals in Gore-Tex.",
      }
    ],
    images: ["https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTY290dGlzaCUyMEhpZ2hsYW5kc3xlbnwxfHx8fDE3NzI4OTUyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    stories: [
      {
        id: "23",
        author: "Alasdair",
        date: "September 10, 2026",
        text: "Driving through Glencoe in the driving rain. It looks exactly like the tragic history feels. Dark, dramatic, and unspeakably beautiful.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-14",
        author: "Morag",
        date: "July 20, 2026",
        transcription: "Beware the midges. In the summer, if the wind drops, those tiny biting flies rise in clouds from the bracken. Skin So Soft is the only real defense.",
        duration: "0:16",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-14",
        author: "Elena",
        question: "Is driving the North Coast 500 safe for foreigners?",
        answer: "Yes, but remember it's largely single-track roads. Do NOT speed, use the passing places correctly (to let people overtake AND pass), and watch for sheep.",
        answeredBy: "Hamish",
      },
    ],
  },
  {
    id: "cape-coast-ghana",
    name: "Cape Coast",
    country: "Ghana",
    lat: 5.1053,
    lng: -1.2466,
    timelinePeriod: "Pre-Colonial to Modern (15th Century - Present)",
    capsuleColor: "#2A9D8F",
    perspectives: [
      {
        role: "General History",
        summary: "Cape Coast, formerly the seat of the British colonial administration until 1877, holds immense historical weight. It is known for Cape Coast Castle, a striking and somber monument to the transatlantic slave trade, and its proximity to the Kakum National Park rainforest.",
      },
      {
        role: "Local Historian",
        summary: "Our city stands at the crossroads of immense tragedy and breathtaking natural beauty. The castles force the world to remember the past, while our vibrant fishing communities look towards the future.",
      }
    ],
    lifeTodayCards: [
      {
        category: "History",
        title: "The Castles",
        content: "Cape Coast Castle and Elmina Castle are harrowing, essential visits. Passing through the 'Door of No Return' is a deeply moving experience that connects the diaspora to their ancestry.",
      },
      {
        category: "Nature",
        title: "Kakum Canopy Walkway",
        content: "Just north of the city lies Kakum National Park. The suspended canopy walk, hanging 30 meters above the rainforest floor, offers incredible views of the lush ecosystem and its wildlife.",
      }
    ],
    images: ["/cape-coast.png"],
    stories: [
      {
        id: "cc-1",
        author: "Marcus Johnson",
        date: "May 12, 2026",
        text: "Walking through the dungeons of Cape Coast Castle was the heaviest experience of my life. You can feel the echoes of the ancestors in the stone. A necessary pilgrimage.",
      },
      {
        id: "cc-2",
        author: "Abena",
        date: "June 4, 2026",
        text: "The Kakum canopy walk is terrifying but exhilarating! You're suspended right in the middle of the jungle canopy. We saw mona monkeys swinging in the distance.",
      }
    ],
    voiceNotes: [
      {
        id: "vn-cc-1",
        author: "Kwesi",
        date: "March 8, 2026",
        transcription: "When you visit the castles, take a moment to look out at the ocean from the cannons. It's beautiful, but knowing the history makes the contrast sharp and unforgettable.",
        duration: "0:18",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-cc-1",
        author: "David",
        question: "How long is the drive from Accra to Cape Coast?",
        answer: "It usually takes about 3 to 4 hours depending on traffic. It's a very scenic drive along the coast, especially once you pass through Winneba.",
        answeredBy: "Nana",
      },
    ],
  },
  {
    id: "durham-uk",
    name: "Durham",
    country: "United Kingdom",
    lat: 54.7753,
    lng: -1.5849,
    timelinePeriod: "Norman Era to Modern (11th Century - Present)",
    capsuleColor: "#7B2CBF",
    perspectives: [
      {
        role: "General History",
        summary: "Durham is famous for its towering Norman Cathedral and Castle, both UNESCO World Heritage Sites. For centuries, the Prince Bishops of Durham ruled with near-royal authority.",
      },
      {
        role: "Student",
        summary: "With the steep cobbled streets and the cathedral looming everywhere you look, studying here genuinely feels like you're attending Hogwarts.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Collegiate System",
        title: "College Rivalries",
        content: "Durham University operates on a collegiate system similar to Oxford and Cambridge. Every student belongs to a college, fostering intense loyalties and friendly sports rivalries.",
      },
      {
        category: "Pacing",
        title: "The Wear Walk",
        content: "Walking along the River Wear that loops around the city center peninsula is a daily ritual for locals, surrounded by ancient woods and medieval bridges.",
      }
    ],
    images: ["/durham-generated.png"],
    stories: [
      {
        id: "durham-1",
        author: "Sophie",
        date: "October 14, 2026",
        text: "Matriculation day in the Cathedral is a core memory. The sheer scale of the Norman pillars makes you realize how insignificant modern problems are.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-durham",
        author: "Nigel",
        date: "April 2, 2026",
        transcription: "Avoid Saddler Street on a Saturday if you are in a rush. The cobbles, the tourists, and the students make it an absolute bottleneck.",
        duration: "0:10",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-durham",
        author: "Carlos",
        question: "Is the castle actually used as student accommodation?",
        answer: "Yes! Students belonging to University College actually live in the 11th-century castle. It's the oldest student residence in the world.",
        answeredBy: "Eleanor",
      },
    ],
  },
  {
    id: "york-uk",
    name: "York",
    country: "United Kingdom",
    lat: 53.9590,
    lng: -1.0815,
    timelinePeriod: "Roman Eboracum to Modern (71 AD - Present)",
    capsuleColor: "#E07A5F",
    perspectives: [
      {
        role: "General History",
        summary: "Founded as Eboracum by the Romans, heavily fought over by the Vikings (Jorvik), and dominated by the spectacular York Minster. It is arguably the most perfectly preserved medieval city in England.",
      },
      {
        role: "Historian",
        summary: "You cannot dig a hole here without hitting Roman masonry, a Viking bone comb, or a medieval coin. The city is a colossal layer cake of British history.",
      }
    ],
    lifeTodayCards: [
      {
        category: "Shopping",
        title: "The Shambles",
        content: "The Shambles is a narrow, medieval street with overhanging timber-framed buildings. It famously inspired Diagon Alley in Harry Potter and is filled with quirky shops.",
      },
      {
        category: "Wildlife",
        title: "The York Campus Ducks",
        content: "The University of York campus is famous for its massive population of wildfowl, especially mallard ducks, living around its large central lake. They are an aggressively beloved staple of student life here.",
      }
    ],
    images: ["/york-ducks.png"],
    stories: [
      {
        id: "york-1",
        author: "Harry",
        date: "August 22, 2026",
        text: "Walking the complete circuit of the ancient City Walls at sunset gives you the best perspective of the Minster rising above the rooftops.",
      },
    ],
    voiceNotes: [
      {
        id: "vn-york",
        author: "Gemma",
        date: "December 10, 2026",
        transcription: "The Christmas market here is spectacular, but wrap up warm. The wind whipping down the narrow streets cuts straight through you.",
        duration: "0:12",
        audioUrl: "",
      },
    ],
    questions: [
      {
        id: "q-york",
        author: "Wei",
        question: "Is the Viking centre worth the queue?",
        answer: "The Jorvik Viking Centre is incredible. They literally rebuilt the Viking city where they excavated it, complete with the smells of medieval fish and cabbage.",
        answeredBy: "Thomas",
      },
    ],
  }
];
