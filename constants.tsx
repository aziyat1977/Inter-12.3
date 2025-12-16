import React from 'react';
import { SlideData, SlideType } from './types';
import { 
  Globe, 
  Music, 
  Utensils, 
  ShieldAlert, 
  BrainCircuit, 
  Mic,
  Camera,
  AlertTriangle
} from 'lucide-react';

// Helper for consistent icon styling across themes
const IconStyle = "w-12 h-12 text-brand-accent";

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "THE SOFT POWER EFFECT",
    subtitle: "How Nations Win Without War. (Or... Why you know 'Gangnam Style')",
    content: <div className="flex justify-center gap-6 mt-12 opacity-90">
      <Globe className="w-16 h-16 text-brand-accent drop-shadow-lg" />
      <Music className="w-16 h-16 text-brand-secondary drop-shadow-lg" />
      <Utensils className="w-16 h-16 text-brand-highlight drop-shadow-lg" />
    </div>,
    speakerNotes: [
      "Welcome, guys. Today isn't about grammar.",
      "It's about influence. It's about how to win without fighting."
    ],
    image: "https://picsum.photos/seed/kpop/1200/800"
  },
  {
    id: 2,
    type: SlideType.HOOK,
    title: "The Hook",
    subtitle: "Did they pay you to listen? NO. Did their army force you to dance? NO.",
    content: <div className="text-3xl md:text-5xl font-bold text-center mt-8 text-slate-800 dark:text-slate-100">So... why do we all know this song?</div>,
    image: "https://picsum.photos/seed/dance/800/600",
    visualNotes: "A large GIF or image of PSY doing the 'Gangnam Style' horse dance.",
    speakerNotes: [
      "(Do the dance move for 3 seconds).",
      "Why do we know this? Why do we watch K-Dramas? Why is this guy on my screen?"
    ]
  },
  {
    id: 3,
    type: SlideType.SPLIT,
    title: "HARD POWER vs. SOFT POWER",
    splitLeft: (
      <div className="flex flex-col items-center p-8 bg-red-100 dark:bg-red-900/20 rounded-3xl border-2 border-red-500/30 h-full shadow-xl">
        <ShieldAlert className="w-20 h-20 text-red-600 dark:text-red-500 mb-6" />
        <h3 className="text-4xl font-black text-red-600 dark:text-red-400 mb-6">HARD POWER 👊</h3>
        <ul className="text-2xl space-y-6 text-center text-red-900 dark:text-red-100 font-semibold">
          <li>Military</li>
          <li>Politics</li>
          <li>Money</li>
        </ul>
        <div className="mt-auto pt-8 text-3xl font-serif italic text-red-800 dark:text-red-200">"You MUST do this."</div>
      </div>
    ),
    splitRight: (
      <div className="flex flex-col items-center p-8 bg-blue-100 dark:bg-blue-900/20 rounded-3xl border-2 border-blue-500/30 h-full shadow-xl">
        <BrainCircuit className="w-20 h-20 text-blue-600 dark:text-blue-500 mb-6" />
        <h3 className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-6">SOFT POWER 🧠</h3>
        <ul className="text-2xl space-y-6 text-center text-blue-900 dark:text-blue-100 font-semibold">
          <li>Music</li>
          <li>Food</li>
          <li>Culture</li>
        </ul>
        <div className="mt-auto pt-8 text-3xl font-serif italic text-blue-800 dark:text-blue-200">"You WANT to do this."</div>
      </div>
    ),
    speakerNotes: [
      "Hard power is forcing people.",
      "Soft power is making people fall in love with you.",
      "Korea is the King of Soft Power."
    ]
  },
  {
    id: 4,
    type: SlideType.STANDARD,
    title: "What is Uzbekistan's Soft Power? 🇺🇿",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
        {['Samarkand / Registan?', 'Plov?', 'Boxing?', 'Otabek Shukurov?', 'Hospitality?'].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-l-8 border-brand-accent hover:scale-105 transition-transform flex items-center gap-6">
             <div className="w-4 h-4 rounded-full bg-brand-accent"></div>
             <span className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{item}</span>
          </div>
        ))}
      </div>
    ),
    image: "https://picsum.photos/seed/uzbek/800/600",
    speakerNotes: [
      "Does Uzbekistan have Soft Power?",
      "What makes foreigners say 'Wow'?",
      "Is it our cars? Probably not. Is it our food? Definitely."
    ]
  },
  {
    id: 5,
    type: SlideType.TIMER,
    title: "The 60-Second Race ⏱️",
    subtitle: "Find these 3 things in the text:",
    content: (
      <ul className="list-decimal list-inside text-2xl md:text-4xl space-y-6 bg-white dark:bg-slate-800/50 p-8 rounded-3xl shadow-xl inline-block text-left text-slate-800 dark:text-slate-200">
        <li>The Korean name for the "Korean Wave".</li>
        <li>The song that broke YouTube records.</li>
        <li>The name of the TV drama mentioned.</li>
      </ul>
    ),
    durationSeconds: 60,
    speakerNotes: [
      "You have the text in front of you.",
      "Don't read every word. Scan!",
      "You have 60 seconds."
    ]
  },
  {
    id: 6,
    type: SlideType.REVEAL_LIST,
    title: "The Winners 🏆",
    subtitle: "Question: Does Soft Power use politics? Answer: NO. It uses culture.",
    checklistItems: [
      "Hallyu (The Korean Wave)",
      "Gangnam Style (PSY)",
      "Jumong (The Historical Drama)"
    ],
    speakerNotes: [
      "Who got all three? Perfect.",
      "Notice: Politics is boring. Soft power is interesting."
    ]
  },
  {
    id: 7,
    type: SlideType.STANDARD,
    title: "The Grammar Burger 🍔",
    subtitle: "English sentences are like burgers.",
    content: (
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center mt-12 w-full">
        <div className="text-center opacity-60 transform scale-90">
          <div className="text-8xl mb-6">🥯</div>
          <h3 className="text-3xl font-bold text-slate-600 dark:text-slate-400">The Slider</h3>
          <p className="text-xl text-slate-500">Small, simple, boring.</p>
        </div>
        <div className="text-6xl text-brand-accent font-black">vs</div>
        <div className="text-center transform scale-110 p-10 bg-brand-highlight/10 dark:bg-brand-highlight/5 rounded-3xl border-4 border-brand-highlight shadow-2xl shadow-brand-highlight/20">
          <div className="text-9xl mb-6 drop-shadow-xl">🍔</div>
          <h3 className="text-5xl font-black text-brand-highlight mb-4">The Big Mac</h3>
          <p className="text-3xl text-slate-700 dark:text-slate-200 font-bold">Huge, complex, delicious.</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "Stop writing small sentences.",
      "Today we are cooking Big Macs."
    ]
  },
  {
    id: 8,
    type: SlideType.STANDARD,
    title: "The Formula",
    subtitle: "Complex Noun Phrases (The Big Mac)",
    content: (
      <div className="mt-8 space-y-8 w-full max-w-5xl">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
          <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">The Slider (Small)</div>
          <div className="text-2xl md:text-4xl text-slate-800 dark:text-slate-200">
            <span className="text-brand-secondary font-black">Korea</span> + <span className="text-brand-accent font-black">changed</span> + <span className="opacity-70">its image.</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-4 border-brand-highlight shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-highlight text-brand-dark font-bold px-4 py-1 rounded-bl-lg">BIG MAC MODE</div>
          <div className="text-sm font-bold uppercase tracking-widest text-brand-highlight mb-4">The Big Mac (Huge)</div>
          <div className="text-3xl md:text-5xl leading-relaxed text-slate-800 dark:text-slate-200">
            <span className="text-brand-secondary font-black border-b-4 border-brand-secondary">Since the 1990s, a new wave of Korean culture called Hallyu</span> + <span className="text-brand-accent font-black">changed</span> + <span className="opacity-70">its image.</span>
          </div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center text-2xl italic text-slate-600 dark:text-slate-400">
          👉 Rule: The "Subject" can be 10 words long!
        </div>
      </div>
    ),
    speakerNotes: [
      "Look at the red part. That is ALL the subject.",
      "It includes time, names, and descriptions.",
      "Everything before the verb is the meat."
    ]
  },
  {
    id: 9,
    type: SlideType.INPUT_EXERCISE,
    title: "Make it a Big Mac 👨‍🍳",
    subtitle: "Expand the sentences using the formula.",
    inputPrompts: [
      "The ________ phone that I ________ is expensive.",
      "The ________ student who ________ passed."
    ],
    speakerNotes: [
      "Don't just say 'The black phone'.",
      "Say 'The black phone I bought at Malika Bazaar yesterday...'"
    ]
  },
  {
    id: 10,
    type: SlideType.STANDARD,
    title: "Married Words 💍",
    subtitle: "(Dependent Prepositions)",
    content: (
      <div className="flex flex-col items-center gap-12 mt-12">
        {/* Animated Heart Icon */}
        <div className="relative">
           <div className="absolute inset-0 bg-brand-secondary blur-3xl opacity-20 animate-pulse"></div>
           <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-secondary relative z-10 animate-bounce"><path d="M19 14c1.49-1.28 3.6-2.34 4.58-4.25a5.5 5.5 0 0 0-3.5-7.85c-1.8-.45-3.6.43-4.8 1.94-1.2-1.51-3-2.39-4.8-1.94a5.5 5.5 0 0 0-3.5 7.85c.98 1.91 3.09 2.97 4.58 4.25L12 21.35z"></path></svg>
        </div>
        <div className="text-3xl md:text-5xl text-center max-w-4xl font-light text-slate-700 dark:text-slate-200">
          <p className="mb-6">Some words in English are a couple. They go everywhere together.</p>
          <p className="text-brand-secondary font-black transform scale-110">If you separate them, they die. 💔</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "You cannot translate these from Russian or Uzbek.",
      "You have to learn the couple."
    ]
  },
  {
    id: 11,
    type: SlideType.DRILL,
    title: "The Drill (MFP)",
    drillPairs: [
      { term: "Rely", partner: "ON" },
      { term: "Succeed", partner: "IN" },
      { term: "Famous", partner: "FOR" },
      { term: "Afraid", partner: "OF" },
      { term: "Interested", partner: "IN" },
      { term: "Listen", partner: "TO" },
    ],
    speakerNotes: [
      "(Choral Drill) 'I say RELY, you say ON! Rely! (ON!) Succeed! (IN!).'"
    ]
  },
  {
    id: 12,
    type: SlideType.STANDARD,
    title: "The Danger Zone ⚠️",
    content: (
      <div className="flex flex-col items-center gap-8 mt-8 w-full max-w-4xl">
        <AlertTriangle className="w-32 h-32 text-red-500 animate-pulse" />
        <div className="w-full space-y-6">
          <div className="p-8 bg-red-100 dark:bg-red-900/30 border-2 border-red-500/50 rounded-2xl flex items-center gap-6">
             <span className="text-6xl">❌</span>
             <span className="text-3xl md:text-4xl text-slate-800 dark:text-red-100 line-through decoration-4 decoration-red-500">"I am good in math."</span>
          </div>
          <div className="p-8 bg-green-100 dark:bg-green-900/30 border-2 border-green-500/50 rounded-2xl flex flex-col gap-4">
             <div className="flex items-center gap-6">
               <span className="text-6xl">✅</span>
               <span className="text-3xl md:text-5xl text-slate-800 dark:text-green-100 font-bold">"I am good <span className="text-brand-highlight text-6xl md:text-7xl animate-bounce inline-block mx-2">AT</span> math."</span>
             </div>
             <div className="pl-24 text-slate-500 dark:text-slate-400 text-2xl">"I am good AT PubG."</div>
             <div className="pl-24 text-slate-500 dark:text-slate-400 text-2xl">"I am good AT cooking."</div>
          </div>
        </div>
      </div>
    ),
    speakerNotes: [
      "I know you want to say 'in'. 'Xorosh v', '...da yaxshi'.",
      "But in English, for skills, it is ALWAYS AT."
    ]
  },
  {
    id: 13,
    type: SlideType.QUIZ,
    title: "Preposition Pong 🏓",
    quizData: [
      { question: "My city is famous _____ history.", options: ["AT", "FOR", "IN", "ON"], correct: "FOR" },
      { question: "You can rely _____ me.", options: ["TO", "WITH", "ON", "AT"], correct: "ON" },
      { question: "I am worried _____ the IELTS exam.", options: ["ABOUT", "FOR", "OF", "WITH"], correct: "ABOUT" },
      { question: "She is good _____ taking photos.", options: ["IN", "ON", "AT", "BY"], correct: "AT" },
    ],
    speakerNotes: [
      "Shout the answers. Go!"
    ]
  },
  {
    id: 14,
    type: SlideType.STANDARD,
    title: "Mission: Soft Power 🎙️",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 w-full max-w-6xl">
        <div className="bg-brand-secondary/10 dark:bg-brand-secondary/20 p-10 rounded-3xl border-2 border-brand-secondary/50 flex flex-col items-center text-center shadow-xl">
          <Globe className="w-24 h-24 text-brand-secondary mb-6" />
          <h3 className="text-3xl font-black mb-4 text-slate-800 dark:text-white">Your Role</h3>
          <div className="text-3xl text-brand-secondary font-bold">Minister of Soft Power for Uzbekistan 🇺🇿</div>
          <p className="mt-6 text-xl opacity-75 text-slate-700 dark:text-slate-300">Goal: Convince them Uzbekistan is the coolest place on Earth.</p>
        </div>
        <div className="bg-slate-200 dark:bg-slate-700/20 p-10 rounded-3xl border-2 border-slate-400 dark:border-slate-600 flex flex-col items-center text-center shadow-xl">
          <Mic className="w-24 h-24 text-slate-500 dark:text-slate-400 mb-6" />
          <h3 className="text-3xl font-black mb-4 text-slate-800 dark:text-white">Partner's Role</h3>
          <div className="text-3xl text-slate-600 dark:text-slate-300 font-bold">A bored foreign reporter 😒</div>
          <p className="mt-6 text-xl opacity-75 text-slate-700 dark:text-slate-300">Goal: Listen, look bored, then be impressed.</p>
        </div>
      </div>
    ),
    speakerNotes: [
      "You have a job. Sell our country. Make them want to visit."
    ]
  },
  {
    id: 15,
    type: SlideType.CHECKLIST,
    title: "The Checklist",
    subtitle: "Your speech must include:",
    checklistItems: [
      "3 'Married Words' (famous for, good at, interested in...)",
      "1 'Big Mac' Subject (e.g., 'The delicious plov cooked by...')",
      "Preparation Time: 3 Minutes"
    ],
    speakerNotes: [
      "Write your notes now. Don't write a full script, just key words.",
      "Make sure you have your Big Mac subject!"
    ]
  },
  {
    id: 16,
    type: SlideType.TIMER,
    title: "ACTION! 🎬",
    subtitle: "TALK TO YOUR PARTNER.",
    content: (
      <div className="text-4xl text-center space-y-8 mb-8 font-bold text-slate-800 dark:text-slate-100">
        <div className="p-4 bg-brand-secondary/20 rounded-xl">Minister: Sell the country!</div>
        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-xl text-slate-500">Reporter: Listen closely (and take notes).</div>
      </div>
    ),
    durationSeconds: 420, // 7 minutes
    speakerNotes: [
      "(Teacher circulates and listens for errors. Do not interrupt)."
    ]
  },
  {
    id: 17,
    type: SlideType.FEEDBACK,
    title: "Feedback & Ninja Grammar",
    subtitle: "Reporter, tell me about the Minister.",
    content: (
      <div className="space-y-8 mt-8 w-full max-w-5xl text-2xl md:text-4xl">
         <div className="flex items-start gap-4">
            <div className="bg-brand-secondary text-brand-dark font-bold p-8 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-2/3 shadow-lg">
              <div className="text-lg uppercase tracking-widest opacity-70 mb-2">Minister said:</div>
              "Uzbekistan is famous for gold."
            </div>
         </div>
         <div className="flex items-start gap-4 flex-row-reverse">
            <div className="bg-brand-accent text-brand-dark font-bold p-8 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl w-2/3 shadow-lg">
              <div className="text-lg uppercase tracking-widest opacity-70 mb-2">Reporter says:</div>
              "He said that Uzbekistan <span className="underline decoration-8 decoration-brand-dark">WAS</span> famous for gold."
            </div>
         </div>
      </div>
    ),
    speakerNotes: [
      "Stop! Reporters, tell me. What did they say?",
      "Notice... when we report, we go back in time."
    ]
  },
  {
    id: 18,
    type: SlideType.STANDARD,
    title: "Reported Speech Rules",
    subtitle: "REPORTING = TIME TRAVEL ⏳",
    content: (
      <div className="w-full max-w-5xl mt-8">
        <p className="text-center text-3xl mb-10 text-slate-600 dark:text-slate-300">When you report what someone said, shift the tense back.</p>
        <div className="grid grid-cols-2 gap-1 bg-slate-300 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
           <div className="bg-slate-200 dark:bg-slate-800 p-6 font-black text-center text-brand-secondary text-2xl uppercase tracking-widest">DIRECT SPEECH</div>
           <div className="bg-slate-200 dark:bg-slate-800 p-6 font-black text-center text-brand-accent text-2xl uppercase tracking-widest">REPORTED SPEECH</div>
           
           <div className="bg-white dark:bg-slate-900/50 p-8 flex justify-center items-center text-2xl md:text-4xl text-slate-700 dark:text-slate-200">"I am happy."</div>
           <div className="bg-white dark:bg-slate-900/50 p-8 flex justify-center items-center text-2xl md:text-4xl text-slate-700 dark:text-slate-200">She said she <span className="text-brand-accent font-black ml-3">WAS</span> happy.</div>

           <div className="bg-white dark:bg-slate-900/50 p-8 flex justify-center items-center text-2xl md:text-4xl text-slate-700 dark:text-slate-200">"We have plov."</div>
           <div className="bg-white dark:bg-slate-900/50 p-8 flex justify-center items-center text-2xl md:text-4xl text-slate-700 dark:text-slate-200">He said they <span className="text-brand-accent font-black ml-3">HAD</span> plov.</div>

           <div className="bg-white dark:bg-slate-900/50 p-8 flex justify-center items-center text-2xl md:text-4xl text-slate-700 dark:text-slate-200">"I can help."</div>
           <div className="bg-white dark:bg-slate-900/50 p-8 flex justify-center items-center text-2xl md:text-4xl text-slate-700 dark:text-slate-200">She said she <span className="text-brand-accent font-black ml-3">COULD</span> help.</div>
        </div>
      </div>
    ),
    speakerNotes: [
      "Present becomes Past. Can becomes Could. It's like history."
    ]
  },
  {
    id: 19,
    type: SlideType.HOMEWORK,
    title: "Homework Challenge 🏠",
    subtitle: "Take a photo of one object in your house that gives you 'Soft Power' (Guitar? Books? PC?).",
    checklistItems: [
      "Write 3 sentences about it.",
      "Constraint: You MUST use:",
      "-> Proud of",
      "-> Good at",
      "-> Interested in"
    ],
    content: <Camera className="w-32 h-32 text-brand-accent mt-8 opacity-50 animate-bounce" />,
    speakerNotes: [
      "See you next class. Don't forget your married words!"
    ]
  }
];