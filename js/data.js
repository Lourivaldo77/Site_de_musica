/**
 * Dados dos artistas e músicas
 */

export const ARTISTS = [
  {
    id: 'kelson',
    name: 'Kelson Most Wanted',
    genre: 'Rap Angolano',
    image: '/img/descarregar (19).webp',
    followers: 128000,
    monthlyListeners: 1200000,
    tracks: 152,
    bio: 'Artista angolano de rap, conhecido por suas letras impactantes e flow único.',
    color: '#1DB954'
  },
  {
    id: 'central-cee',
    name: 'Central Cee',
    genre: 'UK Drill',
    image: '/img/images (2).jpeg',
    followers: 2500000,
    monthlyListeners: 15000000,
    tracks: 89,
    bio: 'Rapper britânico, uma das maiores estrelas do UK Drill.',
    color: '#FF6B6B'
  },
  {
    id: 'travis-scott',
    name: 'Travis Scott',
    genre: 'Hip-Hop',
    image: '/img/avatars-000701366305-hu9f0i-t1080x1080.jpg',
    followers: 50000000,
    monthlyListeners: 80000000,
    tracks: 234,
    bio: 'Produtor e rapper americano, conhecido por suas produções inovadoras.',
    color: '#4ECDC4'
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    genre: 'Pop Alternativo',
    image: '/img/images (5).jpeg',
    followers: 100000000,
    monthlyListeners: 120000000,
    tracks: 67,
    bio: 'Cantora e compositora americana, vencedora de múltiplos Grammys.',
    color: '#95E1D3'
  },

  {
    id: 'imagine-dragons',
    name: 'Imagine Dragons',
    genre: 'Rock Alternativo',
    image: '/img/descarregar (15).webp',
    followers: 35000000,
    monthlyListeners: 60000000,
    tracks: 145,
    bio: 'Banda americana de rock alternativo, conhecida por hits mundiais.',
    color: '#AA96DA'
  },

  {
    id: 'drake',
    name: 'Drake',
    genre: 'Hip-Hop',
    image: '/img/descarregar (4).webp',
    followers: 150000000,
    monthlyListeners: 200000000,
    tracks: 312,
    bio: 'Rapper e cantor canadense, um dos artistas mais streamed do mundo.',
    color: '#FF6B6B'
  },

  {
    id: 'ariana-grande',
    name: 'Ariana Grande',
    genre: 'Pop',
    image: '/img/OIP (1).webp',
    followers: 130000000,
    monthlyListeners: 160000000,
    tracks: 178,
    bio: 'Cantora e atriz americana, uma das maiores estrelas pop da atualidade.',
    color: '#FFB6C1'
  },
  {
    id: 'post-malone',
    name: 'Post Malone',
    genre: 'Hip-Hop',
    image: '/img/descarregar (3).webp',
    followers: 70000000,
    monthlyListeners: 90000000,
    tracks: 156,
    bio: 'Rapper e cantor americano, conhecido por seu estilo único e versátil.',
    color: '#FFA500'
  },
  {
    id: 'dua-lipa',
    name: 'Dua Lipa',
    genre: 'Pop',
    image: '/img/descarregar (24).webp',
    followers: 90000000,
    monthlyListeners: 110000000,
    tracks: 98,
    bio: 'Cantora e compositora britânica, vencedora de múltiplos prêmios Grammy.',
    color: '#FF1493'
  },
  {
    id: 'ed-sheeran',
    name: 'Ed Sheeran',
    genre: 'Pop',
    image: '/img/OIP (17).webp',
    followers: 110000000,
    monthlyListeners: 140000000,
    tracks: 167,
    bio: 'Cantor e compositor britânico, um dos artistas mais vendidos do mundo.',
    color: '#FF6347'
  },
  {
    id: 'rihanna',
    name: 'Rihanna',
    genre: 'Pop',
    image: '/img/descarregar (5).webp',
    followers: 140000000,
    monthlyListeners: 180000000,
    tracks: 203,
    bio: 'Cantora, compositora e empresária barbadense, uma das artistas mais influentes do mundo.',
    color: '#DC143C'
  },

  {
    id: 'kendrick-lamar',
    name: 'Kendrick Lamar',
    genre: 'Hip-Hop',
    image: '/img/GettyImages-2196837244-cd59229199614d8da69e839d12e30909.jpg',
    followers: 60000000,
    monthlyListeners: 80000000,
    tracks: 145,
    bio: 'Rapper e compositor americano, vencedor de múltiplos prêmios Grammy e Pulitzer.',
    color: '#000080'
  },
  {
    id: 'lil-tecca',
    name: 'Lil Tecca',
    genre: 'Hip-Hop/Rap',
    image: '/img/OIP (4).webp',
    followers: 8000000,
    monthlyListeners: 22300000,
    tracks: 75, // Approximate
    bio: 'Rapper americano conhecido por seu single de 2019, "Ransom".',
    color: '#8A2BE2'
  },

];

