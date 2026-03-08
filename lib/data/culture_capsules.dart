import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/culture_capsule.dart';

List<CultureCapsule> cultureCapsules = [
  CultureCapsule(
    id: "tokyo-japan",
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    timelinePeriod: "Ancient to Modern (8th Century - Present)",
    capsuleColor: "#FF6B9D",
    aiSummary: "Tokyo, originally known as Edo, transformed from a small fishing village in the 12th century into the political center of Japan in 1603 when Tokugawa Ieyasu established the Tokugawa shogunate. Following the Meiji Restoration in 1868, the city was renamed Tokyo ('Eastern Capital') and became the imperial capital. The city was devastated by the 1923 Great Kantō earthquake and World War II bombings, yet rebuilt itself into one of the world's most advanced metropolises, blending ancient traditions with cutting-edge technology.",
    lifeTodaySummary: "Modern Tokyo is a city of hyper-convenience and deep-rooted traditions. While neon lights, advanced transit, and convenience stores dominate the surface, neighborhood festivals (matsuri), hidden shrines, and generational craft shops remain central to daily life. Residents navigate tiny living spaces but treat the city itself—its parks, cafes, and bathhouses—as an extension of their homes.",
    images: [
      "https://images.unsplash.com/photo-1668563966338-38394330adf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMEphcGFuJTIwY2l0eXNjYXBlJTIwbmlnaHR8ZW58MXx8fHwxNzcyODg3ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "1",
        author: "Yuki Tanaka",
        date: "March 2, 2026",
        text: "Visited the Senso-ji Temple at dawn. The morning mist and incense created an almost ethereal atmosphere. This place has stood for over 1,300 years—you can feel the weight of history in every stone.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-1",
        author: "Kenji Sato",
        date: "March 5, 2026",
        transcription: "My favorite sound in Tokyo isn't the train melodies; it's the quiet hum of my neighborhood at 5 AM when the tofu seller makes his rounds on a bicycle.",
        duration: "0:18",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-1",
        author: "Sarah",
        question: "Is it really considered rude to eat while walking in public?",
        answer: "Yes, it generally is! We prefer to stop, eat or drink near a convenience store or vending machine, then throw away the trash right there, rather than walking with food.",
        answeredBy: "Hiroshi",
      ),
    ],
  ),
  CultureCapsule(
    id: "paris-france",
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    timelinePeriod: "Ancient to Modern (3rd Century BC - Present)",
    capsuleColor: "#FFC857",
    aiSummary: "Paris began as the Gallo-Roman settlement of Lutetia on the Île de la Cité around the 3rd century BC. It became the capital of France in 987 CE under Hugh Capet. The city flourished during the Renaissance and became the heart of the Enlightenment in the 18th century. Baron Haussmann's massive urban renovation in the 1850s-1860s created the iconic boulevards and architecture we see today. Paris has been at the center of art, philosophy, fashion, and revolution, earning its title as the 'City of Light.'",
    lifeTodaySummary: "Life in Paris heavily revolves around neighborhoods (arrondissements). A typical day might involve a fresh baguette from the local boulangerie and an espresso at a terrace café before taking the Metro. While often romanticized, modern Parisians deal with real urban issues like transit strikes and rising costs, yet fiercely protect their work-life balance and right to leisure (flânerie).",
    images: [
      "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMFRvd2VyJTIwc3Vuc2V0fGVufDF8fHx8MTc3Mjg1NzE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "3",
        author: "Sophie Laurent",
        date: "March 5, 2026",
        text: "Sunset from Trocadéro overlooking the Eiffel Tower. Every visit feels like the first time. The tower sparkles on the hour and the whole city seems to hold its breath.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-2",
        author: "Camille",
        date: "March 4, 2026",
        transcription: "You know you're Parisian when you complain about the tourists in the summer, but secretly love walking by the Seine at midnight when everyone else is asleep.",
        duration: "0:22",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-2",
        author: "Alex",
        question: "How do you navigate the cafe culture? Do I wait to be seated?",
        answer: "If you just want a quick coffee, stand at the bar (it's cheaper too!). If you sit at a table, you can usually just sit down, but eye contact and a polite 'Bonjour' goes a long way.",
        answeredBy: "Julien",
      ),
    ],
  ),
  CultureCapsule(
    id: "giza-egypt",
    name: "Giza",
    country: "Egypt",
    lat: 29.9792,
    lng: 31.1342,
    timelinePeriod: "Ancient Egypt (2580 BC - Present)",
    capsuleColor: "#E8B86D",
    aiSummary: "The Giza Plateau houses the last remaining Wonder of the Ancient World—the Great Pyramid of Khufu, built around 2580-2560 BC. This necropolis served as the royal burial ground for the Fourth Dynasty pharaohs. The precision of the pyramids' construction, aligned with cardinal directions and celestial bodies, remains a testament to ancient Egyptian engineering and astronomical knowledge. The Great Sphinx, carved from limestone bedrock, has guarded this sacred ground for over 4,500 years, witnessing the rise and fall of countless civilizations.",
    lifeTodaySummary: "Giza today is inextricably linked with Cairo, bustling with chaotic traffic, vibrant markets, and dense neighborhoods that abut the ancient plateau. Locals experience the striking juxtaposition of 4,000-year-old monuments towering over modern apartment blocks, pizza shops, and chaotic roundabouts. Street sounds—from the call to prayer to car horns—create a constant, energetic soundscape.",
    images: [
      "https://images.unsplash.com/photo-1708174419265-7cc6225031b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0fGVufDF8fHx8MTc3Mjg5NDQyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "5",
        author: "Ahmed Hassan",
        date: "February 25, 2026",
        text: "Standing before the Great Pyramid at sunrise. My ancestors built this 4,500 years ago without modern tools. The scale is incomprehensible until you're there.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-3",
        author: "Amira",
        date: "March 1, 2026",
        transcription: "People think we live in the desert, but Giza is loud, chaotic, and so full of life. It’s funny looking out your kitchen window and seeing the pyramids right there above KFC.",
        duration: "0:15",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-3",
        author: "Lucas",
        question: "Is it safe to wander around the local neighborhoods near the pyramids?",
        answer: "Yes, it's generally safe and people are very hospitable. Just be prepared for crowds, aggressive vendors near the tourist zones, and always negotiate cab fares first!",
        answeredBy: "Mahmoud",
      ),
    ],
  ),
  CultureCapsule(
    id: "machu-picchu-peru",
    name: "Machu Picchu",
    country: "Peru",
    lat: -13.1631,
    lng: -72.5450,
    timelinePeriod: "Inca Empire (1450 AD - Present)",
    capsuleColor: "#95E1D3",
    aiSummary: "Built around 1450 CE at the height of the Inca Empire under Pachacuti Inca Yupanqui, Machu Picchu served as a royal estate and sacred religious site. Perched at 7,970 feet above sea level in the Andes Mountains, this 'Lost City' was abandoned during the Spanish Conquest and remained hidden from the world until Hiram Bingham's 1911 expedition. The sophisticated dry-stone construction has withstood centuries of earthquakes, showcasing the Inca's advanced engineering and astronomical knowledge. Today it stands as a powerful symbol of the Inca civilization.",
    lifeTodaySummary: "While nobody lives within the ruins themselves, the surrounding Sacred Valley and the town of Aguas Calientes thrive on the tourism ecosystem. Quechua culture remains vibrant here; indigenous farmers cultivate potatoes and corn using techniques passed down from the Incas, while weaving traditional textiles that tell stories of their heritage.",
    images: [
      "https://images.unsplash.com/photo-1568517868534-1637be8943be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNodSUyMFBpY2NodSUyMFBlcnUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcyODA5NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "7",
        author: "Carlos Mendoza",
        date: "March 6, 2026",
        text: "Hiked the Inca Trail for 4 days. When you first see the Sun Gate view of Machu Picchu in the morning mist, you understand why the Incas chose this sacred place.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-4",
        author: "Rosa",
        date: "February 28, 2026",
        transcription: "My grandmother still speaks only Quechua. She says the tourists look at the stones, but they forget to listen to the mountains. The Apus (mountain spirits) are what protect us.",
        duration: "0:20",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-4",
        author: "David",
        question: "How do locals feel about the mass tourism at Machu Picchu?",
        answer: "It's a double-edged sword. It brings essential income to our families, but we worry about the erosion of the site and the commercialization of our sacred traditions.",
        answeredBy: "Mateo",
      ),
    ],
  ),
  CultureCapsule(
    id: "agra-india",
    name: "Agra",
    country: "India",
    lat: 27.1767,
    lng: 78.0081,
    timelinePeriod: "Mughal Empire (1632 AD - Present)",
    capsuleColor: "#C5A3FF",
    aiSummary: "The Taj Mahal, commissioned in 1632 by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, took 22 years and 20,000 artisans to complete. This ivory-white marble mausoleum represents the pinnacle of Mughal architecture, combining elements from Islamic, Persian, Ottoman Turkish, and Indian architectural styles. The complex's perfect symmetry, intricate calligraphy, and precious stone inlays have made it one of the world's most recognizable symbols of love and devotion. The monument changes color throughout the day, from pink at dawn to golden at sunset.",
    lifeTodaySummary: "Agra is a bustling, dusty industrial city famous for its leather goods and marble inlay craftsmanship (Parchin Kari), skills passed directly from the families who built the Taj Mahal. The streets are a sensory overload of rickshaws, street food vendors selling spicy chaat, and the enduring legacy of Mughal culture intermingled with everyday Indian enterprise.",
    images: [
      "https://images.unsplash.com/photo-1688735472397-076a9577c060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYWolMjBNYWhhbCUyMEluZGlhJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3Mjg5NDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "9",
        author: "Priya Sharma",
        date: "February 27, 2026",
        text: "Watched the Taj Mahal transform at sunrise. The white marble literally glows pink in the morning light. It's a monument to eternal love built by 20,000 hands.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-5",
        author: "Imran",
        date: "March 3, 2026",
        transcription: "My family has lived near the Taj gates for six generations. We wake up to the call to prayer and the smell of Petha sweets being cooked. It's crowded, but it is home.",
        duration: "0:18",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-5",
        author: "Emma",
        question: "Is exploring the city beyond the Taj Mahal worth it?",
        answer: "Absolutely! The true heart of Agra is in the Kinari Bazaar and trying our street food. Don't leave without tasting Bedmi Puri for breakfast.",
        answeredBy: "Raj",
      ),
    ],
  ),
  CultureCapsule(
    id: "great-wall-china",
    name: "Great Wall",
    country: "China",
    lat: 40.4319,
    lng: 116.5704,
    timelinePeriod: "Ancient China (7th Century BC - 17th Century)",
    capsuleColor: "#F38181",
    aiSummary: "The Great Wall of China, one of humanity's most ambitious construction projects, was built over multiple dynasties spanning more than 2,000 years, from the 7th century BC to the 17th century AD. While early walls were constructed by various states, Emperor Qin Shi Huang (221-206 BC) connected and extended them into a unified defense system. The Ming Dynasty (1368-1644 AD) built most of the wall visible today. Stretching over 13,000 miles, it was designed to protect Chinese states from nomadic invasions and control trade along the Silk Road.",
    lifeTodaySummary: "The Wall snakes through diverse rural communities across northern China. Away from the heavily restored tourist sectors like Badaling, farmers in remote villages still live alongside the crumbling 'Wild Wall,' sometimes using its loose bricks for local homes. These areas represent a quiet, agrarian way of life that contrasts sharply with China's mega-cities.",
    images: [
      "https://images.unsplash.com/photo-1495361174397-84e5b61bb77f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHcmVhdCUyMFdhbGwlMjBDaGluYSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzI3ODU0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "11",
        author: "Li Wei",
        date: "March 4, 2026",
        text: "Hiked the Jinshanling section at dawn. The wall snakes across mountain ridges as far as the eye can see. Over 2,000 years of human determination in stone.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-6",
        author: "Mr. Wang",
        date: "February 22, 2026",
        transcription: "When I was young, we used to run along the unrestored watchtowers playing games. To the world it's a monument, to us in the village, it was just our backyard wall.",
        duration: "0:22",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-6",
        author: "Chris",
        question: "Is it true it's very crowded everywhere on the wall?",
        answer: "Only near Beijing at sections like Mutianyu and Badaling. If you go to the Jiankou or Simatai sections, you might be the only person there for hours.",
        answeredBy: "Jin",
      ),
    ],
  ),
  CultureCapsule(
    id: "sydney-australia",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    timelinePeriod: "Indigenous to Modern (60,000 BC - Present)",
    capsuleColor: "#4ECDC4",
    aiSummary: "The Sydney region has been home to Aboriginal peoples, particularly the Eora Nation, for over 60,000 years before British colonization in 1788. The iconic Sydney Opera House, designed by Danish architect Jørn Utzon, opened in 1973 after 14 years of construction and became an instant architectural marvel. Its distinctive white 'shell' design was inspired by orange segments and represents one of the 20th century's most innovative structures. Sydney evolved from a penal colony to become Australia's largest and most culturally diverse city, hosting the 2000 Olympics and becoming a global hub.",
    lifeTodaySummary: "Sydneysiders are deeply connected to the coast. The lifestyle is famously outdoor-oriented, balancing a high-paced corporate culture in the CBD with weekend surf culture, coastal walks, and flat whites at local cafes. Modern Sydney is incredibly multicultural, driven largely by Asian immigration, which profoundly influences its vibrant food scene.",
    images: [
      "https://images.unsplash.com/photo-1718185795639-c442aff612cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTeWRuZXklMjBPcGVyYSUyMEhvdXNlJTIwQXVzdHJhbGlhfGVufDF8fHx8MTc3Mjg3OTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "13",
        author: "Emma Thompson",
        date: "March 7, 2026",
        text: "Kayaked in the harbor at sunset with the Opera House and Harbour Bridge framing the view. The shells seem to glow. It's a modern wonder built on ancient land.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-7",
        author: "Liam",
        date: "March 2, 2026",
        transcription: "Nothing beats finishing work on a Friday, taking the ferry from Circular Quay, and feeling the salt spray. Then grabbing a pie at Harry's Cafe de Wheels.",
        duration: "0:12",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-7",
        author: "Olivia",
        question: "Is Bondi Beach really the best beach to visit?",
        answer: "It's iconic, but a bit of a tourist trap. Locals prefer taking the coastal walk to Bronte or Tamarama, or heading north to Manly or Freshwater for better surf and fewer crowds.",
        answeredBy: "Chloe",
      ),
    ],
  ),
  CultureCapsule(
    id: "nairobi-kenya",
    name: "Nairobi",
    country: "Kenya",
    lat: -1.2921,
    lng: 36.8219,
    timelinePeriod: "Colonial to Modern (1899 - Present)",
    capsuleColor: "#AA96DA",
    aiSummary: "Nairobi, founded in 1899 as a railway depot on the Uganda Railway, grew from a swampy camp ('Ewaso Nyirobi' - 'cool water' in Maasai) to become Kenya's capital in 1907. The city played a crucial role in Kenya's independence movement, ultimately achieved in 1963. Nairobi is unique as the only capital city with a national park within its boundaries, where wildlife roams against a backdrop of modern skyscrapers. Today, it serves as East Africa's economic and cultural hub, representing the continent's rapid modernization while preserving its natural heritage and diverse cultures.",
    lifeTodaySummary: "Nairobi, the 'Silicon Savannah,' is a city of sharp contrasts. Tech entrepreneurs in affluent neighborhoods sip single-origin coffee, while the vibrant matatu (minibus) culture drives the city's pulse with booming reggae and afrobeats. Overlaid on this modern hustle is a strong cultural respect for family and community ties rooted in tribal heritage.",
    images: [
      "https://images.unsplash.com/photo-1731355775969-c8f5aa4aa6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2FmYXJpJTIwS2VueWElMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzI4OTQ0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "15",
        author: "Amara Okonkwo",
        date: "February 26, 2026",
        text: "Safari in Nairobi National Park with giraffes and the city skyline in the background. Where else can you see wild lions with skyscrapers behind them?",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-8",
        author: "Karanja",
        date: "March 1, 2026",
        transcription: "The heartbeat of Nairobi is the Matatu. When you jump on one, the music is blasting, the art on the chassis is loud... it's organized chaos, but it gets you there.",
        duration: "0:16",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-8",
        author: "Mikael",
        question: "How do you navigate the traffic?",
        answer: "Patience, podcasts, and knowing the side routes! Sometimes taking a boda boda (motorcycle taxi) is the only way to beat the jam, but hold on tight.",
        answeredBy: "Njeri",
      ),
    ],
  ),
  CultureCapsule(
    id: "new-york-usa",
    name: "New York",
    country: "United States",
    lat: 40.7128,
    lng: -74.0060,
    timelinePeriod: "Colonial to Modern (1624 - Present)",
    capsuleColor: "#FFB6B9",
    aiSummary: "Originally inhabited by the Lenape people, the area was settled by the Dutch in 1624 as New Amsterdam. The British took control in 1664, renaming it New York. The city became the first capital of the United States in 1789 and has since evolved into the world's premier financial, cultural, and media center. Ellis Island (1892-1954) processed over 12 million immigrants, making NYC the ultimate melting pot. The Statue of Liberty, gifted by France in 1886, became an enduring symbol of freedom and democracy. Today's skyline tells the story of American ambition and resilience.",
    lifeTodaySummary: "New York is defined by its relentless pace and hyper-density. Locals navigate the subway system like an art form, eat dollar slices of pizza while walking, and find community in their specific slice of the grid. Beneath the gruff exterior, New Yorkers are fiercely loyal to their neighborhoods, bodegas, and each other during times of crisis.",
    images: [
      "https://images.unsplash.com/photo-1655845836463-facb2826510b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrJTIwQ2l0eSUyME1hbmhhdHRhbiUyMHNreWxpbmV8ZW58MXx8fHwxNzcyODM0Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "17",
        author: "Maria Garcia",
        date: "March 6, 2026",
        text: "Walked across Brooklyn Bridge at dusk. Looking back at the Manhattan skyline with the One World Trade Center standing tall—a symbol of resilience.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-9",
        author: "Tony",
        date: "February 27, 2026",
        transcription: "We might seem rude because we walk fast and ignore you, but if you ask for directions on the subway platform, three people will stop to argue about the fastest train to take.",
        duration: "0:14",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-9",
        author: "Lena",
        question: "What's the subway etiquette I should know so I don't annoy people?",
        answer: "Never block the doors. Take your backpack off and put it between your legs. And when you walk on the sidewalk, stick to the right like you're driving! Don't stop abruptly.",
        answeredBy: "Marcus",
      ),
    ],
  ),
  CultureCapsule(
    id: "rio-brazil",
    name: "Rio de Janeiro",
    country: "Brazil",
    lat: -22.9068,
    lng: -43.1729,
    timelinePeriod: "Colonial to Modern (1565 - Present)",
    capsuleColor: "#FCBAD3",
    aiSummary: "Founded by the Portuguese in 1565 as a defense against French colonizers, Rio de Janeiro ('River of January') became the capital of colonial Brazil in 1763 and later the capital of the Portuguese Empire (1808-1821) when the royal court fled Napoleon. Christ the Redeemer, completed in 1931, stands as an iconic Art Deco statue atop Corcovado Mountain, overlooking the city. Rio's unique landscape of beaches, mountains, and favelas tells a complex story of beauty and inequality. The city's Carnival, born from African, Portuguese, and indigenous traditions, represents Brazil's cultural fusion.",
    lifeTodaySummary: "Cariocas (Rio locals) live for the outdoors. The beach is a democratic space where favela residents and wealthy elites mingle, play futevôlei, and drink mate. The city is deeply musical; impromptu samba circles (rodas de samba) can erupt at corner bars on any given night. Despite severe socioeconomic disparities, the spirit of 'alegria' (joy) remains central to survival and identity.",
    images: [
      "https://images.unsplash.com/photo-1678044865436-29d7fcca4ffe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBCcmF6aWwlMjBiZWFjaHxlbnwxfHx8fDE3NzI4OTQ0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    stories: [
      Story(
        id: "19",
        author: "Lucas Silva",
        date: "February 28, 2026",
        text: "Watched the sunset from Sugarloaf Mountain. The city spreads between mountains and ocean—nature and urban life intertwined. Cristo Redentor watches over all.",
      ),
    ],
    voiceNotes: [
      VoiceNote(
        id: "vn-10",
        author: "Beatriz",
        date: "March 5, 2026",
        transcription: "Sundays in Rio are magic. The avenues close to cars, everyone is on bikes, running, drinking cold coconut water. The sea breeze mixes with the sound of the drums.",
        duration: "0:21",
        audioUrl: "",
      ),
    ],
    questions: [
      AskALocalQuestion(
        id: "q-10",
        author: "John",
        question: "Is it safe to visit the favelas?",
        answer: "Some pacified favelas like Vidigal offer amazing guided tours and views. But you should never wander into one alone or unguided—always go with a local community guide.",
        answeredBy: "Rafael",
      ),
    ],
  ),
];

