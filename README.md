# Twigg 🎓

**Twigg leverages AI to rapidly craft dynamic, personalized courses with adaptive learning, delivering engaging educational experiences tailored to every learner. Learn smarter, faster, and share your courses with Twigg!**

## 🚀 Overview

Twigg is an innovative educational platform built with React Native and Expo that harnesses the power of artificial intelligence to create personalized learning experiences. Our platform enables educators and learners to create, discover, and engage with dynamic courses that adapt to individual learning styles and progress.

### Key Features

- 🤖 **AI-Powered Course Creation** - Automatically generate course content and structure
- 📊 **Adaptive Learning** - Personalized learning paths that adjust to user progress
- 🎯 **Dynamic Content** - Interactive lessons that evolve based on learner engagement
- 📱 **Cross-Platform** - Available on iOS, Android, and Web
- 🔄 **Real-time Progress Tracking** - Monitor learning analytics and achievements
- 🌐 **Course Sharing** - Share and discover courses within the community
- 🎨 **Modern UI/UX** - Beautiful, intuitive interface with smooth animations

## 🛠️ Technology Stack

- **Frontend**: React Native 0.79.1 with TypeScript
- **Framework**: Expo ^53.0.0
- **Navigation**: Expo Router + React Navigation
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Components**: Custom components with Lucide Icons
- **Styling**: Linear Gradients + Custom styling
- **Fonts**: Inter & Poppins via Expo Google Fonts

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (version 18.0.0 or higher)
  ```bash
  # Check your Node.js version
  node --version
  ```
- **npm** or **yarn** package manager
- **Git** for version control
- **Expo CLI** globally installed
  ```bash
  npm install -g @expo/cli
  ```
- **Mobile device** with Expo Go app OR **Android/iOS simulator**

### Development Environment Setup

#### For iOS Development (macOS only):
- **Xcode** (latest version from App Store)
- **iOS Simulator** (included with Xcode)

#### For Android Development:
- **Android Studio** with Android SDK
- **Android Emulator** or physical Android device

## 🚀 Local Development Setup

Follow these detailed steps to get Twigg running on your local machine:

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd twigg

# Verify you're in the correct directory
ls -la
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# Alternative with yarn
# yarn install

# Verify installation
npm list --depth=0
```

### Step 3: Environment Configuration

1. **Create environment file:**
   ```bash
   # Create .env file in the root directory
   touch .env
   ```

2. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable the following services:
     - Authentication (Email/Password)
     - Firestore Database
     - Storage
   - Download the configuration file and add credentials to `.env`:

   ```env
   # Firebase Configuration
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Step 4: Firebase Setup

1. **Initialize Firestore Database:**
   - Go to Firestore Database in Firebase Console
   - Create database in test mode
   - Set up basic collections: `users`, `courses`, `progress`

2. **Configure Authentication:**
   - Enable Email/Password authentication
   - Optionally enable Google/Apple sign-in

3. **Set up Storage:**
   - Enable Firebase Storage for course media files
   - Configure security rules as needed

### Step 5: Start the Development Server

```bash
# Start Expo development server
npm run dev

# Alternative command
# expo start

# For web development specifically
# npm run build:web
```

### Step 6: Run on Device/Simulator

#### Option A: Physical Device
1. Install **Expo Go** app from App Store/Google Play
2. Scan the QR code displayed in terminal/browser
3. App will load on your device

#### Option B: iOS Simulator (macOS only)
```bash
# Press 'i' in the terminal after starting dev server
# Or run directly:
expo start --ios
```

#### Option C: Android Emulator
```bash
# Press 'a' in the terminal after starting dev server
# Or run directly:
expo start --android
```

#### Option D: Web Browser
```bash
# Press 'w' in the terminal after starting dev server
# Or run directly:
expo start --web
```

### Step 7: Verify Installation

1. **Check app loads successfully** on your chosen platform
2. **Test navigation** between tabs (Dashboard, Explore, Create, Profile)
3. **Verify Firebase connection** by attempting to sign up/sign in
4. **Test course creation** and content loading

## 📁 Project Structure

```
twigg/
├── 📱 app/                     # App screens (Expo Router)
│   ├── 🏠 (tabs)/             # Tab navigation screens
│   │   ├── index.tsx          # Dashboard - Course progress & stats
│   │   ├── explore.tsx        # Course catalog & discovery
│   │   ├── create.tsx         # AI-powered course creation
│   │   └── profile.tsx        # User profile & settings
│   ├── 🔐 auth/               # Authentication screens
│   │   ├── login.tsx          # User login
│   │   └── register.tsx       # User registration
│   ├── _layout.tsx            # Root layout configuration
│   └── +not-found.tsx         # 404 error page
├── 🧩 components/             # Reusable UI components
├── 🎣 hooks/                  # Custom React hooks
├── 📝 types/                  # TypeScript type definitions
├── 🛠️ utils/                  # Helper functions & utilities
├── 🎨 assets/                 # Images, fonts, and static files
├── 📦 package.json            # Project dependencies
├── ⚙️ app.json               # Expo configuration
├── 📘 tsconfig.json          # TypeScript configuration
└── 🔧 .prettierrc            # Code formatting rules
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run lint            # Run ESLint for code quality checks

# Building
npm run build:web       # Build optimized web version

# Expo specific
expo start              # Start Expo development server
expo start --clear      # Start with cleared cache
expo install            # Install compatible versions of dependencies
```

## 🔧 Development Workflow

### Making Changes
1. **Hot Reload**: Changes are automatically reflected while dev server runs
2. **TypeScript**: All files use TypeScript for type safety
3. **Linting**: Run `npm run lint` before committing
4. **Testing**: Test on multiple platforms before deployment

### Common Development Tasks

#### Adding New Dependencies
```bash
# Use Expo install for better compatibility
expo install package-name

# For development dependencies
npm install --save-dev package-name
```

#### Debugging
- Use **Flipper** for advanced debugging
- **React Developer Tools** for component inspection
- **Console logs** appear in terminal and browser console

## 🚀 Deployment

### Web Deployment
```bash
# Build for web
npm run build:web

# Deploy to hosting service (Netlify, Vercel, etc.)
```

### Mobile App Deployment
```bash
# Build with EAS (Expo Application Services)
npm install -g eas-cli
eas login
eas build --platform all
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Test on both iOS and Android
- Update documentation for new features

## 🐛 Troubleshooting

### Common Issues

#### Metro bundler issues:
```bash
# Clear Metro cache
expo start --clear
# or
npx react-native start --reset-cache
```

#### Node modules issues:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### Expo CLI issues:
```bash
# Update Expo CLI
npm install -g @expo/cli@latest
```

#### Firebase connection issues:
- Verify `.env` file configuration
- Check Firebase project settings
- Ensure proper authentication rules

## 📚 Learning Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed with ❤️ during a hackathon by the Twigg team.

## 📞 Support

- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Create a feature request issue
- 💬 **Questions**: Start a discussion in the repository

---

**Ready to revolutionize learning with AI? Let's build the future of education together! 🚀**
