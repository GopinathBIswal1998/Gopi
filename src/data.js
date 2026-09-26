export const profile = {
  name: "Gopinath Biswal",
  role: "Java Full Stack Developer",
  location: "Bhubaneswar, Odisha, India",
  email: "1998bgopinath@gmail.com",
  phone: "+91-7326046324",
  github: "https://github.com/GopinathBiswal",
  linkedin: "https://www.linkedin.com/in/gopinath-biswal1998",
  whatsapp: "https://wa.me/917608881998",
  instagram: "https://instagram.com/gopinath_biswal7",
  instagramHandle: "@gopinath_biswal7",
  resumeUrl: "/resume.pdf",
  tagline: "Building secure Java systems and thoughtful web experiences.",
  summary:
    "Java Full Stack Developer with 3.5+ years of professional experience building and delivering end-to-end web applications using Java, Spring Boot, ReactJS, and Angular. I specialize in developing secure REST APIs, scalable backend services, responsive user interfaces, database integration, and microservices, with hands-on experience in designing, developing, testing, and maintaining enterprise applications in Agile environments.",
};

export const stats = [
  { label: "Live project work", value: "3+" },
  // { label: "LeetCode problems solved", value: "100+" },
  { label: "Worked with companies ", value: "2" },
  // { label: "MCA CGPA", value: "8.9/10" },
];

export const skillGroups = [
  {
    title: "Backend",
    items: [
      "Java 8",
      "Spring Boot",
      "Spring MVC",
      "Spring Security (JWT)",
      "Spring Data JPA",
      "Hibernate",
      "JDBC",
      "Servlets / JSP",
      "REST APIs",
      // "GraphQL",
      "Microservices",
    ],
  },
  {
    title: "Frontend",
    items: [
      "ReactJS",
      "Angular",
      "TypeScript",
      "JavaScript (ES6+)",
      // "Next.js",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Responsive Design",
    ],
  },
  {
    title: "Data & Storage",
    items: ["Oracle", "MySQL", "PostgreSQL", "MongoDB", "Orient DB", "Query Optimization", "ER Diagram Design"],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Docker",
      "Kubernetes (basics)",
      "Jenkins",
      "Git / GitHub",
      "Maven",
      "Postman",
      "Swagger",
      "SonarQube",
      // "AWS (EC2, S3, IAM)",
    ],
  },
  {
    title: "Architecture & Practice",
    items: [
      "Microservices Architecture",
      "SOLID Principles",
      "OOP & Design Patterns",
      "System Design",
      "Agile / Scrum",
      "DBMS & OS fundamentals",
    ],
  },
];

export const experience = [
  {
    company: "Optimas AI Technologies",
    role: "Associate Product Systems Engineer",
    location: "HSR Layout, Bangalore, India",
    period: "Aug 2022 — Mar 2023",
    points: [
      "Developed and enhanced web application functionality using Core Java and JAX-RS, with OrientDB for data management and Apache for deployment.",
      "Modified existing methods to deliver additional features while maintaining reliable and maintainable application behavior.",
      "Performed method testing with Postman and prepared functional and technical API documentation.",
      "Participated in daily brief meetings and provided updates on assigned tasks and completion progress.",
    ],
  },
  {
    company: "CSM Technologies Private Limited",
    role: "Programmer",
    location: "Bhubaneswar, Odisha, India",
    period: "Oct 2023 — Present",
    points: [
      "Developed and maintained Java web applications for ARPANA and CDMS using Spring, Spring Boot, Spring Data JPA, JSP and PostgreSQL.",
      "Tested and debugged backend components, implemented Base64 and CryptoJS encryption and decryption, and worked with QA engineers to resolve defects.",
      "Translated UI/UX wireframes into responsive web pages and integrated frontend interfaces with backend APIs for asynchronous data operations.",
      "Delivered enhancements and supported ongoing project maintenance while participating in Scrum activities, including daily stand-up meetings.",
    ],
  },
];

