interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="bg-background-secondary rounded-xl shadow-medium p-6 hover:shadow-glow transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-subtle mr-4"></div>
        <div>
          <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
          <p className="text-text-sm text-text-muted">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-text-secondary italic">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialCard;