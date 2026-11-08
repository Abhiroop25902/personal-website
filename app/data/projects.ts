type Project = {
  title: string;
  href?: string;
  dateTime?: string;
  displayDate: string;
  description: string;
  featured?: boolean;
  supportingLinksLayout?: "columns";
  supportingLinks?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Recall",
    featured: true,
    href: "https://github.com/Abhiroop25902/recall",
    dateTime: "2026-09",
    displayDate: "Sep 2026",
    description:
      "Persistent project memory for AI agents, provided by a cloud-hosted service with semantic retrieval through MCP.",
  },
  {
    title: "Mindful Bites",
    featured: true,
    href: "https://food-tracker-25902.web.app/",
    dateTime: "2026-04",
    displayDate: "Apr 2026",
    description:
      "AI-assisted meal tracking from photos, with nutrition estimates and model-based well-being insights.",
    supportingLinks: [
      {
        label: "Source",
        href: "https://github.com/Abhiroop25902/food-tracker-25902",
      },
    ],
  },
  {
    title: "Sentinel",
    featured: true,
    href: "https://sentinel.abhiroop.dev/",
    dateTime: "2026-03",
    displayDate: "Mar 2026",
    description:
      "A real-time dashboard for login events, using SolidJS, Web Workers, and a Pub/Sub-backed ingestion pipeline.",
    supportingLinks: [
      {
        label: "Frontend",
        href: "https://github.com/Abhiroop25902/sentinel-frontend",
      },
      {
        label: "Backend",
        href: "https://github.com/Abhiroop25902/sentinel-backend",
      },
      {
        label: "Ingestor",
        href: "https://github.com/Abhiroop25902/sentinel-ingestor",
      },
    ],
  },
  {
    title: "PCOD Nourish",
    href: "https://bnb-marathon-478216.web.app/login",
    dateTime: "2025-11",
    displayDate: "Nov 2025",
    description:
      "A PCOD-focused nutrition app combining meal logging, AI meal recommendations, and a background ingredient-sensitivity workflow.",
    supportingLinks: [
      {
        label: "Frontend",
        href: "https://github.com/Abhiroop25902/bnb-marathon-frontend",
      },
      {
        label: "Backend",
        href: "https://github.com/Abhiroop25902/bnb-marathon-backend",
      },
      {
        label: "Scheduler",
        href: "https://github.com/Abhiroop25902/bnb-marathon-scheduled",
      },
    ],
  },
  {
    title: "Linked List in C++",
    href: "https://github.com/Abhiroop25902/LinkedList",
    dateTime: "2024-08",
    displayDate: "Aug 2024",
    description:
      "A templated linked-list implementation for practising C++ tooling.",
  },
  {
    title: "Random Color Changer",
    href: "https://abhiroop25902.github.io/random-color-change/",
    dateTime: "2023-09",
    displayDate: "Sep 2023",
    description:
      "An experiment with random hex backgrounds and smooth color transitions, built with TypeScript and jQuery.",
    supportingLinks: [
      {
        label: "Source",
        href: "https://github.com/Abhiroop25902/random-color-change",
      },
    ],
  },
  {
    title: "Computer Science Lab Work · IIEST Shibpur",
    displayDate: "2020–2023",
    description:
      "Undergraduate lab implementations and experiments across core computer science subjects, collected in 11 course repositories.",
    supportingLinksLayout: "columns",
    supportingLinks: [
      {
        label: "Data Structures",
        href: "https://1drv.ms/f/c/5fbc6062963ca2c0/IgDAojyWYmC8IIBf7kkAAAAAAWQf178B9xvGbTda_RUJQQ8?e=xgeRc5",
      },
      {
        label: "Digital Logic",
        href: "https://1drv.ms/f/c/5fbc6062963ca2c0/IgDAojyWYmC8IIBf70kAAAAAAWpHkBUfPcel4VWr8MEQYAc?e=SuS8v5",
      },
      {
        label: "Programming Paradigms",
        href: "https://github.com/Abhiroop25902/CS-2273-PP-Lab",
      },
      {
        label: "Algorithms",
        href: "https://github.com/Abhiroop25902/CS-2271-Algo-Lab",
      },
      {
        label: "Microprocessors",
        href: "https://github.com/Abhiroop25902/CS3171-Microprocessor-Lab",
      },
      {
        label: "Computer Graphics",
        href: "https://github.com/Abhiroop25902/CS-3181-Graphics",
      },
      {
        label: "Operating Systems",
        href: "https://github.com/Abhiroop25902/CS3271-Operating-Systems-Lab",
      },
      {
        label: "Databases",
        href: "https://github.com/Abhiroop25902/CS-3172-DBMS-Lab",
      },
      {
        label: "Compiler Design",
        href: "https://github.com/Abhiroop25902/CS-4171-Compiler-Design-Lab",
      },
      {
        label: "Machine Learning",
        href: "https://github.com/Abhiroop25902/CS-4172-ML-Lab",
      },
      {
        label: "Artificial Intelligence",
        href: "https://github.com/Abhiroop25902/CS4271-AI-Lab",
      },
    ],
  },
  {
    title: "Pokémon Image Generator",
    href: "https://abhiroop25902.github.io/pokemon-image-generator/",
    dateTime: "2023-01",
    displayDate: "Jan 2023",
    description:
      "A JavaScript page pairing randomly selected Pokémon with their names and official artwork from PokéAPI.",
    supportingLinks: [
      {
        label: "Source",
        href: "https://github.com/Abhiroop25902/pokemon-image-generator",
      },
    ],
  },
  {
    title: "Classical Cipher Classification",
    href: "https://github.com/Abhiroop25902/Major-Project",
    dateTime: "2022-12",
    displayDate: "Dec 2022",
    description:
      "A B.Tech team research project exploring CNNs and transformers for identifying classical cipher types from encrypted text.",
  },
  {
    title: "Flutter Whiteboard",
    href: "https://abhiroop25902.github.io/whiteboard-flutter-web/",
    dateTime: "2022-05",
    displayDate: "May 2022",
    description:
      "A Flutter whiteboard with freehand drawing, color selection, adjustable stroke width, and canvas clearing.",
    supportingLinks: [
      {
        label: "Source",
        href: "https://github.com/Abhiroop25902/whiteboard-flutter",
      },
    ],
  },
  {
    title: "RSA Implementation",
    href: "https://github.com/Abhiroop25902/RSA-Impl",
    dateTime: "2022-02",
    displayDate: "Feb 2022",
    description:
      "RSA key generation, encryption, and decryption in a Dart command-line tool.",
  },
  {
    title: "C++ Trie",
    href: "https://github.com/Abhiroop25902/cpp-tries-mytry",
    dateTime: "2021-12",
    displayDate: "Dec 2021",
    description:
      "A templated C++ trie for storing and retrieving values by string keys.",
  },
  {
    title: "CoWin Checker",
    href: "https://github.com/Abhiroop25902/CoWin-Checker",
    dateTime: "2021-06",
    displayDate: "Jun 2021",
    description:
      "A Python script that periodically checked vaccination slots at selected CoWIN centers and sent desktop notifications when slots became available.",
  },
  {
    title: "Video-based Social Distancing Monitor",
    href: "https://github.com/Abhiroop25902/Mini-Project",
    dateTime: "2020-11",
    displayDate: "Nov 2020",
    description:
      "A team computer-vision prototype that analyzed recorded video with YOLOv3 and OpenCV to visualize proximity warnings.",
  },
  {
    title: "Video AI Upscaling",
    href: "https://github.com/Abhiroop25902/Video-AI-Upscaling",
    dateTime: "2020-11",
    displayDate: "Nov 2020",
    description:
      "An adaptation of an EDSR-based example for 3× video upscaling in Google Colab.",
  },
];
