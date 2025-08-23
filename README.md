# AlgoMentor: Socratic AI for Algorithm Mastery

![AlgoMentor Logo](/public/images/logo.png)

**Transform your algorithm learning journey with AI-powered Socratic dialogue**


[🚀 Live Demo](https://algomentor.vercel.app) | [📖 Documentation](#documentation) | [💡 Features](#features) | [🤝 Contributing](#contributing)


---

## 📋 Table of Contents

- [🌟 Overview](#overview)
- [✨ Key Features](#key-features)
- [🛠️ Technology Stack](#technology-stack)
- [📸 Screenshots](#screenshots)
- [🚀 Quick Start](#quick-start)
- [📖 Usage Guide](#usage-guide)
- [🏗️ Project Structure](#project-structure)
- [🤝 Contributing](#contributing)
- [📈 Roadmap](#roadmap)
- [📄 License](#license)
- [👥 Contributors](#contributors)
- [📞 Support](#support)

---

## 🌟 Overview

**AlgoMentor** is a revolutionary Socratic AI-driven educational platform that transforms how students learn algorithms and data structures. Powered by Google's advanced Gemini 2.5 Flash model, AlgoMentor acts as your personal AI mentor, guiding you through complex algorithmic concepts using the time-tested Socratic method of learning.

### 🎯 Mission
To democratize algorithm education by providing personalized, interactive, and engaging learning experiences that adapt to each learner's pace and understanding level.

### 🏆 Why AlgoMentor?
- **🧠 Intelligent Learning**: AI asks the right questions at the right time
- **📈 Adaptive Progress**: Learns your strengths and adjusts accordingly
- **💬 Interactive Dialogue**: No passive learning—active engagement only
- **🎓 Proven Methodology**: Based on Socratic teaching principles
- **🌍 Accessible**: Available 24/7, anywhere in the world

---

## ✨ Key Features

### 🤖 Socratic AI Learning
- **Guided Discovery**: AI asks probing questions to help you discover solutions
- **Conceptual Understanding**: Focus on 'why' and 'how' rather than memorization
- **Real-time Adaptation**: Difficulty adjusts based on your responses
- **Critical Thinking**: Develops problem-solving skills through guided inquiry

### 📚 Comprehensive Algorithm Coverage
- **50+ Algorithms**: From basic sorting to advanced graph algorithms
- **Multiple Categories**: Sorting, Searching, Dynamic Programming, Greedy, Graph Theory
- **Difficulty Levels**: Easy, Medium, Hard progression paths
- **Time Complexity Analysis**: Deep understanding of algorithmic efficiency

### 🎮 Interactive Learning Experience
- **Conversation History**: Never lose your learning progress
- **Visual Examples**: Interactive demonstrations and explanations
- **Progress Tracking**: Monitor your learning journey
- **Personalized Feedback**: Immediate, actionable insights

### 🔒 User Management & Security
- **Secure Authentication**: User accounts with encrypted data
- **Learning Analytics**: Track progress and identify improvement areas
- **Privacy-First**: Your learning data stays protected
- **Cross-Device Sync**: Continue learning from any device

### 🎨 Modern User Interface
- **Responsive Design**: Perfect experience on all devices
- **Dark/Light Themes**: Customizable appearance
- **Accessibility**: WCAG compliant for inclusive learning
- **Intuitive Navigation**: Clean, distraction-free interface

---

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14+](https://nextjs.org/)** - React framework with server-side rendering
- **[React 18](https://reactjs.org/)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Modern component library

### Backend & AI
- **[Google Gemini 2.5 Flash](https://ai.google.dev/)** - Advanced language model
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Server-side API
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling

### Development & Deployment
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

---

## 📸 Screenshots


### 🏠 Home Page
![Home Page](/public/images/cover-image.png)

### 💬 Interactive Learning
![Learning Interface](/public/images/ai-chat-page.png)

### 📊 Progress Dashboard
![Dashboard](/public/images/dashboard-page.png)

### 📱 Mobile Experience
<img src="https://via.placeholder.com/300x600/f3f4f6/374151?text=Mobile+View" alt="Mobile View" width="300">


---

## 🚀 Quick Start

Get AlgoMentor running locally in under 5 minutes!

```bash
# 1. Clone the repository
git clone https://github.com/jatinkaushik-jk/algo-mentor.git
cd algo-mentor

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.sample .env.local
# Edit .env.local with your API keys

# 4. Run the development server
npm run dev

# 5. Open http://localhost:3000
```

That's it! 🎉 AlgoMentor should now be running locally.

---


## 📖 Usage Guide

### 🎯 Getting Started with Learning

1. **Create an Account**: Sign up to track your progress
2. **Pick an Algorithm**: Browse our comprehensive algorithm library
3. **Start Learning**: Engage with your AI mentor through questions
4. **Track Progress**: Monitor your understanding and improvement

### 💬 Interacting with the AI Mentor

#### Best Practices for Effective Learning:
- **Be Specific**: Ask detailed questions about concepts you don't understand
- **Think Aloud**: Share your thought process with the AI
- **Ask "Why"**: Don't just accept answers—understand the reasoning
- **Request Examples**: Ask for practical applications and variations
- **Challenge Yourself**: Request increasingly difficult problems

#### Example Learning Session:
```
You: I want to learn about bubble sort
AI: Great choice! Before we dive in, what do you think sorting means in computer science?
You: Arranging elements in a specific order?
AI: Excellent! Now, if you had a deck of cards, how might you sort them manually?
...
```

### 📊 Tracking Your Progress

- **Algorithm Mastery**: See which algorithms you've completed
- **Time Spent**: Monitor your learning time investment
- **Difficulty Progression**: Track your advancement through levels
- **Conversation History**: Review past learning sessions
- **Strengths & Weaknesses**: Identify areas for improvement

---

## 🏗️ Project Structure

```
algo-mentor/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (auth)/            # Authentication pages
│   │   ├── 📁 algorithms/         # Algorithm pages
│   │   ├── 📁 dashboard/          # User dashboard
│   │   ├── 📁 learn/              # Learning interface
│   │   └── 📁 api/                # API routes
│   │       ├── 📁 auth/           # Authentication endpoints
│   │       ├── 📁 algorithms/     # Algorithm data endpoints
│   │       └── 📁 chat/           # AI chat endpoints
│   ├── 📁 components/             # Reusable UI components
│   │   ├── 📁 ui/                 # Shadcn/UI components
│   │   ├── 📁 auth/               # Authentication components
│   │   ├── 📁 learning/           # Learning interface components
│   │   └── 📁 dashboard/          # Dashboard components
│   ├── 📁 lib/                    # Utility libraries
│   │   ├── 📄 mongodb.ts          # Database connection
│   │   ├── 📄 gemini.ts           # AI model integration
│   │   └── 📄 utils.ts            # Helper functions
│   ├── 📁 models/                 # Database schemas
│   │   ├── 📄 User.ts             # User model
│   │   ├── 📄 Conversation.ts     # Chat history model
│   │   └── 📄 Progress.ts         # Learning progress model
│   ├── 📁 data/                   # Static data
│   │   └── 📄 algorithms.ts       # Algorithm definitions
│   └── 📁 types/                  # TypeScript definitions
├── 📁 public/                     # Static assets
├── 📁 docs/                       # Documentation
├── 📄 package.json                # Dependencies
├── 📄 tsconfig.json               # TypeScript config
├── 📄 tailwind.config.js          # Tailwind CSS config
├── 📄 next.config.js              # Next.js config
└── 📄 README.md                   # This file
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🚀 Quick Contribution Guide

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: `git commit -m 'Add amazing feature'`
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### 📝 Contribution Guidelines

#### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages

#### Pull Request Process
1. Ensure your PR description clearly describes the problem and solution
2. Include the relevant issue number if applicable
3. Make sure there is no typescript and Eslint errors
4. Update documentation if needed

#### Types of Contributions
- 🐛 **Bug Fixes**: Help us squash bugs
- ✨ **New Features**: Add exciting new functionality
- 📚 **Documentation**: Improve our docs
- 🎨 **UI/UX**: Enhance user experience
- 🔧 **Performance**: Optimize existing code

### 🐛 Reporting Issues

When reporting issues, please include:
- **Clear Description**: What happened vs. what you expected
- **Steps to Reproduce**: How can we recreate the issue?
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

---

## 📈 Roadmap

### 🎯 Current Sprint (v1.1)
- [ ] **Socratic Learning**: AI chat interaction with socratic learning methodology
<!-- - [ ] **Algorithm Visualizations**: Interactive visual representations -->
- [ ] **Web App**: Next JS based web app
- [ ] **Progress Analytics**: Advanced learning analytics dashboard

### 🚀 Next Quarter (v1.2)
- [ ] **Community Support**: Interact and Collaborate with innovative minds
- [ ] **Gamification**: Points, badges, and leaderboards
- [ ] **Advanced Algorithms**: Graph theory, dynamic programming
- [ ] **Multi-language Support**: Support for multiple programming languages

### 🌟 Long-term Vision (v2.0)
- [ ] **AI Tutor Customization**: Personalized teaching styles
- [ ] **Integration Platform**: Connect with coding platforms
- [ ] **Enterprise Features**: Classroom management for educators
- [ ] **Advanced Analytics**: ML-powered learning insights

### 📊 Feature Requests
Vote on upcoming features in our [GitHub Discussions](https://github.com/jatinkaushik-jk/algo-mentor/discussions)!

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Jatin Kaushik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👥 Contributors


### 🙏 Thank you to all our amazing contributors!

<a href="https://github.com/jatinkaushik-jk/algo-mentor/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jatinkaushik-jk/algo-mentor" />
</a>

### 💫 Special Thanks
- **Google AI Team** for the incredible Gemini model
- **Next.js Team** for the amazing framework
- **Open Source Community** for inspiration and support


---

## 📞 Support

### 🆘 Need Help?

- **📧 Email**: [connect.jatinkaushik@gmail.com](mailto:support@algomentor.com)
<!-- - **💬 Discord**: [Join our community](https://discord.gg/algomentor) -->
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/jatinkaushik-jk/algo-mentor/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/jatinkaushik-jk/algo-mentor/discussions)
<!-- - **📖 Documentation**: [docs.algomentor.com](https://docs.algomentor.com) -->

### 🌐 Connect with Us


[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jatinkaushik-jk)  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jatinkaushik-jk)
<!-- [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/jatinkaushik_jk) -->


---


### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jatinkaushik-jk/algo-mentor&type=Date)](https://star-history.com/#jatinkaushik-jk/algo-mentor&Date)

**Made with ❤️ by [Jatin Kaushik](https://github.com/jatinkaushik-jk)**

*Empowering the next generation of algorithm masters through AI-driven education*

[![Back to Top](https://img.shields.io/badge/Back%20to%20Top-000000?style=for-the-badge&logo=github&logoColor=white)](#-algomentor-socratic-ai-for-algorithm-mastery)
