import { Tour } from "nextstepjs";

export const TourSteps: Tour[] = [
  {
    tour: 'dashboard-tour',
    steps: [
      // {
      //   icon: <>📊</>,
      //   title: 'Welcome to Your Dashboard',
      //   content: (
      //     <>
      //       <p className="mb-2">
      //         This is your personal learning dashboard where you can track your progress, manage your learning streak, and discover new algorithms.
      //       </p>
      //       <p className="text-sm text-gray-600 dark:text-gray-400">
      //         Let&apos;s take a quick tour to show you what you can do here.
      //       </p>
      //     </>
      //   ),
      //   selector: 'body',
      //   side: 'bottom',
      //   showControls: true,
      //   showSkip: true,
      //   pointerPadding: 10,
      //   pointerRadius: 10,
      // },
      {
        icon: <>⚡</>,
        title: 'Algorithm Collections',
        content: (
          <>
            <p className="mb-2">
              Choose from our curated collections to start your learning journey. Each collection focuses on specific algorithm patterns and techniques.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hover over any collection to see more details.
            </p>
          </>
        ),
        selector: '#algorithm-cards',
        side: 'bottom',
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>📋</>,
        title: 'Algorithm Table',
        content: (
          <>
            <p className="mb-2">
              Browse all available algorithms with filters and sorting options. Track your completion status and difficulty levels.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the search and filter tools to find algorithms that match your learning goals.
            </p>
          </>
        ),
        selector: '#algorithm-table',
        side: 'right',
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>🔥</>,
        title: 'Your Streak Tracker',
        content: (
          <>
            <p className="mb-2">
              This shows your current learning streak in days. Keep the flame burning by practicing algorithms daily!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consistency is key to mastery. Challenge yourself to maintain your streak.
            </p>
          </>
        ),
        selector: '#streak_tab',
        side: 'bottom',
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>📅</>,
        title: 'Calendar & Activity Tracker',
        content: (
          <>
            <p className="mb-2">
              This calendar displays your learning activity throughout the month. Each highlighted day represents when you solved problems.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click on any date to see the algorithms you solved that day.
            </p>
          </>
        ),
        selector: '#calender_tab',
        side: 'left',
        pointerPadding: 10,
        pointerRadius: 10,
      },
      {
        icon: <>📚</>,
        title: 'Recent Learnings',
        content: (
          <>
            <p className="mb-2">
              Quick access to your recent algorithm solutions. See what you&apos;ve been working on lately.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click on any item to view the complete problem and your solution.
            </p>
          </>
        ),
        selector: '#recent_learnings',
        side: 'left',
        pointerPadding: 10,
        pointerRadius: 10,
      },
      
      // {
      //   icon: <>✨</>,
      //   title: `You're All Set!`,
      //   content: (
      //     <>
      //       <p className="mb-2">
      //         You now know the basics of your dashboard. Start exploring algorithms and building your skills!
      //       </p>
      //       <p className="text-sm text-gray-600 dark:text-gray-400">
      //         Remember: every problem you solve brings you closer to mastery. Happy learning! 🚀
      //       </p>
      //     </>
      //   ),
      //   selector: 'body',
      //   side: 'bottom',
      //   showControls: true,
      //   showSkip: true,
      //   pointerPadding: 10,
      //   pointerRadius: 10,
      // },
    ],
  },
]