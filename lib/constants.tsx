import { Icons } from "@/components/ui/icons";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

export interface Workflow {
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Restaurant Owner",
    content:
      "My restaurant's website looks amazing! The online menu and reservation system work perfectly. Since launching the new site, we've seen a significant increase in bookings and takeout orders.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Agent",
    content:
      "The property listing website makes showcasing homes so much easier. My clients love how they can view detailed photos and virtual tours. It's definitely helped me close more deals.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Wedding Photographer",
    content:
      "My photography portfolio website is exactly what I wanted. The gallery displays my work beautifully, and potential clients can easily browse through different wedding collections. Booking consultations has never been easier.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Personal Trainer",
    content:
      "The website has transformed my fitness business. Clients can now book sessions online, view workout plans, and track their progress. The before-and-after gallery really helps attract new clients.",
  },
  {
    id: 5,
    name: "Lisa Parker",
    role: "Boutique Owner",
    content:
      "My online store is beautiful and easy to manage. Customers love how they can easily browse through collections and make purchases. The Instagram integration really helps showcase our latest arrivals.",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Local Artist",
    content:
      "The website perfectly displays my artwork portfolio. The online gallery captures the details of my pieces beautifully, and the commission request system has brought in several new projects.",
  },
  {
    id: 7,
    name: "Maria Garcia",
    role: "Food Blogger",
    content:
      "My food blog looks professional and runs smoothly. The recipe layout is perfect, and readers can easily search for specific dishes. The newsletter signup has helped me grow my following significantly.",
  },
  {
    id: 8,
    name: "Robert Martinez",
    role: "Dental Practice Owner",
    content:
      "The new website has really modernized our dental practice. Patients can easily schedule appointments online, and the before-and-after gallery helps showcase our work. It's professional and user-friendly.",
  },
  {
    id: 9,
    name: "Alexandra Kim",
    role: "Yoga Studio Owner",
    content:
      "The website captures the peaceful essence of our yoga studio perfectly. Students love being able to book classes online and check the schedule from their phones. The blog section helps us share wellness tips with our community.",
  },
];

export const WHAT_WE_DO: Service[] = [
  {
    title: "Web apps",
    description:
      "work closely with you to transform your vision into a user-friendly website, blending your brand identity with cutting-edge web tech for an engaging experience. Join us to enhance your online presence and redefine your audience's connection with your brand",
    icon: <Icons.web />,
    features: [
      "Landing",
      "Web 3.0",
      "Mobile first",
      "AI integration",
      "SAAS applications",
      "Automation",
    ],
    image: "/app1.png",
  },
  {
    title: "Mobile apps",
    description:
      "Your mobile app journey begins with a simple idea and ends in a sophisticated design. we transform your initial thoughts into a polished mobile app, designed to captivate and engage users from the first tap.",
    icon: <Icons.mobile />,
    features: [
      "iOS design",
      "Android design",
      "Cross-platform design",
      "Prototypes",
      "Design system",
      "Interactions",
    ],
    image: "/app4.webp",
  },
  {
    title: "Product Design",
    description:
      "we create intuitive, user-friendly designs that make your product easy to use and navigate. our designs are tailored to your brand and business goals, ensuring a seamless user experience.",
    icon: <Icons.design />,
    features: [
      "Strategy & Design",
      "Branding",
      "Design systems",
      "Business goals",
      "User research",
      "Prototyping",
    ],
    image: "/app3.webp",
  },
];

export const WORKFLOW: Workflow[] = [
  {
    title: "Understanding Your Needs 🎯",
    description:
      "We gather requirements, analyze goals, and set clear expectations through consultations to identify your challenges and objectives.",
  },
  {
    title: "Planning & Strategy 📝",
    description:
      "We create a roadmap with defined milestones, allocate resources, develop timelines, and establish KPIs to measure success.",
  },
  {
    title: "Design & Development 💻",
    description:
      "We build solutions using best technologies and practices, following an iterative approach with regular feedback loops.",
  },
  {
    title: "Testing & Optimization ✅",
    description:
      "We conduct thorough quality assurance including functional testing, performance optimization, and security audits.",
  },
  {
    title: "Deployment & Support 🚀",
    description:
      "We launch your project and provide ongoing support, updates, and strategic consultations to maximize long-term value.",
  },
];
