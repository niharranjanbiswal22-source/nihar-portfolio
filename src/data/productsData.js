import { 
  BookOpen, FileText, Brain, Globe, Layout, TrendingUp, 
  Smartphone, Code2, Layers, Cloud, Play, ShieldCheck, Sparkles, Zap
} from 'lucide-react';

export const productCategories = [
  {
    id: 'notes',
    title: 'Category 1: Handwritten & Study Notes',
    shortTitle: 'Study Notes',
    badge: '₹1 Special',
    tagline: 'Comprehensive study notes, cheat sheets & interview guides',
    priceLabel: 'Only ₹1 Each',
    items: [
      {
        id: 'notes-webdev',
        title: 'Full-Stack Web Dev Mastery Notes',
        shortName: 'Full-Stack Web Notes',
        price: 1,
        category: 'Notes',
        icon: BookOpen,
        logoSrc: '/icons/react.svg',
        color: 'from-blue-500 to-cyan-400',
        badge: 'Best Seller',
        description: 'Complete handwritten and structured notes covering HTML5, CSS3, JavaScript ES6+, React 19, Node.js, Express, and REST APIs.',
        deliverable: '200+ Pages Comprehensive PDF + Interview Q&As',
        techLogos: [
          { name: 'React', src: '/icons/react.svg' },
          { name: 'JavaScript', src: '/icons/javascript.svg' },
          { name: 'Node.js', src: '/icons/store/nodejs.svg' },
          { name: 'HTML5', src: '/icons/html5.svg' }
        ],
        features: ['HTML/CSS/JS Core', 'React 19 & Hooks', 'Node & Express APIs', 'Top 50 Interview Questions']
      },
      {
        id: 'notes-dsa',
        title: 'DSA in Java & Python Complete Notes',
        shortName: 'DSA Complete Notes',
        price: 1,
        category: 'Notes',
        icon: FileText,
        logoSrc: '/icons/store/java.svg',
        color: 'from-cyan-400 to-teal-400',
        badge: 'Top Rated',
        description: 'Visual Data Structures & Algorithms cheat sheets covering Arrays, Linked Lists, Trees, Graphs, Dynamic Programming & Big-O notation.',
        deliverable: '150+ Pages Visual Guide + 100 Solved LeetCode Problems',
        techLogos: [
          { name: 'Java', src: '/icons/store/java.svg' },
          { name: 'Python', src: '/icons/python.svg' },
          { name: 'LeetCode', src: '/icons/store/leetcode.svg' },
          { name: 'C++', src: '/icons/cplusplus.svg' }
        ],
        features: ['Big-O Cheat Sheet', 'Trees & Graph Visuals', 'DP Patterns', '100 Solved LeetCode Code']
      },
      {
        id: 'notes-ai-ml',
        title: 'AI & Machine Learning Engineering Notes',
        shortName: 'AI & ML Notes',
        price: 1,
        category: 'Notes',
        icon: Brain,
        logoSrc: '/icons/tensorflow.svg',
        color: 'from-purple-500 to-pink-500',
        badge: 'Trending',
        description: 'Deep dive into Machine Learning algorithms: Linear Regression, Decision Trees, Random Forests, Neural Networks, Pandas & Scikit-Learn.',
        deliverable: 'Machine Learning Workflow PDF + Jupyter Notebook Templates',
        techLogos: [
          { name: 'TensorFlow', src: '/icons/tensorflow.svg' },
          { name: 'Python', src: '/icons/python.svg' },
          { name: 'PyTorch', src: '/icons/pytorch.svg' },
          { name: 'Scikit-Learn', src: '/icons/store/scikitlearn.svg' }
        ],
        features: ['Pandas & NumPy Guide', 'Scikit-Learn Workflows', 'Neural Networks 101', 'Model Evaluation Formulas']
      }
    ]
  },
  {
    id: 'source-codes',
    title: 'Category 2: Production Source Codes',
    shortTitle: 'Source Codes',
    badge: '₹10 - ₹499',
    tagline: 'Ready-to-deploy web applications & mobile codebases',
    priceLabel: '₹10 to ₹500',
    items: [
      // Website Source Codes (₹10 to ₹50)
      {
        id: 'src-portfolio',
        title: 'Cyber Portfolio & AI Chatbot Source Code',
        shortName: 'Cyber Portfolio Code',
        price: 29,
        type: 'Website',
        category: 'Source Code',
        icon: Globe,
        logoSrc: '/icons/react.svg',
        color: 'from-amber-400 to-orange-500',
        badge: 'Website (₹29)',
        description: 'Full source code of this modern futuristic cyber developer portfolio built with React 19, Vite, Tailwind CSS, Framer Motion & AI Bot.',
        deliverable: 'Complete GitHub Source Code (.zip) + Deployment Guide',
        techLogos: [
          { name: 'React 19', src: '/icons/react.svg' },
          { name: 'Vite', src: '/icons/store/vite.svg' },
          { name: 'Tailwind CSS', src: '/icons/store/tailwindcss.svg' },
          { name: 'ChatGPT AI', src: '/icons/ai/chatgpt.svg' }
        ],
        features: ['React 19 + Vite + Tailwind', 'Framer Motion Animations', 'Interactive AI Clone Bot', 'Dark/Light HUD Modes']
      },
      {
        id: 'src-crm',
        title: 'AI Meridian Pharma CRM Web App Source Code',
        shortName: 'Pharma CRM Web Code',
        price: 39,
        type: 'Website',
        category: 'Source Code',
        icon: Layout,
        logoSrc: '/icons/mongodb.svg',
        color: 'from-emerald-400 to-green-500',
        badge: 'Website (₹39)',
        description: 'Full-stack enterprise CRM with customer order management, automated PDF invoice generation, role-based auth, and MongoDB backend.',
        deliverable: 'Frontend + Backend Codebase + DB Mock Seeder',
        techLogos: [
          { name: 'MongoDB', src: '/icons/mongodb.svg' },
          { name: 'Node.js', src: '/icons/store/nodejs.svg' },
          { name: 'React', src: '/icons/react.svg' },
          { name: 'JavaScript', src: '/icons/javascript.svg' }
        ],
        features: ['React + Node + Express', 'MongoDB Atlas Schema', 'PDF Invoice Generator', 'Analytics Charts & Dashboard']
      },
      {
        id: 'src-predictor',
        title: 'AI IPL Match Predictor & ML Model Code',
        shortName: 'IPL AI Predictor Code',
        price: 49,
        type: 'Website',
        category: 'Source Code',
        icon: TrendingUp,
        logoSrc: '/icons/python.svg',
        color: 'from-rose-500 to-red-500',
        badge: 'Website (₹49)',
        description: 'End-to-end Machine Learning web application with Scikit-Learn trained predictor model, React UI, and real-time win probability calculation.',
        deliverable: 'Pre-trained .pkl Model + Flask/Node API + React UI',
        techLogos: [
          { name: 'Python', src: '/icons/python.svg' },
          { name: 'Scikit-Learn', src: '/icons/store/scikitlearn.svg' },
          { name: 'React', src: '/icons/react.svg' },
          { name: 'Node.js', src: '/icons/store/nodejs.svg' }
        ],
        features: ['Scikit-Learn ML Model', 'Real-Time Win % Engine', 'Ball-by-Ball Simulator', 'Interactive Match UI']
      },
      // Application / Mobile App Source Codes (₹50 to ₹500)
      {
        id: 'src-ecommerce-app',
        title: 'React Native Mobile E-Commerce App Code',
        shortName: 'E-Commerce Mobile App',
        price: 99,
        type: 'Mobile App',
        category: 'Source Code',
        icon: Smartphone,
        logoSrc: '/icons/store/android.svg',
        color: 'from-blue-500 to-indigo-600',
        badge: 'Mobile App (₹99)',
        description: 'Full cross-platform iOS & Android mobile shopping application with cart, payment gateway integration, categories, and Firebase authentication.',
        deliverable: 'Full React Native Codebase + APK Build + Setup Docs',
        techLogos: [
          { name: 'React Native', src: '/icons/react.svg' },
          { name: 'Android', src: '/icons/store/android.svg' },
          { name: 'Apple iOS', src: '/icons/store/apple.svg' },
          { name: 'Razorpay', src: '/icons/store/razorpay.svg' }
        ],
        features: ['iOS & Android Compatible', 'Cart & Wishlist Engine', 'Razorpay & UPI Integration', 'Firebase Push & Auth']
      },
      {
        id: 'src-compiler-app',
        title: 'NRB Cloud Code Compiler Sandbox App Code',
        shortName: 'Compiler Mobile App',
        price: 199,
        type: 'Mobile App',
        category: 'Source Code',
        icon: Code2,
        logoSrc: '/icons/store/docker.svg',
        color: 'from-violet-500 to-purple-600',
        badge: 'Mobile App (₹199)',
        description: 'Mobile IDE and code compilation sandbox supporting C++, Java, Python, and JavaScript with Docker backend code execution API.',
        deliverable: 'React Native Mobile App + Docker Execution Backend API',
        techLogos: [
          { name: 'Docker', src: '/icons/store/docker.svg' },
          { name: 'C++', src: '/icons/cplusplus.svg' },
          { name: 'Java', src: '/icons/store/java.svg' },
          { name: 'Linux', src: '/icons/linux.svg' }
        ],
        features: ['4+ Programming Languages', 'Syntax Highlighting Editor', 'Secure Docker Execution', 'Live Output Console']
      },
      {
        id: 'src-social-video-app',
        title: 'AI Social & Video Chat App Full Codebase',
        shortName: 'Social Video App Code',
        price: 499,
        type: 'Mobile App',
        category: 'Source Code',
        icon: Layers,
        logoSrc: '/icons/store/webrtc.svg',
        color: 'from-pink-500 to-rose-600',
        badge: 'Mobile App (₹499)',
        description: 'Comprehensive mobile social network with WebRTC 1-on-1 video calling, reels video feed, AI chat companion, and real-time messaging.',
        deliverable: 'Production React Native + Node.js Socket Backend Code',
        techLogos: [
          { name: 'WebRTC', src: '/icons/store/webrtc.svg' },
          { name: 'Socket.io', src: '/icons/store/socketio.svg' },
          { name: 'React Native', src: '/icons/react.svg' },
          { name: 'Node.js', src: '/icons/store/nodejs.svg' }
        ],
        features: ['WebRTC 1-on-1 Video Calls', 'Short Video Reels Feed', 'Socket.io Instant Chat', 'AI Companion Bot']
      }
    ]
  },
  {
    id: 'deployments',
    title: 'Category 3: Deployment & Live Publishing Services',
    shortTitle: 'Deployment Services',
    badge: 'Live Publishing',
    tagline: 'End-to-end cloud deployment, Google Play Store & Apple App Store launch',
    priceLabel: '₹2,000 to ₹10,000',
    items: [
      {
        id: 'deploy-website',
        title: 'Deploy Website (Cloud & Custom Domain)',
        shortName: 'Deploy Website',
        price: 2000,
        category: 'Deployment',
        icon: Cloud,
        logoSrc: '/icons/aws.svg',
        color: 'from-cyan-400 to-blue-500',
        badge: '₹2,000',
        description: 'Complete deployment of your website on AWS, Vercel, or Netlify with custom domain DNS mapping, SSL HTTPS certificate, and CI/CD pipelines.',
        deliverable: 'Live Website URL + DNS Configured + SSL + 30 Days Free Support',
        techLogos: [
          { name: 'AWS Cloud', src: '/icons/aws.svg' },
          { name: 'Vercel', src: '/icons/vercel.svg' },
          { name: 'Cloudflare', src: '/icons/cloudflare.svg' },
          { name: 'Netlify', src: '/icons/netlify.svg' }
        ],
        features: ['AWS / Vercel Cloud Setup', 'Custom Domain DNS Mapping', 'Free SSL HTTPS Certificate', 'Automated GitHub CI/CD']
      },
      {
        id: 'deploy-playstore',
        title: 'Deploy Live Play Store (Google Play Approval)',
        shortName: 'Deploy Play Store',
        price: 5000,
        category: 'Deployment',
        icon: Play,
        logoSrc: '/icons/store/googleplay.svg',
        color: 'from-emerald-400 to-teal-500',
        badge: '₹5,000',
        description: 'Full submission to Google Play Console: release signing keystore, optimized AAB bundle generation, privacy policy creation, and Google policy approval assistance.',
        deliverable: 'Published Live Google Play Store App URL + Signed Key Store',
        techLogos: [
          { name: 'Google Play', src: '/icons/store/googleplay.svg' },
          { name: 'Android', src: '/icons/store/android.svg' },
          { name: 'Google Cloud', src: '/icons/googlecloud.svg' }
        ],
        features: ['Release Keystore & AAB Build', 'Google Policy Compliance', 'Privacy Policy & Screenshots', 'Play Store Live Publication']
      },
      {
        id: 'deploy-appstore',
        title: 'Deploy App Store (Apple iOS Store & Certificates)',
        shortName: 'Deploy Apple App Store',
        price: 10000,
        category: 'Deployment',
        icon: ShieldCheck,
        logoSrc: '/icons/store/appstore.svg',
        color: 'from-amber-400 to-yellow-500',
        badge: '₹10,000',
        description: 'Complete Apple Developer release: App IDs, Apple Distribution Certificates, Provisioning Profiles, TestFlight beta setup, and App Store Review clearance.',
        deliverable: 'Published Live Apple App Store iOS App URL + Distribution Certs',
        techLogos: [
          { name: 'Apple App Store', src: '/icons/store/appstore.svg' },
          { name: 'Apple iOS', src: '/icons/store/apple.svg' },
          { name: 'Cloudflare', src: '/icons/cloudflare.svg' }
        ],
        features: ['Apple Certificates & Profiles', 'TestFlight Beta Distribution', 'App Store Review Compliance', 'Push APNs Configuration']
      }
    ]
  }
];

export const allProductsList = [
  ...productCategories[0].items,
  ...productCategories[1].items,
  ...productCategories[2].items
];
