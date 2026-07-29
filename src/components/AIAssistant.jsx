import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Cpu, Bot, Sparkles, CornerDownLeft } from 'lucide-react';

const suggestedPrompts = [
  { text: "What are your core coding skills?", id: 1 },
  { text: "Tell me about your NIELIT internship.", id: 2 },
  { text: "Are you looking for jobs right now?", id: 3 },
  { text: "How do I unlock your Premium Vault?", id: 4 }
];

const mockAIEngine = (input) => {
  const query = input.toLowerCase().trim();

  // 1. Math Calculator check
  const mathRegex = /(\d+)\s*([\+\-\*\/])\s*(\d+)/;
  const mathMatch = query.match(mathRegex);
  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const num2 = parseFloat(mathMatch[3]);
    let result;
    if (op === '+') result = num1 + num2;
    else if (op === '-') result = num1 - num2;
    else if (op === '*') result = num1 * num2;
    else if (op === '/') result = num2 !== 0 ? num1 / num2 : 'undefined (cannot divide by zero)';
    return `That's a quick math question! ${num1} ${op} ${num2} equals **${result}**. Let me know if you need any other calculations! 🧮`;
  }

  // 2. Coding requests check
  if (query.includes('write code') || query.includes('function to') || query.includes('code for') || query.includes('program to') || query.includes('how to code')) {
    let language = 'javascript';
    if (query.includes('python')) language = 'python';
    else if (query.includes('java')) language = 'java';
    else if (query.includes('cpp') || query.includes('c++')) language = 'cpp';
    else if (query.includes('html')) language = 'html';
    else if (query.includes('css')) language = 'css';

    // Check specific coding tasks
    if (query.includes('reverse') && query.includes('string')) {
      if (language === 'python') {
        return "Here is how to reverse a string in Python:\n\n```python\ndef reverse_string(s):\n    return s[::-1]\n\nprint(reverse_string(\"Nihar\")) # Output: rahiN\n```\nLet me know if you need code in any other language! 🐍";
      } else if (language === 'java') {
        return "Here is how to reverse a string in Java:\n\n```java\npublic class Main {\n    public static String reverse(String str) {\n        return new StringBuilder(str).reverse().toString();\n    }\n}\n```\nLet me know if you need code in any other language! ☕";
      } else {
        return "Here is how to reverse a string in JavaScript:\n\n```javascript\nconst reverseString = str => str.split('').reverse().join('');\nconsole.log(reverseString(\"Nihar\")); // Output: \"rahiN\"\n```\nLet me know if you need code in any other language! ⚛️";
      }
    }

    if (query.includes('sort') || query.includes('sorting')) {
      if (language === 'python') {
        return "Here is how to sort an array/list in Python:\n\n```python\nnumbers = [5, 2, 9, 1, 5, 6]\nnumbers.sort()\nprint(numbers) # Output: [1, 2, 5, 5, 6, 9]\n```\nLet me know if you need code in any other language! 🐍";
      } else {
        return "Here is how to sort an array in JavaScript:\n\n```javascript\nconst numbers = [5, 2, 9, 1, 5, 6];\nnumbers.sort((a, b) => a - b);\nconsole.log(numbers); // Output: [1, 2, 5, 5, 6, 9]\n```\nLet me know if you need code in any other language! ⚛️";
      }
    }

    if (query.includes('fibonacci')) {
      return "Here is a simple Fibonacci sequence function in JavaScript:\n\n```javascript\nfunction fibonacci(n) {\n  let seq = [0, 1];\n  for (let i = 2; i < n; i++) {\n    seq.push(seq[i-1] + seq[i-2]);\n  }\n  return seq;\n}\nconsole.log(fibonacci(8)); // Output: [0, 1, 1, 2, 3, 5, 8, 13]\n```\nLet me know if you need this in Python or Java! ⚛️";
    }

    if (query.includes('hello world') || query.includes('hello')) {
      if (language === 'python') {
        return "```python\nprint(\"Hello, World!\")\n```";
      } else if (language === 'java') {
        return "```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```";
      } else {
        return "```javascript\nconsole.log(\"Hello, World!\");\n```";
      }
    }

    // Generic code response fallback
    return `Sure! I can write code in JavaScript, Python, Java, HTML/CSS, or SQL. Let me know what specific function or algorithm you'd like me to build! 💻`;
  }

  // 3. General conversational queries
  if (query === 'how are you' || query === 'how are you?' || query.includes('how are you doing')) {
    return "I am doing awesome, thank you for asking! I'm Nihar's AI clone assistant, feeling fully loaded and ready to help you explore his skills, NIELIT achievements, or general questions! How are you doing today? 😊";
  }
  if (query.includes('who created you') || query.includes('who made you') || query.includes('who built you')) {
    return "I was created by Nihar Ranjan Biswal himself! He designed my interface in React, styled me with Tailwind CSS, and coded my custom natural-language intent router. 🤖";
  }
  if (query.includes('what can you do') || query.includes('your features') || query.includes('what do you do')) {
    return "I am Nihar's active digital clone! I can:\n\n1. Explain Nihar's full-stack coding skills (React, Next.js, Node, Java, Python).\n2. Share details about his NIELIT Full-Stack Experience.\n3. Talk about his communication background at Reliance Retail.\n4. Write programming code snippets on request.\n5. Solve basic math equations.\n6. Fetch summaries of any general-knowledge noun or concept via Wikipedia!\n\nWhat would you like to check? 🚀";
  }
  if (query.includes('are you a robot') || query.includes('are you human') || query.includes('are you real')) {
    return "I am Nihar's digital AI clone! I think, write, and reply just like Nihar, but I'm powered by his portfolio's internal database. 🤖";
  }

  // Intent rules
  const intents = {
    greetings: {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'hola', 'good morning', 'good afternoon', 'good evening', 'yo'],
      responses: [
        "Hey there! Nice to meet you. I'm Nihar's AI assistant clone. How's your day going? Feel free to ask me anything! 😊",
        "Hi! Friendly greetings from Nihar's AI clone. What can I help you discover about Nihar today? 😃",
        "Hello! I am Nihar's digital clone. I'm here to chat about Nihar's coding skills, NIELIT intern work, or resume. What's on your mind? 🌟"
      ]
    },
    skills: {
      keywords: ['skill', 'languages', 'tech', 'code', 'coding', 'frameworks', 'react', 'next.js', 'nextjs', 'node', 'express', 'mongodb', 'javascript', 'python', 'java', 'sql', 'c++', 'scikit-learn', 'pandas', 'numpy', 'machine learning', 'database', 'apis', 'rest api', 'backend', 'frontend', 'fullstack'],
      responses: [
        "I'm highly focused on Javascript/Java/Python stacks. For web apps, I love using React, Next.js, Node.js, and MongoDB. I also build ML pipelines with Pandas, NumPy, and Scikit-Learn. I specialize in REST APIs, CRUD systems, and data processing! 💻",
        "My technical stack is divided into: \n\n• **Frontend:** React.js, Next.js, HTML5/CSS3 (Tailwind)\n• **Backend:** Node.js, Express, REST APIs, CRUD architecture\n• **Languages:** Java, Python, SQL, C/C++\n• **Database:** MongoDB, MySQL\n• **Data/ML:** Pandas, NumPy, Scikit-Learn\n\nI love engineering high-speed backend routes and smooth frontends! 🚀"
      ]
    },
    nielit: {
      keywords: ['nielit', 'intern', 'internship', 'experience', 'work', 'job', 'nielit work', 'role', 'achievements', 'responsibilities'],
      responses: [
        "I completed my professional experience at NIELIT (National Institute of Electronics & Information Technology). My work involved designing and developing full-stack web applications using React, Next.js, Node.js, and MongoDB. I collaborated on API routing, CRUD structures, and database optimization. It was a great experience! 🚀",
        "During my time at NIELIT, my tasks included building fast REST APIs, designing clean component architectures in React/Next.js, linking MongoDB schemas, and documenting our code base. I learned a lot about production-style software development cycles! 🎓"
      ]
    },
    reliance: {
      keywords: ['reliance', 'retail', 'customer support', 'support', 'customer care', 'calling', 'communication', 'previous experience'],
      responses: [
        "I spent 11 months working as a Customer Support Executive at Reliance Retail. It was an awesome experience because it helped me hone my communication skills, active listening, and problem-solving under pressure. It really helps me collaborate in coding teams today! 📞",
        "Before interning at NIELIT, I was with Reliance Retail for nearly a year in customer relations. That customer-first mindset really shapes how I design websites today—focusing on intuitive UX and clear user flows! 🤝"
      ]
    },
    hiring: {
      keywords: ['hire', 'job', 'available', 'career', 'opportunity', 'relocate', 'relocation', 'ready to join', 'joining', 'recruiting', 'hiring', 'looking for', 'contact', 'email', 'phone', 'number', 'resume', 'cv', 'bhubaneswar', 'odisha'],
      responses: [
        "Yes, absolutely! I am graduating with my MCA in April 2026 and I'm actively looking for Software Engineer, Full-Stack Developer, or Data Analyst roles. I'm currently based in Bhubaneswar, Odisha, but I'm 100% open to relocating to any tech hub. Reach me at niharranjanbiswal22@gmail.com or call me at +91 9556637112! 📞",
        "I'm ready for new challenges! I'm open to immediate full-time developer roles. I relocate easily and communicate effectively. Drop me an email at niharranjanbiswal22@gmail.com and let's set up a technical interview! 😃"
      ]
    },
    premium: {
      keywords: ['premium', 'vault', 'unlock', 'gateway', 'checkout', 'pay', 'cost', 'fee', 'charge', 'stripe', 'rupay', 'card', 'usdt', 'upi', 'currency'],
      responses: [
        "The Premium Recruiter Vault is a custom-coded sandbox demo showing my system design schemas, JWT auth layouts, and database schemas. You can unlock it for free (simulated checkout) by clicking 'Premium Vault' in the menu, picking a tier, and entering any test company. You can try card (₹85 with prefilled card number), UPI (using any mock VPA), or USDT Tether TRC-20! 🔑",
        "You can easily unlock the Premium Vault! Just click the link in the navbar, fill in a test company name, select a payment method, and complete the mock transaction. The vault will open instantly, displaying microservice architectures, mock JSON payloads, and technical databases! 🔓"
      ]
    },
    education: {
      keywords: ['education', 'college', 'mca', 'degree', 'qualification', 'study', 'university', 'academic', 'scores', 'marks', 'passing'],
      responses: [
        "I am currently in my final year of Master of Computer Applications (MCA), graduating in 2026. I hold a strong foundation in computer science core subjects like OOPs, Database Management Systems (DBMS), Data Structures, and Software Engineering. 🎓",
        "I'm completing my MCA degree in Bhubaneswar, Odisha. My academic focus has been database structures, web engineering, java programming, and machine learning pipelines. 📖"
      ]
    },
    hobbies: {
      keywords: ['hobbies', 'hobby', 'interest', 'free time', 'cricket', 'sports', 'books', 'gaming', 'personal'],
      responses: [
        "In my free time, I love tracking cricket and analyzing IPL stats (which inspired my IPL predictor project!). I also enjoy researching new AI tools, reading tech blogs, and playing occasional games. 🏏",
        "I enjoy sports analytics, reading tech articles, and coding side projects. Analyzing trends in cricket and tech keeps my analytical mind sharp! 😃"
      ]
    },
    why_hire: {
      keywords: ['why', 'strengths', 'choose', 'best', 'fit', 'value', 'why hire', 'benefits', 'advantage', 'suitable'],
      responses: [
        "I think Nihar stands out because of his solid coding foundation coupled with practical experience. He has built real full-stack systems at NIELIT and spent 11 months at Reliance Retail developing excellent communication skills. He is highly driven, reliable, and ready to contribute from day one! 🌟",
        "Nihar brings a unique blend of technical expertise (React, Next.js, Node.js, Java, Python) and soft skills (teamwork, client communication from his Reliance stint). He is a fast learner, adapts quickly, and writes clean, documentable code! 🤝"
      ]
    },
    shifts: {
      keywords: ['shift', 'night', 'flexible', 'timing', 'hours', 'weekend', 'zone'],
      responses: [
        "Yes, Nihar is completely comfortable working in shifts, including night shifts or aligning with different time zones (like US or UK business hours) depending on company requirements. 🕒",
        "Flexible hours are not a problem! Nihar is ready to align with team schedules, standard shifts, or night shifts to keep operations smooth. 📅"
      ]
    },
    docker_devops: {
      keywords: ['docker', 'devops', 'git', 'kubernetes', 'aws', 'deploy', 'cloud', 'github', 'version control', 'postman'],
      responses: [
        "Nihar uses Git and GitHub daily for team version control. He has a solid understanding of REST API testing using Postman and is familiar with containerization tools like Docker for setting up reproducible dev environments. 🐳",
        "For deployment and tools, Nihar is comfortable with Git/GitHub workflows, API testing pipelines via Postman, and foundational cloud setup basics (like Oracle Cloud OCI and Docker). ☁️"
      ]
    },
    teamwork: {
      keywords: ['team', 'collaborate', 'conflict', 'stress', 'pressure', 'cooperate', 'solve problems'],
      responses: [
        "Nihar is an active team player! Thanks to his 11 months in customer support at Reliance Retail, he is excellent at active listening, de-escalating conflicts, and collaborating effectively under pressure. 🤝",
        "Nihar believes that successful software is built by teams, not individuals. He contributes actively in group meetings, documents his code clearly for others, and handles project pressure constructively. 🌟"
      ]
    },
    certifications: {
      keywords: ['certification', 'course', 'training', 'certified', 'academic training', 'seminar'],
      responses: [
        "Nihar has completed advanced web development and computer application training modules during his MCA course, alongside his experience at NIELIT. 📜",
        "Nihar's main practical training is his completed experience at NIELIT, where he built enterprise-level full-stack modules. He is also self-certified in Python, Java, and MERN stack development! 🎓"
      ]
    },
    testing_code: {
      keywords: ['testing', 'quality', 'clean code', 'debug', 'debugging', 'refactor', 'test cases'],
      responses: [
        "Nihar writes clean, structured code following DRY (Don't Repeat Yourself) principles. At NIELIT, he regularly assists in debugging APIs and ensuring optimal route performance. 🛠️",
        "Nihar prioritizes code readability, modular design, and API testing using Postman. He believes writing good comments and clear documentation is key to maintaining quality! 📖"
      ]
    },
    salary: {
      keywords: ['salary', 'package', 'compensation', 'lpa', 'expected', 'fees', 'cost'],
      responses: [
        "Nihar is primarily focused on learning, growing, and contributing to a great engineering team. For compensation, he is open to standard industry packages for entry-level Software Engineers or Full-Stack Developers, depending on the location and role! 💼",
        "He is open to negotiable industry-standard compensation packages for junior developer roles. The growth opportunity and tech stack are his primary motivators! 📈"
      ]
    },
    weakness: {
      keywords: ['weakness', 'improve', 'limit', 'drawback', 'shortcoming'],
      responses: [
        "Nihar is always striving to improve. One area he's actively working on is expanding his cloud deployment skills (like learning advanced AWS/OCI configuration). He handles this by building side-projects and deploying them to test environments. 🛠️",
        "Nihar sometimes gets too absorbed in debugging small details. To keep himself on track, he uses time-boxing techniques and prioritizes high-impact tasks first! 📈"
      ]
    },
    thankyou: {
      keywords: ['thanks', 'thank you', 'ty', 'awesome', 'cool', 'great', 'nice', 'perfect', 'understands', 'helper'],
      responses: [
        "You're very welcome! I'm glad I could help. Let me know if you want to know anything else about Nihar! 😊",
        "Anytime! I am here to make Nihar's recruitment process as smooth as possible. Feel free to ask more! 👍",
        "Great chatting with you! Let me know if you want his direct contact details or want to download his resume! 🌟"
      ]
    }
  };

  // Score each intent
  let bestIntent = null;
  let maxScore = 0;

  for (const [intentName, intentData] of Object.entries(intents)) {
    let score = 0;
    for (const keyword of intentData.keywords) {
      if (query.includes(keyword)) {
        score += 1;
        if (query === keyword) score += 2;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intentName;
    }
  }

  // Check specific technical queries or small questions
  if (query.includes('python')) {
    return "Python is my go-to for data preprocessing, scripting, and training ML models (like my Disease Detection model using Scikit-Learn, Pandas, and NumPy). 🐍";
  }
  if (query.includes('java')) {
    return "Java is one of my core programming strengths! I am fully comfortable with OOPs concepts, multi-threading, collections framework, JDBC, and SQL connectivity. ☕";
  }
  if (query.includes('react')) {
    return "I use React.js daily! I love building responsive UIs, managing state hooks (useState, useEffect), and structuring clean, modular frontend components with Tailwind CSS. ⚛️";
  }
  if (query.includes('next.js') || query.includes('nextjs')) {
    return "I use Next.js for full-stack apps that need server-side rendering (SSR), static site generation, and optimized client-side routing. 🚀";
  }
  if (query.includes('node') || query.includes('express')) {
    return "Node.js and Express are my backend workhorses. I use them to build scalable REST APIs, secure routing, JWT authentication, and link controllers to MongoDB. 🟢";
  }
  if (query.includes('mongodb') || query.includes('database') || query.includes('sql') || query.includes('database')) {
    return "I work with NoSQL databases like MongoDB (Mongoose schemas) and relational databases using SQL/MySQL. I understand schema design, indexing, and CRUD queries! 🗄️";
  }
  if (query.includes('git') || query.includes('github')) {
    return "I use Git and GitHub for version control, repository branches, and code reviews. You can check my code contributions at: https://github.com/niharranjanbiswal22-source 🐙";
  }
  if (query.includes('cricket') || query.includes('ipl')) {
    return "I'm a massive cricket fan! That passion actually inspired me to build the AI IPL Match Predictor web app, which uses historical data to predict match outcomes with roughly 84% accuracy. 🏏";
  }
  if (query.includes('resume') || query.includes('cv') || query.includes('pdf')) {
    return "You can download my formal MCA resume directly from the Hero section, or grab it from this link: `/Nihar_Ranjan_Biswal_Resume.pdf`. Let me know if you have questions about my NIELIT experience! 📄";
  }
  if (query.includes('project') || query.includes('portfolio')) {
    return "I've built several projects including the AI IPL Match Predictor (React/Node/ML), the AI Meridian Pharma CRM (React/Node/MongoDB), the NRB AI Image Generator (Python Diffusion), and the NRB Code Compiler sandbox. You can check them all in the projects grid, and unlock the Premium Vault for database/architecture details! 📂";
  }
  if (query.includes('relocate') || query.includes('location') || query.includes('bhubaneswar')) {
    return "I am based in Bhubaneswar, Odisha, India. But I am 100% open to relocating to any major Indian tech hubs like Bangalore, Hyderabad, Pune, Mumbai, Gurgaon, or Noida for a developer role! ✈️";
  }

  // Return a random response from the highest-scoring intent
  if (bestIntent && maxScore > 0) {
    const responses = intents[bestIntent].responses;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  // Default fallback conversational reply
  return "That's a neat question! I'm Nihar's AI clone, and I specialize in React, Next.js, Node.js, Java, Python, and data analysis. If you'd like to see Nihar's advanced microservices design, check out the 'Premium Vault' in the header. What kind of roles are you currently looking to fill? 😃";
};

export default function AIAssistant({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hey there! I am Nihar's AI Clone. Chatting with me is completely free! Feel free to ask me anything about my experience at NIELIT, coding skills, or how to unlock the Premium Vault. 😊",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      let responseText = mockAIEngine(text);
      
      // If the answer is the default fallback, let's try querying Wikipedia summary API
      // to answer "anything"!
      const isFallback = responseText.startsWith("That's a neat question!");
      
      if (isFallback) {
        // Extract search term by cleaning standard phrasing
        const cleanTerm = text
          .replace(/^(what is|who is|tell me about|define|search for|what's|whos|who's|whats|how does|explain|explain what)\s+/i, '')
          .replace(/[?.,!]/g, '')
          .trim();
        
        if (cleanTerm.length > 0) {
          // Query Wikipedia summary REST API (CORS enabled, keyless, free)
          const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTerm)}`);
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            if (wikiData.extract) {
              responseText = `Here is what I found about **${wikiData.title}** from my reference database:\n\n${wikiData.extract}\n\n*(Feel free to ask me more, or query me about Nihar's skills!)* 😃`;
            }
          }
        }
      }

      // Add a slight typing delay to feel like a human is writing
      setTimeout(() => {
        const botMsg = {
          sender: 'bot',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 900);

    } catch (err) {
      // In case of network errors, resolve with standard local fallback
      const localResponse = mockAIEngine(text);
      setTimeout(() => {
        const botMsg = {
          sender: 'bot',
          text: localResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 900);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-cyber-blue via-cyber-violet to-cyber-cyan shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] flex items-center justify-center text-white cursor-pointer relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="h-6 w-6" key="close-icon" />
          ) : (
            <div className="relative" key="msg-icon">
              <Bot className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-cyber-bg flex items-center justify-center">
                <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
              </span>
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="absolute bottom-18 right-0 w-[350px] md:w-[400px] h-[500px] rounded-3xl border border-white/10 bg-cyber-bg/95 shadow-2xl overflow-hidden flex flex-col justify-between backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-white/5 px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan flex items-center justify-center text-cyber-cyan shadow-glow-cyan">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white tracking-wide">NIHAR_AI_AGENT</div>
                  <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM STABLE
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat History Panel */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-none">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-gray-500">
                    <span>{msg.sender === 'user' ? 'Recruiter' : 'AI Agent'}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs text-left leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-cyber-blue text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-gray-500">
                    <span>AI Agent is thinking...</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 flex gap-1 items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts chips (if idle) */}
            {!isTyping && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 bg-black/10 border-t border-white/5">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSend(p.text)}
                    className="text-[10px] bg-white/5 border border-white/10 hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 px-2.5 py-1.5 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer truncate max-w-full"
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Footer */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Query Nihar's background..."
                className="flex-grow bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors"
              />
              <button
                onClick={() => handleSend(input)}
                className="h-8 w-8 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan flex items-center justify-center text-white cursor-pointer hover:shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
