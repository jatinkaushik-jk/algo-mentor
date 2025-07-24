
const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-8 text-center my-20">
            <h2 className="text-4xl font-semibold ">What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
              <div className=" p-6 rounded-lg shadow-md bg-purple-400 text-black">
                <p className="text-lg">
                  &quot;AlgoMentor helped me improve my coding skills in record
                  time. The personalized feedback is amazing!&quot;
                </p>
                <p className="mt-4 font-semibold">— Aditi, Software Engineer</p>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-purple-400 text-black">
                <p className="text-lg">
                  &quot;The AI-powered lessons make learning algorithms so much
                  easier and fun!&quot;
                </p>
                <p className="mt-4 font-semibold">— Ravi, Data Scientist</p>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-purple-400 text-black">
                <p className="text-lg">
                  &quot;From beginner to advanced, AlgoMentor guided me through
                  every step. Highly recommend it!&quot;
                </p>
                <p className="mt-4 font-semibold">— Sarah, CS Student</p>
              </div>
            </div>
          </section>
  )
}

export default TestimonialsSection