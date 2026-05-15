import { Globe, Smartphone, Palette, TrendingUp, Search, Cloud, Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Awards Won' },
];

export const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom high-performance websites built with cutting-edge technologies that deliver exceptional user experiences.',
    color: '#00F5FF',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that captivate users and drive engagement across all devices.',
    color: '#7C3AED',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Human-centered design that transforms complex workflows into intuitive, beautiful digital experiences.',
    color: '#FF4D9D',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies that amplify your brand presence and generate measurable growth.',
    color: '#FF8A00',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Advanced search engine strategies to boost visibility, drive organic traffic, and dominate search rankings.',
    color: '#00FFA3',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps solutions for reliable, high-performance digital operations.',
    color: '#00F5FF',
  },
];

export const processSteps = [
  {
    icon: Lightbulb,
    title: 'Discovery',
    description: 'We dive deep into your vision, audience, and goals to craft a strategy that resonates.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Our designers create stunning visuals and intuitive interfaces that bring your brand to life.',
  },
  {
    icon: Code2,
    title: 'Develop',
    description: 'Our engineers build robust, scalable solutions using the latest technologies and best practices.',
  },
  {
    icon: Rocket,
    title: 'Deploy',
    description: 'We launch, optimize, and continuously improve to ensure long-term success and growth.',
  },
];

export const projects = [
  {
    title: 'FinFlow Dashboard',
    category: 'Web App',
    tag: 'web',
    description: 'AI-powered financial analytics platform with real-time data visualization.',
    gradient: 'from-cyan-500/20 to-purple-500/20',
  },
  {
    title: 'Nexus Social',
    category: 'Mobile App',
    tag: 'mobile',
    description: 'Next-gen social networking app with AR filters and real-time collaboration.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'EcoTrack',
    category: 'UI/UX Design',
    tag: 'design',
    description: 'Sustainability tracking platform with gamification and community features.',
    gradient: 'from-green-500/20 to-cyan-500/20',
  },
  {
    title: 'CloudVault Pro',
    category: 'Web App',
    tag: 'web',
    description: 'Enterprise-grade cloud storage solution with AI-driven file organization.',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'HealthPulse',
    category: 'Mobile App',
    tag: 'mobile',
    description: 'Comprehensive health monitoring app with wearable device integration.',
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
  {
    title: 'Artisan Market',
    category: 'E-Commerce',
    tag: 'web',
    description: 'Premium marketplace connecting artisans with global buyers worldwide.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechVista',
    text: 'NovaSpark transformed our digital presence entirely. The attention to detail and creative excellence exceeded every expectation we had.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, NexGen Labs',
    text: 'Working with NovaSpark was a game-changer. They delivered a product that not only looks stunning but performs exceptionally well.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'CMO, GrowthScale',
    text: 'The team understood our vision from day one. Their modern approach to design and development is truly world-class.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CTO, CloudSync',
    text: 'Exceptional technical execution combined with beautiful design. NovaSpark is our go-to partner for all digital projects.',
    rating: 5,
  },
];

export const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & CEO',
    color: '#00F5FF',
    image: '/team/alex.png',
    social: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/in/',
      github: 'https://github.com/',
    },
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Designer',
    color: '#7C3AED',
    image: '/team/priya.png',
    social: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/in/',
      github: 'https://github.com/',
    },
  },
  {
    name: 'James Chen',
    role: 'Tech Lead',
    color: '#FF4D9D',
    image: '/team/james.png',
    social: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/in/',
      github: 'https://github.com/',
    },
  },
  {
    name: 'Sofia Martinez',
    role: 'Project Manager',
    color: '#FF8A00',
    image: '/team/sofia.png',
    social: {
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/in/',
      github: 'https://github.com/',
    },
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: { monthly: 499, yearly: 399 },
    description: 'Perfect for startups and small businesses',
    features: ['5 Pages Website', 'Mobile Responsive', 'SEO Setup', '3 Revisions', 'Email Support', '1 Month Maintenance'],
    popular: false,
    color: '#00F5FF',
  },
  {
    name: 'Professional',
    price: { monthly: 999, yearly: 799 },
    description: 'Ideal for growing businesses',
    features: ['15 Pages Website', 'Custom Animations', 'Advanced SEO', 'Unlimited Revisions', 'Priority Support', '3 Months Maintenance', 'CMS Integration', 'Analytics Dashboard'],
    popular: true,
    color: '#7C3AED',
  },
  {
    name: 'Enterprise',
    price: { monthly: 2499, yearly: 1999 },
    description: 'For large-scale digital solutions',
    features: ['Unlimited Pages', 'Custom Web App', 'Full-Stack Development', 'Dedicated Team', '24/7 Support', '12 Months Maintenance', 'API Integration', 'Performance Optimization'],
    popular: false,
    color: '#FF4D9D',
  },
];

export const blogPosts = [
  {
    id: 0,
    slug: 'future-of-digital-agencies-2026',
    title: 'The Future of Digital Agencies in 2026',
    excerpt: 'How AI and automation are reshaping the way agencies deliver value to clients.',
    category: 'Strategy',
    date: 'May 15, 2026',
    readTime: '5 min read',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    image: '/images/blog-1.png',
    cover: '/images/blog-1.png',
    author: { name: 'Agency Team', role: 'Expert Contributor', avatar: 'https://ui-avatars.com/api/?name=Agency+Team&background=00F5FF&color=050510' },
    tags: ['Agency', 'AI', 'Strategy'],
    content: [
      { type: 'lead', text: 'The agency landscape is undergoing a tectonic shift. In 2026, the value proposition is no longer about labor hours, but about the synergy between human creativity and autonomous intelligence.' },
      { type: 'h2', text: 'The Shift to Value-Based Intelligence' },
      { type: 'p', text: 'Agencies are moving away from traditional billing models. With AI handling the heavy lifting of production, the focus has shifted to high-level strategy and innovative problem-solving that machines cannot replicate.' },
      { type: 'quote', text: 'In 2026, the best agencies aren\'t just using AI — they are architecting it into the very fabric of their client solutions.' },
    ],
  },
];


export const faqItems = [
  {
    question: 'What technologies do you use?',
    answer: 'We use cutting-edge technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS and Vercel. Our stack is always evolving to deliver the best solutions.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A standard website takes 4-6 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during the discovery phase.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes! All our plans include maintenance periods, and we offer extended support packages. We believe in long-term partnerships with our clients.',
  },
  {
    question: 'What is your design process?',
    answer: 'Our design process follows a human-centered approach: Research → Wireframing → Visual Design → Prototyping → Testing → Implementation. We iterate based on feedback at every stage.',
  },
  {
    question: 'Can you work with existing codebases?',
    answer: 'Absolutely. We frequently work with existing projects for redesigns, optimizations, and feature additions. We conduct thorough code audits before making recommendations.',
  },
  {
    question: 'Do you provide SEO services?',
    answer: 'Yes, SEO is integrated into everything we build. We also offer dedicated SEO optimization services including technical SEO, content strategy, and performance optimization.',
  },
];

export const trustedBrands = [
  'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Spotify', 'Stripe', 'Figma', 'Vercel'
];

export const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Services: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'SEO'],
  Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'],
};

export const socialLinks = [
  { name: 'Twitter', url: '#' },
  { name: 'LinkedIn', url: '#' },
  { name: 'GitHub', url: '#' },
  { name: 'Dribbble', url: '#' },
];
