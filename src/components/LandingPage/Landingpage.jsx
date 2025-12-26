import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      {/* HERO WITH BACKGROUND IMAGE */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-purple-900/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            🎉 Event Polling Platform
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10">
            A collaborative platform to create events, run smart polls, and
            finalize the best date — built for teams, colleges, and communities.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-8 py-3 bg-purple-600 rounded-xl text-lg font-semibold hover:bg-purple-700 transition"
            >
              Sign Up
            </Link>

            
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">❌ The Problem</h2>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto">
            Planning events is chaotic — endless messages, conflicting schedules,
            and no clear decision. Teams struggle to find a common date quickly.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "📅 Smart Event Creation",
              desc: "Create events with multiple date options and poll settings.",
            },
            {
              title: "🗳️ Live Polling",
              desc: "Participants vote in real time, results update instantly.",
            },
            {
              title: "👥 Collaboration",
              desc: "Invite participants, track responses, and finalize dates.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500 transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            ⚙️ How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-5xl mb-4">1️⃣</div>
              <h4 className="text-xl font-semibold mb-2">Create Event</h4>
              <p className="text-gray-400">
                Add event name, description, and possible dates.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-4">2️⃣</div>
              <h4 className="text-xl font-semibold mb-2">Collect Votes</h4>
              <p className="text-gray-400">
                Participants vote on dates that work for them.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-4">3️⃣</div>
              <h4 className="text-xl font-semibold mb-2">Finalize</h4>
              <p className="text-gray-400">
                Choose the best date based on poll analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK (Hackathon Judges Love This) */}
      <section className="bg-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">🛠 Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 text-gray-300">
            {[
              "React",
              "Vite",
              "Tailwind CSS",
              "Node.js",
              "Express",
              "MongoDB",
              "JWT Auth",
            ].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 border border-white/20 rounded-full hover:border-blue-500 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-700 to-blue-600 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Build Better Events?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Sign up now and simplify event planning forever.
        </p>
        <Link
          to="/signup"
          className="px-10 py-4 bg-black/30 border border-white/30 rounded-xl text-lg font-semibold hover:bg-black/50 transition"
        >
          Get Started 🚀
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Event Polling Platform · Hackathon Project
      </footer>
    </div>
  );
};

export default LandingPage;
