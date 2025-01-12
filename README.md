<div align="center">
  
  ![PawLog Logo](https://github.com/Rongbin99/PawLog/blob/main/paw-log/public/logo.png)
  
</div>

# 🐾 PawLog
## 💡 Inspiration
When caring for our pets, our family often asks, “*Have you walked the dogs?*” or “*Have you fed the dogs?*” After hearing these questions repeatedly, we realized the need for a better way to stay organized. This inspired us to create a platform that tracks pet-caring tasks, ensuring everyone is on the same page.
As we brainstormed, we recognized that pets also foster a sense of community. This led us to expand our idea, creating a space where pet owners can share updates, celebrate their pets, and connect. We aim to simplify pet care while building a supportive, pet-loving community.

## 🛠️ What It Does
PawLog helps pet owners track key details about their pets' well-being.

_Key Features:_
- 🐶Add and personalize your pets: Add your pet’s name and upload a custom picture (which can be updated later).
- 📅Track daily routines: Log entries for food and water intake, bathroom breaks, and medication schedules.
- ⏳Real-time status updates: Monitor your pet’s hunger and thirst levels, which gradually decrease overtime.
- 🔐Secure access: With Auth0 integration, users can securely log in and manage their personalized pet profiles.

## 🔨 How We Built It
PawLog was built using a modern tech stack designed for scalability and performance:
- Frontend: **Next.js** for a dynamic, responsive user interface.
- Styling: **Tailwind CSS** and external **npm** libraries for a clean, customizable design.
- Backend: **MongoDB** for database management and Express.js for handling API routes.
- Authentication: **Auth0** for secure login and user management.
- State Management: React Hooks (useState, useEffect) to ensure seamless, real-time updates as users interact with their pets.
Our tech stack enabled us to create a secure, user-friendly app that offers persistent data storage and dynamic UI updates.

## 🧗‍♂️ Challenges We Ran Into
- Auth0 Integration: Setting up secure login and linking tokens to our database as this was our first time using Auth0 with Next.js.
- Database Connection: Setting up and ensuring smooth API endpoint communication between the backend and MongoDB.
- Merge Conflicts: Handling multiple code merges during collaborative development with Git.

## 🏆 Accomplishments That We’re Proud Of
- Seamless Authentication: Successfully integrated Auth0, enabling a secure and personalized user experience.
- Dynamic UI Components: Created a responsive grid system that adapts to different numbers of pets without compromising visual layout.
- Persistent Storage: Implemented MongoDB for reliable data storage, ensuring pet data is saved across sessions.
- User-Friendly Interface: Designed an appealing, practical interface that makes pet care tracking both efficient and enjoyable.

## 📚 What We Learned
- How to manage dynamic UI layouts in Next.js using React components and Tailwind CSS.
- The importance of UX design when handling dynamically added components like pets.
- How to establish secure connections to MongoDB and manage API routes effectively.
- The value of good coding practices to create modular code for efficient codebase management.
- Collaborative coding practices to minimize and resolve merge conflicts via rebasing and topic branches.

## 🚀 What's Next for PawLog
We’re excited to continue improving PawLog and enhancing the user experience:
Future Features:
- 📸 Photo Sharing: Allow users to post daily photos of their pets, creating a feed where the community can view, share, and engage.
- 📍 Neighborhood Updates: Enable users to share local updates such as lost pet alerts, pet-friendly spots, and reports on local hazards.
- 🤖 AI-Powered Support: Implement an AI assistant to answer pet-related questions, provide personalized care tips, and recommend feeding schedules, hydration levels, and exercise routines.
- 📊 Data Analytics: Add insights to show trends in pet care habits, such as average feeding times and hydration patterns, helping users better understand their pets’ needs.
- 📝 Custom Diary Categories: Give users the ability to create their own custom categories for diary entries, such as grooming schedules, playtime logs, or behavioural observations, making the app more flexible to their unique pet care routines.
Our goal is to transform PawLog from a simple pet care tracker into an intelligent, community-centred assistant that makes caring for pets easier, more organized, and more social.

<hr/>

Thank you for checking out PawLog! 🐶🐱 We look forward to building a stronger pet-loving community with you!
