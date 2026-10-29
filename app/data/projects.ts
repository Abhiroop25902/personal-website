type Project = {
  title: string;
  href?: string;
  dateTime?: string;
  displayDate: string;
  description: string;
  supportingLinks?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Recall",
    href: "https://github.com/Abhiroop25902/recall",
    dateTime: "2026-09",
    displayDate: "Sep 2026",
    description:
      "Built a cloud-hosted memory service providing AI agents with project-scoped persistent context and semantic retrieval through MCP.",
  },
  {
    title: "Mindful Bites",
    href: "https://food-tracker-25902.web.app/",
    dateTime: "2026-04",
    displayDate: "Apr 2026",
    description:
      "Built an AI-assisted meal-photo tracker that generated nutrition estimates and model-based well-being insights.",
    supportingLinks: [
      {
        label: "Source",
        href: "https://github.com/Abhiroop25902/food-tracker-25902",
      },
    ],
  },
  {
    title: "Sentinel",
    href: "https://sentinel.abhiroop.dev/",
    dateTime: "2026-03",
    displayDate: "Mar 2026",
    description:
      "Built a real-time monitoring dashboard using SolidJS, Web Workers, and a Pub/Sub-backed event ingestion pipeline.",
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
      "Built a PCOD-focused nutrition app with meal logging, AI meal recommendations, and a background ingredient-sensitivity workflow.",
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
      "Built a templated linked-list implementation to practise C++ tooling.",
  },
  {
    title: "Random Color Changer",
    href: "https://abhiroop25902.github.io/random-color-change/",
    dateTime: "2023-09",
    displayDate: "Sep 2023",
    description:
      "Built a TypeScript and jQuery page that changed the background to random hex colors with a smooth transition.",
    supportingLinks: [
      {
        label: "Source",
        href: "https://github.com/Abhiroop25902/random-color-change",
      },
    ],
  },
  {
    title: "Computer Science Coursework · IIEST Shibpur",
    displayDate: "2020–2023",
    description:
      "Undergraduate programming, systems, and digital-circuit lab work spanning data structures, algorithms, microprocessors, graphics, databases, compilers, and AI/ML.",
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
      "Built a JavaScript page that displayed a random Pokémon’s name and official artwork using PokéAPI.",
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
      "B.Tech team research project exploring CNN and transformer approaches to identifying classical cipher types from encrypted text.",
  },
  {
    title: "Flutter Whiteboard",
    href: "https://abhiroop25902.github.io/whiteboard-flutter-web/",
    dateTime: "2022-05",
    displayDate: "May 2022",
    description:
      "Built a Flutter whiteboard with freehand drawing, color selection, adjustable stroke width, and canvas clearing.",
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
      "Built a Dart command-line tool for RSA key generation and message encryption and decryption.",
  },
  {
    title: "C++ Trie",
    href: "https://github.com/Abhiroop25902/cpp-tries-mytry",
    dateTime: "2021-12",
    displayDate: "Dec 2021",
    description:
      "Built a templated trie in C++ to store and retrieve values by string keys.",
  },
  {
    title: "CoWin Checker",
    href: "https://github.com/Abhiroop25902/CoWin-Checker",
    dateTime: "2021-06",
    displayDate: "Jun 2021",
    description:
      "A Python script that periodically checked CoWIN vaccination slots at selected centers and sent desktop notifications when slots became available.",
  },
  {
    title: "Video-based Social Distancing Monitor",
    href: "https://github.com/Abhiroop25902/Mini-Project",
    dateTime: "2020-11",
    displayDate: "Nov 2020",
    description:
      "Team computer-vision prototype using YOLOv3 and OpenCV to analyze recorded video and visualize proximity warnings.",
  },
  {
    title: "Video AI Upscaling",
    href: "https://github.com/Abhiroop25902/Video-AI-Upscaling",
    dateTime: "2020-11",
    displayDate: "Nov 2020",
    description:
      "Adapted an EDSR-based example for 3× video upscaling through Google Colab.",
  },
];