export const TRACKS = [
  // Kelson Most Wanted
  { id: '1', title: 'Dias Melhores', artist: 'Kelson Most Wanted', album: 'Paradoxo', duration: 180, image: '/img/descarregar (19).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  
  // Central Cee
  { id: '4', title: 'Ungratful', artist: 'Central Cee', album: '23', duration: 165, image: '/img/OIP (15).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
 
  { id: '6', title: 'Loading', artist: 'Central Cee', album: 'Wild West', duration: 192, image: '/img/descarregar (21).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  
  // Travis Scott
  { id: '7', title: 'SICKO MODE', artist: 'Travis Scott', album: 'ASTROWORLD', duration: 312, image: '/img/OIP (13).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: '8', title: 'goosebumps', artist: 'Travis Scott', album: 'Birds in the Trap', duration: 240, image: '/img/avatars-000701366305-hu9f0i-t1080x1080.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: '9', title: 'Utopia', artist: 'Travis Scott', album: 'HIGHEST IN THE ROOM', duration: 172, image: '/img/descarregar (20).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  
  // Billie Eilish
 
  { id: '12', title: 'when the party\'s over', artist: 'Billie Eilish', album: 'When We All Fall Asleep, Where Do We Go?', duration: 196, image: '/img/descarregar (16).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id: '48', title: 'Happier Than Ever', artist: 'Billie Eilish', album: 'Happier Than Ever', duration: 298, image: '/img/images (5).jpeg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '49', title: 'Bad Guy (Single)', artist: 'Billie Eilish', album: 'Bad Guy', duration: 194, image: '/img/descarregar (17).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    
  // Drake
  { id: '23', title: 'God\'s Plan', artist: 'Drake', album: 'Scorpion', duration: 198, image: '/img/OIP (5).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '24', title: 'In My Feelings', artist: 'Drake', album: 'Scorpion', duration: 217, image: '/img/OIP (5).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: '25', title: 'One Dance', artist: 'Drake', album: 'Views', duration: 173, image: '/img/OIP (2).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: '50', title: 'Take Care', artist: 'Drake', album: 'Take Care', duration: 277, image: '/img/descarregar (10).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },

   // Imagine Dragons
  { id: '15', title: 'Believer', artist: 'Imagine Dragons', album: 'Evolve', duration: 204, image: '/img/descarregar (15).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '16', title: 'Thunder', artist: 'Imagine Dragons', album: 'Evolve', duration: 187, image: '/img/descarregar (15).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '17', title: 'Radioactive', artist: 'Imagine Dragons', album: 'Night Visions', duration: 187, image: '/img/descarregar (15).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  
  // Ariana Grande
  { id: '29', title: '7 rings', artist: 'Ariana Grande', album: 'Thank U, Next', duration: 178, image: '/img/descarregar (13).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id: '30', title: 'positions', artist: 'Ariana Grande', album: 'Positions', duration: 172, image: '/img/OIP (6).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  { id: '46', title: 'we can\'t be friends (wait for your love)', artist: 'Ariana Grande', album: 'Eternal Sunshine', duration: 229, image: '/img/descarregar (12).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
  { id: '47', title: 'thank u, next', artist: 'Ariana Grande', album: 'Thank U, Next', duration: 207, image: '/img/descarregar (13).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
  
  // Post Malone
  { id: '31', title: 'Circles', artist: 'Post Malone', album: 'Hollywood\'s Bleeding', duration: 215, image: '/img/descarregar (3).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id: '32', title: 'Sunflower', artist: 'Post Malone', album: 'Hollywood\'s Bleeding', duration: 158, image: '/img/descarregar (3).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  
  // Dua Lipa
  { id: '33', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, image: '/img/descarregar (24).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '34', title: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 183, image: '/img/descarregar (24).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  
  // Ed Sheeran
  { id: '35', title: 'Shape of You', artist: 'Ed Sheeran', album: '÷', duration: 233, image: '/img/OIP (17).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '36', title: 'Perfect', artist: 'Ed Sheeran', album: '÷', duration: 263, image: '/img/OIP (17).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  
  // Rihanna
  { id: '37', title: 'Umbrella', artist: 'Rihanna', album: 'Good Girl Gone Bad', duration: 276, image: '/img/descarregar (5).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: '38', title: 'Diamonds', artist: 'Rihanna', album: 'Unapologetic', duration: 220, image: '/img/descarregar (5).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  
  // Kendrick Lamar
  { id: '41', title: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', duration: 177, image: '/img/GettyImages-2196837244-cd59229199614d8da69e839d12e30909.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id: '42', title: 'Alright', artist: 'Kendrick Lamar', album: 'To Pimp a Butterfly', duration: 219, image: '/img/GettyImages-2196837244-cd59229199614d8da69e839d12e30909.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  
  // Lil Tecca
  { id: '43', title: 'Ransom', artist: 'Lil Tecca', album: 'We Love You Tecca', duration: 131, image: '/img/OIP (4).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id: '44', title: '500lbs', artist: 'Lil Tecca', album: 'TEC', duration: 144, image: '/img/OIP (4).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
  { id: '45', title: 'Lot of Me', artist: 'Lil Tecca', album: 'We Love You Tecca 2', duration: 123, image: '/img/OIP (4).webp', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },

];

export const PLAYLISTS = [
  {
    id: 'playlist-1',
    name: 'Top Hits 2025',
    description: 'As músicas mais tocadas agora',
    image: '/img/danny-howe-bn-D2bCvpik-unsplash.jpg',
    tracks: TRACKS.slice(0, 10),
    owner: 'Mônica & Amigos',
    public: true
  },
  {
    id: 'playlist-2',
    name: 'Rap Angolano',
    description: 'Os melhores do rap angolano',
    image: '/img/descarregar (19).webp',
    tracks: TRACKS.filter(t => t.artist === 'Kelson Most Wanted'),
    owner: 'Mônica & Amigos',
    public: true
  },
  {
    id: 'playlist-3',
    name: 'Kizomba Vibes',
    description: 'As melhores kizombas',
    image: '/img/ab676161000051742607a984fb9cbd6c734cfb9e.jpeg',
    tracks: TRACKS.filter(t => t.artist === 'Rui Malbreezy'),
    owner: 'Mônica & Amigos',
    public: true
  },
  {
    id: 'playlist-4',
    name: 'Pop Internacional',
    description: 'Os maiores hits pop',
    image: '/img/images (5).jpeg',
    tracks: TRACKS.filter(t => ['Billie Eilish', 'Xuxu Bower', 'Taylor Swift', 'Ariana Grande', 'Dua Lipa', 'Ed Sheeran', 'Rihanna', 'Bruno Mars'].includes(t.artist)),
    owner: 'Mônica & Amigos',
    public: true
  },
  {
    id: 'playlist-5',
    name: 'Hip-Hop Mundial',
    description: 'Os melhores do hip-hop',
    image: '/img/OIP (5).webp',
    tracks: TRACKS.filter(t => ['Drake', 'Travis Scott', 'Kendrick Lamar', 'Post Malone'].includes(t.artist)),
    owner: 'Mônica & Amigos',
    public: true
  },
  {
    id: 'playlist-6',
    name: 'Top Global',
    description: 'As músicas mais ouvidas mundialmente',
    image: '/img/taylor-swift.jpg',
    tracks: TRACKS.filter(t => ['Taylor Swift', 'The Weeknd', 'Bad Bunny', 'BTS'].includes(t.artist)),
    owner: 'Mônica & Amigos',
    public: true
  }
];

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getArtistById(id) {
  return ARTISTS.find(a => a.id === id);
}

export function getTracksByArtist(artistId) {
  const artist = getArtistById(artistId);
  return artist ? TRACKS.filter(t => t.artist === artist.name) : [];
}
