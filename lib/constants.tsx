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
    role: "Project Manager",
    company: "TechVision Inc.",
    content:
      "The new admin dashboard makes managing our content so much easier. Everything is organized well and easy to find. The best part is how smooth and fast it runs - no more waiting around for pages to load. Really happy with how our ideas were listened to and included in the final product.",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "DesignCraft Studios",
    content:
      "Our new landing page is exactly what we needed to look professional online. It loads quickly, looks great, and makes it easy for customers to contact us. The newsletter signup has already helped us build a good email list. Very pleased with the whole process and the end result.",
    image: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 3,
    name: "Adam Kowalski",
    role: "CEO",
    company: "InnovateLab",
    content:
      "Our online store was having issues with payments not going through properly. Now everything works perfectly - customers can pay easily with credit cards or PayPal, and we're getting way fewer support calls. The whole checkout process is much smoother and more reliable.",
    image: "https://i.pravatar.cc/150?img=57",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Product Owner",
    company: "Growth Dynamics",
    content:
      "The update to our website gave it a completely fresh look while keeping it familiar for our regular users. The new design works great on phones too, which is something we really needed. Making updates is much simpler now, and we can easily add new content ourselves.",
    image: "https://i.pravatar.cc/150?img=56",
  },
  {
    id: 5,
    name: "Lisa Parker",
    role: "Digital Director",
    company: "Swift Solutions",
    content:
      "The new inventory dashboard has made a big difference in how we track our products. It's easy to see what's in stock and what needs ordering. Everyone on the team picked it up quickly, and it's saved us so much time compared to our old spreadsheet system.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Technical Lead",
    company: "CloudScale Systems",
    content:
      "Our website had several annoying problems that needed fixing, and we also wanted to add some new features. Everything was handled professionally and now works exactly as we hoped. The improvements have made the site much more reliable and easier to use.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 7,
    name: "Priya Patel",
    role: "Product Manager",
    company: "UserFirst Digital",
    content:
      "Our new website looks fantastic on both computers and phones, which was really important for us. The pages load quickly and everything is easy to read and navigate. We've had great feedback from our customers about how much better the new site is to use.",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 8,
    name: "Robert Martinez",
    role: "Operations Director",
    company: "Global Finance Partners",
    content:
      "The reporting tool has made our weekly reports so much easier to handle. What used to take hours now takes minutes, and the reports look much more professional. Being able to export everything to Excel has been incredibly helpful for our team meetings.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 9,
    name: "Alexandra Kim",
    role: "Marketing Director",
    company: "Innovation Hub",
    content:
      "Our new website perfectly shows off our work and makes it easy for potential clients to learn about us. The blog section helps us share updates, and the contact form has brought in many new inquiries. It's professional, easy to update, and exactly what we were looking for.",
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
