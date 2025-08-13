import { motion } from 'framer-motion';

const Testimonials = () => {
  const feedbacks = [
    {
      name: "Rahima Akter",
      comment: "Thanks to this platform, I was able to share leftover food easily!",
      img: "https://i.pravatar.cc/100?u=rahima",
    },
    {
      name: "Anik Das",
      comment: "Got fresh food when I needed it most. Forever grateful.",
      img: "https://i.pravatar.cc/100?u=anik",
    },
  ];
  return (
    <section className="py-10 bg-gray-50 mt-22">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        What People Say
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-6 px-6 max-w-5xl mx-auto">
        {feedbacks.map((f, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <img src={f.img} alt={f.name} className="w-12 h-12 rounded-full" />
              <h4 className="font-bold">{f.name}</h4>
            </div>
            <p className="italic text-gray-600">"{f.comment}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