Future<void> fetchAndMergeCapsules() async {
  try {
    final citiesResponse = await http.get(Uri.parse('http://127.0.0.1:5000/api/cities'));
    if (citiesResponse.statusCode != 200) return;
    final cities = jsonDecode(citiesResponse.body);
    
    for (var city in cities) {
      final sitesResponse = await http.get(Uri.parse('http://127.0.0.1:5000/api/sites/city/${city['name']}'));
      if (sitesResponse.statusCode != 200) continue;
      
      final sites = jsonDecode(sitesResponse.body);
      for (var site in sites) {
        final siteId = site['id'];
        final siteName = site['name'];
        final siteLat = site['latitude'] ?? 0.0;
        final siteLng = site['longitude'] ?? 0.0;
        
        int existingIndex = cultureCapsules.indexWhere((c) => c.name.toLowerCase() == siteName.toString().toLowerCase() || c.name.toLowerCase() == city['name'].toString().toLowerCase());
        
        List<Story> apiStories = [];
        final contribResponse = await http.get(Uri.parse('http://127.0.0.1:5000/api/contributions/$siteId'));
        if (contribResponse.statusCode == 200) {
          final contribs = jsonDecode(contribResponse.body);
          for (var contrib in contribs) {
            String dateStr = contrib['created_at'].toString().split(' ').first;
            apiStories.add(Story(
              id: contrib['id'],
              author: "Local Explorer",
              date: dateStr,
              text: contrib['description'],
            ));
          }
        }
        
        if (existingIndex != -1) {
          final current = cultureCapsules[existingIndex];
          bool hasNew = false;
          final updatedStories = List<Story>.from(current.stories);
          for (var apiStory in apiStories) {
            if (!current.stories.any((s) => s.id == apiStory.id)) {
              updatedStories.add(apiStory);
              hasNew = true;
            }
          }
          if (hasNew) {
            cultureCapsules[existingIndex] = current.copyWith(stories: updatedStories);
          }
        } else {
          String shortSummary = "Modern Area";
          if (site['summary'] != null && site['summary'].toString().length > 15) {
            shortSummary = site['summary'].toString().substring(0, 15) + "...";
          }
          cultureCapsules.add(CultureCapsule(
            id: siteId,
            name: siteName,
            country: city['name'],
            lat: siteLat,
            lng: siteLng,
            aiSummary: site['summary'] ?? "AI Summary for $siteName...",
            lifeTodaySummary: "Life today in $siteName...",
            images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"],
            stories: apiStories,
            voiceNotes: [],
            questions: [],
            timelinePeriod: shortSummary,
            capsuleColor: "#4A90E2",
          ));
        }
      }
    }
  } catch (e) {
    print("Error fetching backend data: $e");
  }
}