// NOTE: a few repo links below point at your GitHub profile because the exact
// repo slug wasn't available at build time — search "github repo" next to
// each flagged entry and swap in the direct URL once you have it handy.
export const projects = [
  {
    name: "Optimas AI",
    category: "Java Web Application",
    description:
      "Java web application developed with Core Java and JAX-RS, using OrientDB for data management and Apache for application deployment.",
    highlights: [
      "Modified existing methods and delivered additional features",
      "Performed method testing using Postman",
      "Prepared functional and technical API documentation",
    ],
    tech: ["Core Java", "JAX-RS", "OrientDB", "Apache", "Maven"],
    liveUrl: "https://optimas.ai",
    icon: "https://www.google.com/s2/favicons?domain=optimas.ai&sz=64",
    iconSize: 24,
  },
  {
    name: "ARPANA",
    category: "Java Web Application",
    description:
      "Java and Spring-based web application with JSP, Hibernate and Oracle, focused on secure, reliable backend functionality.",
    highlights: [
      "Tested and debugged backend components for reliability",
      "Implemented Base64 and CryptoJS encryption and decryption",
      "Worked with QA engineers to identify and resolve defects",
    ],
    tech: ["Java", "Spring", "Hibernate", "JSP", "Oracle", "Maven"],
    liveUrl: "https://pension.odishatreasury.gov.in/login.html",
    icon: "https://pension.odishatreasury.gov.in/images/logo-arpan.jpg",
    iconSize: 24,
  },
  {
    name: "CDMS",
    category: "Full-Stack",
    description:
      "Full-stack web application built with Spring Boot, Spring Data JPA, Angular and PostgreSQL, supporting responsive user interfaces and asynchronous API integration.",
    highlights: [
      "Translated UI/UX wireframes into responsive web pages",
      "Integrated frontend interfaces with backend APIs",
      "Delivered enhancements and supported ongoing maintenance",
    ],
    tech: ["Java", "Spring Boot", "Spring Data JPA", "Angular", "PostgreSQL", "Maven"],
    liveUrl: "https://www.cdmsodisha.gov.in/#/Website/home",
    icon: "https://www.cdmsodisha.gov.in/assets/img/odisha-logo.png",
    iconSize: 24,
    iconClassName: "bg-white p-1",
  },
];

export const education = [
  {
    school: "GITA Autonomous College, Bhubaneswar",
    degree: "Master of Computer Applications (MCA)",
    detail: "CGPA: 8.9 / 10",
    period: "2023 — 2025",
  },
  {
    school: "Utkal University, Bhubaneswar",
    degree: "B.Sc. Physics (Hons.)",
    detail: "82.60%",
    period: "2020 — 2023",
  },
   {
    school: "Kendrapara Residential Higher Secondary School of Science & Technology, Tinimuhani, Kendrapara",
    degree: "Higher Secondary Education (Science)",
    detail: "56%",
    period: "2018 — 2020",
  },
  {
    school: "Modern Public School, Thakurhat, Kendrapara",
    degree: "Schooling",
    detail: "73%",
    period: "2018",
  },
];

export const certifications = [
  {
    title: "Oracle Certified Associate (OCA) — AI & Machine Learning",
    issuer: "Oracle",
  },
  {
    title: "100+ LeetCode problems solved",
    issuer: "Data Structures, Algorithms & Java patterns",
  },
  {
    title: "3+ full-stack projects shipped",
    issuer: "Banking, sports & event-management domains",
  },
];

export const navLinks = [
  { label: "Home", path: "/", href: "#home" },
  { label: "About", path: "/about", href: "#about" },
  { label: "Skills", path: "/skills", href: "#skills" },
  { label: "Experience", path: "/experience", href: "#experience" },
  { label: "Projects", path: "/projects", href: "#projects" },
  { label: "Contact", path: "/contact", href: "#contact" },
];
