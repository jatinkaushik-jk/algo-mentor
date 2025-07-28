
const FeaturesSection = () => {
  return (
    <section id="features" className="py-8 my-10 text-center">
            <h2 className="text-4xl font-semibold">Why Choose AlgoMentor?</h2>
            <p className="text-lg mt-4">
              Unlock your coding potential with personalized, AI-driven
              insights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-20">
              <div>
                <h3 className="text-xl font-semibold">
                  Learn at Your Own Pace
                </h3>
                <p className="mt-2 ">
                  Whether you&apos;re a beginner or an advanced coder,
                  AlgoMentor tailors the learning experience to your needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Instant Feedback</h3>
                <p className="mt-2 ">
                  Get immediate insights on your progress and understand where
                  you can improve.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Hands-on Practice</h3>
                <p className="mt-2 ">
                  Solve real-world problems and get guided solutions that will
                  help you crack the toughest interviews.
                </p>
              </div>
            </div>
          </section>
  )
}

export default FeaturesSection