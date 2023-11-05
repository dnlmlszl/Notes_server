import React from 'react';

const Home = () => {
  return (
    <section className="container mx-auto my-5 p-10 lg:p-12 max-w-7xl">
      <h2 className="text-[#34495e] text-3xl font-semibold mb-5 uppercase tracking-wide text-center md:text-2xl lg:text-3xl lg:mb-8">
        Hello visitor
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 lg:col-start-1 lg:pr-4">
          <h4 className="text-gray-700 text-2xl lg:text-left">
            Welcome to <span className="font-bold text-gray-800">NoteLynx</span>{' '}
            - Your Digital Canvas for Thoughts
          </h4>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            Capture the moment, plan your day, save your research, or jot down
            your creative bursts with{' '}
            <span className="font-bold text-gray-800">NoteLynx</span> — a place
            where your thoughts find a home.
          </p>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            In a world brimming with information, keeping track of what's
            important can be overwhelming.{' '}
            <span className="font-bold text-gray-800">NoteLynx</span> is your
            serene space amidst the chaos where simplicity meets productivity.
          </p>
          <h4 className="text-gray-700 text-2xl lg:text-left">
            Effortless Note-Taking:
          </h4>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            Craft notes with ease and style them the way you want. Our intuitive
            design makes it simple to keep your focus where it belongs: on your
            ideas.
          </p>
        </div>

        <div className="lg:col-start-2  lg:flex lg:justify-center lg:items-start">
          <img
            src="homepage.svg"
            alt="A visual representation of note-taking"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6 lg:col-start-1 lg:col-span-2 lg:row-start-2 lg:pr-4">
          <h4 className="text-gray-700 text-2xl lg:text-left">
            Organize Your Thoughts:
          </h4>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            Create categories, tag favorites, and search with ease. Say goodbye
            to the clutter of unorganized thoughts and hello to a perfectly
            ordered collection of notes.
          </p>
          <h4 className="text-gray-700 text-2xl lg:text-left">
            Access Anywhere, Anytime:
          </h4>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            Your notes sync across devices, ensuring you have access to them
            whether you’re on a laptop at a café or on your phone while on the
            move.
          </p>
        </div>
        <div className="space-y-6 lg:col-start-1 lg:col-span-2 lg:row-start-3 lg:pr-4">
          <h4 className="text-gray-700 text-2xl lg:text-left">
            Security You Can Trust:
          </h4>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            With state-of-the-art encryption and privacy features, rest easy
            knowing your data is secure and accessible only to you.
          </p>
          <h4 className="text-gray-700 text-2xl lg:text-left">
            A Canvas for Collaboration:
          </h4>
          <p className="text-[#7f8c8d] text-justify lg:text-left">
            Work together with colleagues or friends in real time. Share ideas,
            make plans, and bring your collective creativity to life.
            <br />
            <span className="font-bold text-gray-800">NoteLynx</span> is more
            than just a note app; it's a tool to make your daily life more
            productive, your work more efficient, and your personal thoughts
            securely stored.
            <br />
            Begin your journey to a more organized life today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
