
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  School,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  Trophy,
  Palette,
  Star,
} from "lucide-react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "Building strong academic foundations for every learner.",
    },
    {
      icon: Users,
      title: "Dedicated Teachers",
      description: "Committed educators who inspire and support our learners.",
    },
    {
      icon: Trophy,
      title: "Holistic Development",
      description: "Encouraging talent, creativity, discipline and confidence.",
    },
    {
      icon: School,
      title: "A Learning Community",
      description: "Working together to create a positive learning environment.",
    },
  ];

  const academicPrograms = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "We provide a supportive learning environment that encourages curiosity, critical thinking and academic achievement.",
    },
    {
      icon: Trophy,
      title: "Sports & Recreation",
      description:
        "Learners participate in sporting activities that promote teamwork, discipline, fitness and healthy competition.",
    },
    {
      icon: Palette,
      title: "Arts & Creativity",
      description:
        "We encourage learners to express themselves through creative arts, cultural activities and performances.",
    },
  ];

  const announcements = [
    {
      category: "School News",
      date: "Announcements",
      title: "Welcome to Dombotombo Government Primary School",
      description:
        "Discover our school community, learning environment and commitment to helping every learner succeed.",
    },
    {
      category: "Academics",
      date: "School Activities",
      title: "Learning Beyond the Classroom",
      description:
        "Our learners are encouraged to participate in academic, sporting and creative activities.",
    },
    {
      category: "Community",
      date: "School Community",
      title: "Growing Together as a School Community",
      description:
        "We believe that teachers, parents and learners all play an important role in educational success.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#790d29] text-white">
              <School size={28} />
            </div>

            <div>
              <h1 className="text-sm font-extrabold uppercase tracking-wide text-[#790d29] sm:text-base">
                Dombotombo
              </h1>
              <p className="text-xs font-medium text-gray-500">
                Government Primary School
              </p>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-600 transition hover:text-[#790d29]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/login"
              className="rounded-lg bg-[#790d29] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#650d27]"
            >
              Portal Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#790d29] lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t bg-white px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-gray-700 hover:text-[#790d29]"
                >
                  {link.name}
                </a>
              ))}

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-[#790d29] px-5 py-3 text-center font-bold text-white"
              >
                Portal Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero section */}
      <section
        id="home"
        className="relative flex min-h-[620px] items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45, 5, 19, 0.75), rgba(45, 5, 19, 0.75)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
              <Star size={16} />
              Welcome to Dombotombo Government Primary School
            </span>

            <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
              Inspiring Young Minds,
              <span className="block text-yellow-400">
                Building Bright Futures.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">
              Providing a supportive learning environment where young minds
              grow, talents flourish and every learner is encouraged to reach
              their full potential.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-7 py-4 font-bold text-[#650d27] transition hover:bg-yellow-300"
              >
                Discover Our School
                <ArrowRight size={19} />
              </a>

              <Link
                to="/login"
                className="rounded-lg border border-white px-7 py-4 font-bold text-white transition hover:bg-white hover:text-[#790d29]"
              >
                Access School Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`p-7 ${
                  index !== 3 ? "border-b sm:border-r lg:border-b-0" : ""
                }`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#790d29]/10 text-[#790d29]">
                  <Icon size={25} />
                </div>

                <h3 className="mb-2 font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About section */}
      <section id="about" className="scroll-mt-24 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85"
              alt="Learners studying in a classroom"
              className="h-[430px] w-full rounded-2xl object-cover shadow-lg"
            />

            <div className="absolute -bottom-7 -right-3 rounded-xl bg-[#790d29] p-6 text-white shadow-xl sm:-right-6">
              <School size={32} className="mb-2 text-yellow-400" />
              <p className="text-xl font-extrabold">Our School</p>
              <p className="text-sm text-gray-200">
                Learning and growing together
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold uppercase tracking-widest text-[#790d29]">
              About Our School
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              Creating Opportunities for Every Learner
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Dombotombo Government Primary School is committed to providing
              quality primary education in a supportive and welcoming
              environment.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We believe that every child has unique abilities and potential.
              Through quality teaching, discipline, creativity and
              collaboration, we strive to prepare our learners for a bright
              future.
            </p>

            <a
              href="#academics"
              className="mt-8 inline-flex items-center gap-2 font-bold text-[#790d29] hover:gap-4"
            >
              Explore Our School
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
      </section>

      {/* Academics */}
      <section id="academics" className="scroll-mt-24 bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-bold uppercase tracking-widest text-[#790d29]">
              What We Offer
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Education Beyond the Classroom
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              We encourage academic achievement, personal growth and
              participation in activities that develop the whole learner.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {academicPrograms.map((program) => {
              const Icon = program.icon;

              return (
                <div
                  key={program.title}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#790d29]/10 text-[#790d29]">
                    <Icon size={32} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    {program.title}
                  </h3>

                  <p className="leading-7 text-gray-600">
                    {program.description}
                  </p>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-2 font-bold text-[#790d29]"
                  >
                    Learn More
                    <ChevronRight size={18} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News and announcements */}
      <section id="news" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="font-bold uppercase tracking-widest text-[#790d29]">
                Stay Updated
              </span>

              <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                News & Announcements
              </h2>

              <p className="mt-4 text-gray-600">
                Stay informed about what's happening in our school community.
              </p>
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {announcements.map((news) => (
              <article
                key={news.title}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-40 items-center justify-center bg-[#790d29]">
                  <CalendarDays size={55} className="text-yellow-400" />
                </div>

                <div className="p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#790d29]/10 px-3 py-1 text-xs font-bold text-[#790d29]">
                      {news.category}
                    </span>

                    <span className="text-xs text-gray-400">
                      {news.date}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-gray-900">
                    {news.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {news.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 bg-gray-50 py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="font-bold uppercase tracking-widest text-[#790d29]">
              Get In Touch
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              We'd Love to Hear From You
            </h2>

            <p className="mt-5 max-w-lg leading-8 text-gray-600">
              For enquiries about our school, admissions and other school
              activities, please get in touch with us.
            </p>

            <div className="mt-9 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#790d29]/10 text-[#790d29]">
                  <MapPin size={23} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Our Location</h3>
                  <p className="text-sm text-gray-500">
                    Dombotombo, Marondera, Zimbabwe
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#790d29]/10 text-[#790d29]">
                  <Phone size={23} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-500">
                    Contact the school administration
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#790d29]/10 text-[#790d29]">
                  <Mail size={23} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">
                    Contact the school administration
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-[#790d29] p-9 text-white shadow-xl sm:p-12">
            <School size={48} className="mb-7 text-yellow-400" />

            <h3 className="text-3xl font-extrabold">
              Be Part of Our School Community
            </h3>

            <p className="mt-5 leading-8 text-gray-200">
              We welcome learners, parents and members of our community to
              connect with Dombotombo Government Primary School.
            </p>

            <Link
              to="/login"
              className="mt-9 inline-flex w-fit items-center gap-3 rounded-lg bg-yellow-400 px-7 py-4 font-bold text-[#650d27] transition hover:bg-yellow-300"
            >
              Access School Portal
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#450818] py-12 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <School size={34} className="text-yellow-400" />
                <div>
                  <h3 className="font-extrabold uppercase">
                    Dombotombo
                  </h3>
                  <p className="text-xs text-gray-300">
                    Government Primary School
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-7 text-gray-300">
                Inspiring young minds and building bright futures through
                quality education and holistic development.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold">Quick Links</h3>

              <div className="flex flex-col gap-3 text-sm text-gray-300">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="transition hover:text-yellow-400"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-5 font-bold">School Portal</h3>

              <p className="mb-5 text-sm leading-7 text-gray-300">
                Access the school management portal to stay connected with
                school activities and information.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-bold text-yellow-400 hover:text-yellow-300"
              >
                Portal Login
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-7 text-sm text-gray-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Dombotombo Government Primary
              School. All rights reserved.
            </p>

            <p>Inspiring Young Minds, Building Bright Futures.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
