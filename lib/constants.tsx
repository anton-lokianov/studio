import { Icons } from "@/components/ui/icons";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
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
    role: "Chief Technology Officer",
    company: "TechVision Inc.",
    content:
      "This product has completely transformed how our team collaborates. The intuitive interface and powerful features have boosted our productivity by 40%. Absolutely worth every penny!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Product Designer",
    company: "DesignCraft Studios",
    content:
      "As a designer, I'm incredibly impressed with the attention to detail and user experience. It's rare to find a tool that perfectly balances functionality with aesthetics.",
    image: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 3,
    name: "Adam Kowalski",
    role: "Startup Founder",
    company: "InnovateLab",
    content:
      "Starting a business is challenging, but this solution made our operations seamless. The customer support team is exceptional, and the platform keeps getting better with each update.",
    image: "https://i.pravatar.cc/150?img=57",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Marketing Director",
    company: "Growth Dynamics",
    content:
      "The analytics capabilities are outstanding. We've gained invaluable insights into our customer behavior, which has helped us optimize our strategies effectively.",
    image: "https://i.pravatar.cc/150?img=56",
  },
  {
    id: 5,
    name: "Lisa Parker",
    role: "Operations Manager",
    company: "Swift Solutions",
    content:
      "Implementation was a breeze, and the ROI has been remarkable. Our team adapted quickly, and we've seen a significant improvement in our workflow efficiency.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Head of Engineering",
    company: "CloudScale Systems",
    content:
      "The scalability and performance are exceptional. We've handled 10x our usual load without any hiccups. The built-in monitoring tools have been invaluable for our DevOps team.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 7,
    name: "Priya Patel",
    role: "UX Research Lead",
    company: "UserFirst Digital",
    content:
      "From a user research perspective, this platform has set new standards. The accessibility features and intuitive design patterns have made it a favorite among our diverse user base.",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 8,
    name: "Robert Martinez",
    role: "Financial Controller",
    company: "Global Finance Partners",
    content:
      "The reporting capabilities have revolutionized our financial planning. We've cut down our month-end closing time by 60%, and the accuracy of our forecasts has improved significantly.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 9,
    name: "Alexandra Kim",
    role: "Product Manager",
    company: "Innovation Hub",
    content:
      "The integration capabilities are fantastic. We've connected it with all our existing tools, and the workflow automation has eliminated countless hours of manual work for our team.",
    image: "https://i.pravatar.cc/150?img=12",
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
