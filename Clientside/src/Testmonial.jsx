import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    rating: 4,
    quote: "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
    avatar: "https://png.pngtree.com/png-vector/20241002/ourlarge/pngtree-muslim-girl-wearing-beautiful-hijab-clipart-hd-png-image_14002237.png" // Placeholder image
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    rating: 5,
    quote: "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
    avatar: "https://png.pngtree.com/png-vector/20241002/ourlarge/pngtree-muslim-girl-wearing-beautiful-hijab-clipart-hd-png-image_14002237.png"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    rating: 5,
    quote: "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
    avatar: "https://png.pngtree.com/png-vector/20241002/ourlarge/pngtree-muslim-girl-wearing-beautiful-hijab-clipart-hd-png-image_14002237.png"
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "text-indigo-600" : "text-indigo-200"}>
          ★
        </span>
      ))}
    </div>
  );
};

const Testimonial = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Loved by Creators</h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-12">
          Don't just take our word for it. Here's what our users are saying.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-lg shadow-sm text-left border border-gray-100 flex flex-col justify-between">
              <div>
                <StarRating rating={t.rating} />
                <p className="text-gray-600 leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover grayscale"
                />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{t.name}</h4>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;