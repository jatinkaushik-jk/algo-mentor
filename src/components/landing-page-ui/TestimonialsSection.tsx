import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const testimonials = [
  {
    quote:
      "AlgoMentor helped me improve my coding skills in record time. The personalized feedback is amazing!",
    author: "Aditi",
    role: "Software Engineer",
  },
  {
    quote:
      "The AI-powered lessons make learning algorithms so much easier and fun!",
    author: "Ravi",
    role: "Data Scientist",
  },
  {
    quote:
      "From beginner to advanced, AlgoMentor guided me through every step. Highly recommend it!",
    author: "Sarah",
    role: "CS Student",
  },
];
const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative py-8 p-4 text-center my-20 bg-primary w-full overflow-y-clip"
    >
      <div className="absolute top-0 -left-20 z-[-1] w-screen h-full bg-primary"></div>
      {/* <h2 className="text-4xl font-semibold ">What Our Users Say</h2> */}
      <div className="flex items-center justify-center gap-x-4">
        <div className="relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-primary via-primary backdrop-blur-sm blur-sm to-primary/70"></div>
        <div className="w-full h-96 overflow-y-scroll scrollbar-hidden">
          <div className="flex flex-col gap-y-8 mt-20">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-primary via-primary backdrop-blur-sm blur-sm to-primary/70"></div>
      </div>
      <div>
        <h2 className="text-4xl font-semibold text-white">What Our Users Say</h2>
      </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) => {
  return (
    <Card className="w-1/2">
      <CardHeader>{author}</CardHeader>
      <CardContent>{quote}</CardContent>
      <CardFooter>{role}</CardFooter>
    </Card>
  );
};

export default TestimonialsSection;
