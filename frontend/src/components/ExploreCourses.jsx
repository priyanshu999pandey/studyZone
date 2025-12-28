import React from "react";

const courses = [
  {
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    link: "/courses/web-development",
  },
  {
    title: "UI / UX Design",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    link: "/courses/ui-ux",
  },
  {
    title: "Java Full Stack",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "/courses/java-fullstack",
  },
  {
    title: "Data Structures",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    link: "/courses/dsa",
  },
  {
    title: "Machine Learning",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    link: "/courses/ml",
  },
  {
    title: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "/courses/cloud",
  },
];

const ExploreCourses = () => {
  return (
    <section className="w-full px-6 py-16 bg-primary dark:bg-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Learn in-demand skills with our expertly crafted courses.
            Choose from development, design, and advanced technology tracks
            to upgrade your career and build real-world projects.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <a
              key={index}
              href={course.link}
              className="group rounded-xl overflow-hidden bg-secondary dark:bg-surface-muted shadow hover:shadow-lg transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  {course.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreCourses;
