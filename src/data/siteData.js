import { Globe, Smartphone, Palette, TrendingUp, Search, Cloud, Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
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
    id: 1,
    slug: 'future-of-web-development-2026',
    title: 'The Future of Web Development in 2026',
    excerpt: 'Exploring the latest trends shaping the future of modern web development and design systems.',
    category: 'Development',
    date: 'May 5, 2026',
    readTime: '5 min read',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop',
    author: { name: 'Alex Carter', role: 'Lead Engineer', avatar: 'https://i.pravatar.cc/64?img=11' },
    tags: ['React', 'Web Dev', 'AI', 'Trends'],
    content: [
      { type: 'lead', text: 'Web development is evolving at a breakneck pace. As we move through 2026, the lines between design, engineering, and artificial intelligence are blurring — creating opportunities that were unthinkable just two years ago.' },
      { type: 'h2', text: 'AI-Augmented Development' },
      { type: 'p', text: 'AI coding assistants have moved from novelty to necessity. Developers are now spending more time on architecture and product thinking than boilerplate. Tools like GitHub Copilot, Cursor, and internal LLM integrations are writing 40–60% of production code in many agencies.' },
      { type: 'p', text: 'The shift is not replacing developers — it\'s amplifying them. Engineers who know how to prompt, review, and integrate AI-generated code are producing 3–5× more output than those who don\'t.' },
      { type: 'h2', text: 'The Rise of Edge-First Architecture' },
      { type: 'p', text: 'CDN-level compute has matured. Cloudflare Workers, Vercel Edge Functions, and Deno Deploy allow developers to run server-side logic milliseconds from users globally. This fundamentally changes how we architect personalization, A/B testing, and auth flows.' },
      { type: 'quote', text: 'The edge is not just about speed — it\'s about rethinking where your application logic lives.' },
      { type: 'h2', text: 'Component-Driven Design Systems' },
      { type: 'p', text: '2026 is the year design systems matured from style guides into living codebases. Tools like Storybook 9 and Figma\'s code-sync features mean designers and engineers share a single source of truth. Tokens, variants, and compound components are now standard vocabulary across teams.' },
      { type: 'h2', text: 'What This Means For You' },
      { type: 'p', text: 'If you\'re building a product in 2026, you can\'t afford to ignore these shifts. The agencies and teams that embrace AI tooling, edge architecture, and unified design systems will ship faster, with fewer bugs, and higher user satisfaction.' },
    ],
  },
  {
    id: 2,
    slug: 'designing-for-the-ai-era',
    title: 'Designing for the AI Era',
    excerpt: 'How artificial intelligence is revolutionizing the way we approach UI/UX design and user interactions.',
    category: 'Design',
    date: 'Apr 28, 2026',
    readTime: '7 min read',
    gradient: 'from-purple-500/20 to-pink-500/20',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&auto=format&fit=crop',
    author: { name: 'Priya Nair', role: 'Head of Design', avatar: 'https://i.pravatar.cc/64?img=47' },
    tags: ['AI', 'UI/UX', 'Design', 'Future'],
    content: [
      { type: 'lead', text: 'AI is no longer just a backend buzzword. It\'s reshaping how interfaces are conceived, prototyped, and experienced — and designers who adapt will define the next era of digital products.' },
      { type: 'h2', text: 'Generative UI: Design That Responds' },
      { type: 'p', text: 'Imagine interfaces that restructure themselves based on user behavior, preferences, and context. This is no longer science fiction. With large multimodal models powering personalization engines, we\'re building UIs that adapt in real-time.' },
      { type: 'p', text: 'Early adopters like Spotify and Netflix have been doing this at the content level for years. In 2026, it\'s happening at the UI component level — dynamic layouts, adaptive information hierarchies, and predictive navigation.' },
      { type: 'quote', text: 'The best interface is the one the user doesn\'t have to think about. AI gets us closer to that invisible ideal.' },
      { type: 'h2', text: 'Ethical Considerations' },
      { type: 'p', text: 'With great personalization comes great responsibility. Designers must now think deeply about consent, transparency, and algorithmic bias. Dark patterns powered by AI are a real risk. The best design teams are building ethical guardrails directly into their processes.' },
      { type: 'h2', text: 'Practical Starting Points' },
      { type: 'p', text: 'You don\'t need a 100-person ML team to start designing for AI. Begin by auditing your user flows for repetitive decisions that could be automated. Identify where a smart default would reduce friction. Layer in AI incrementally, measure impact, and iterate.' },
    ],
  },
  {
    id: 3,
    slug: 'building-scalable-saas-products',
    title: 'Building Scalable SaaS Products',
    excerpt: 'A comprehensive guide to architecture decisions that matter when building modern SaaS platforms.',
    category: 'Tech',
    date: 'Apr 15, 2026',
    readTime: '6 min read',
    gradient: 'from-orange-500/20 to-amber-500/20',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop',
    author: { name: 'James Liu', role: 'CTO', avatar: 'https://i.pravatar.cc/64?img=33' },
    tags: ['SaaS', 'Architecture', 'Scale', 'Cloud'],
    content: [
      { type: 'lead', text: 'Building a SaaS product that scales gracefully is one of the hardest engineering challenges. Most teams get it wrong the first time — and the cost of rewrites is enormous. Here\'s what actually matters.' },
      { type: 'h2', text: 'Multi-Tenancy From Day One' },
      { type: 'p', text: 'The biggest mistake early SaaS teams make is building a single-tenant architecture and trying to bolt on multi-tenancy later. Decide on your isolation model early: shared database with row-level security, separate schemas, or separate databases per tenant. Each has profound implications for cost, complexity, and compliance.' },
      { type: 'h2', text: 'The Database Layer' },
      { type: 'p', text: 'PostgreSQL with row-level security (RLS) is the dominant pattern for 2026 SaaS stacks. Supabase has made this accessible without deep DBA expertise. Pair it with connection pooling via PgBouncer and you have a solid foundation that can serve thousands of tenants.' },
      { type: 'quote', text: 'Premature optimization is the root of all evil — but premature under-engineering kills startups.' },
      { type: 'h2', text: 'Observability Is Not Optional' },
      { type: 'p', text: 'You cannot improve what you cannot measure. Instrument everything from day one: error rates, p95 latency, database query times, and business metrics. OpenTelemetry has become the standard. Plug it into Grafana, Datadog, or Axiom and you\'ll never fly blind again.' },
      { type: 'h2', text: 'Growth Architecture' },
      { type: 'p', text: 'When your SaaS hits 10,000 tenants, the bottlenecks will surprise you. It\'s rarely the thing you optimized for. Build for observability and horizontal scaling over vertical scaling. Stateless services, background job queues, and read replicas solve 90% of growth problems.' },
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
