import { StarHalfIcon, StarIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    quote:
      "AlgoMentor helped me improve my coding skills in record time. The personalized feedback is amazing!",
    author: "Aditi",
    role: "Software Engineer",
    avatar: "/path/to/avatar1.jpg",
  },
  {
    quote:
      "The AI-powered lessons make learning algorithms so much easier and fun!",
    author: "Ravi Dubey",
    role: "Data Scientist",
    avatar: "/path/to/avatar2.jpg", 
  },
  {
    quote:
      "From beginner to advanced, AlgoMentor guided me through every step. Highly recommend it!",
    author: "Sarah",
    role: "CS Student",
    avatar: "/path/to/avatar3.jpg",
  },
  {
    quote:
      "AlgoMentor's socratic approach of teaching algorithms is both effective and enjoyable. I've learned so much!",
    author: "Vamika",
    role: "CS Student",
    avatar: "/path/to/avatar4.jpg",
  },
];
const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative py-8 p-4 text-center my-20 bg-primary w-full overflow-y-clip"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-1] w-[105vw] h-full bg-primary"></div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-8">
        <div className="relative">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-primary via-primary backdrop-blur-sm blur-sm to-primary/80 z-10">
        <div className="w-full h-1/3 bg-primary absolute -top-3"></div>
        </div>
        <div className="w-full h-[400px] overflow-y-hidden scrollbar-hidden p-4">
          <div className="flex flex-col gap-y-8 my-16 py-16 h-max animate-auto-scroll">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-primary via-primary backdrop-blur-sm blur-sm to-primary/80">
        <div className="w-full h-1/3 bg-primary absolute -bottom-3"></div>
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-semibold text-white">What Our Users Say</h2>
        <p className="text-gray-300 mt-2">
          Our users love AlgoMentor! Here&apos;s what they have to say:
        </p>
        <div className="flex items-center justify-center mt-4 gap-x-1">
          <StarIcon size={16} className="fill-yellow-500 text-yellow-500"/>
          <StarIcon size={16} className="fill-yellow-500 text-yellow-500"/>
          <StarIcon size={16} className="fill-yellow-500 text-yellow-500"/>
          <StarIcon size={16} className="fill-yellow-500 text-yellow-500"/>
          <StarHalfIcon size={16} className="fill-yellow-500 text-yellow-500"/>
          <span className="text-gray-300">4.5/5</span>
        </div>
      </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
}: {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}) => {
  return (
    <Card className="min-w-72 max-w-md m-2">
      <CardContent className="flex flex-row items-center gap-4 p-4 py-12">
        <div>
          <Avatar className="w-20 h-20 m-2">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback >{author.split(" ").map((name) => name[0]).join("")}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="italic">&quot;{quote}&quot;</p>
          <p className="italic text-gray-600 text-sm mt-4">{author} - {role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;
