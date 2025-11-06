# Atrium - Next.js Authentication Template

A modern Next.js 16.0.1 application template featuring authentication with Better Auth and database management with Drizzle ORM. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **Authentication System**: Complete auth flow with register/login forms
- **Better Auth Integration**: Server-side authentication with session management
- **Internationalization (i18n)**: Multi-language support with English and Slovak
- **Theme System**: Dark/light/system theme support with persistent preferences
- **Drizzle ORM**: Type-safe database operations with SQLite
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Form Validation**: Client-side form handling with error preservation
- **Responsive Design**: Mobile-first responsive layout

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: SQLite with Drizzle ORM
- **Authentication**: Better Auth
- **Internationalization**: next-intl
- **Theme Management**: next-themes
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd atrium
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up the database

```bash
# Generate database schema
pnpm db:generate

# Run migrations
pnpm db:migrate
```

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
atrium/
├── app/                    # Next.js app directory
│   ├── [locale]/          # Localized routes (en, sk)
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Protected dashboard page
│   │   ├── layout.tsx     # Locale layout
│   │   └── page.tsx       # Localized home page
│   ├── i18n/              # Internationalization config
│   │   ├── navigation.ts  # next-intl navigation
│   │   ├── request.ts     # next-intl request config
│   │   └── routing.ts     # Locale routing config
│   ├── messages/          # Translation files
│   │   ├── en.json        # English translations
│   │   └── sk.json        # Slovak translations
│   ├── api/auth/          # Better Auth API routes
│   ├── actions.ts         # Server actions
│   ├── layout.tsx         # Root layout with theme & language switchers
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── language-selector.tsx  # Language switcher component
│   ├── theme-provider.tsx     # Theme system components
│   └── ui/               # shadcn/ui components
├── proxy.ts              # Next.js 16 proxy (middleware)
├── db/                   # Database configuration
│   ├── drizzle/          # Migration files
│   ├── schema/           # Database schemas
│   └── index.ts          # Database instance
├── lib/                  # Utility libraries
│   ├── auth.ts           # Better Auth server config
│   ├── auth-client.ts    # Better Auth client config
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 Theme System

The application includes a comprehensive theme system with dark/light/system theme support:

### Theme Components

- **ThemeProvider**: Wraps the application with theme context
- **ModeToggle**: Dropdown button for theme switching in the header
- **Persistent Storage**: Theme preference is saved in localStorage

### Usage

The theme switcher is automatically available in the top-right corner of all pages. Users can choose between:

- **Light**: Always use light theme
- **Dark**: Always use dark theme
- **System**: Follow system preference (default)

### Implementation

```tsx
// Theme provider setup in layout.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>

// Using theme in components
import { useTheme } from "next-themes"
const { setTheme } = useTheme()
```

## 🌍 Internationalization (i18n)

The application supports multiple languages with next-intl:

### Supported Languages

- **English (en)**: Default language
- **Slovak (sk)**: Secondary language

### Language Components

- **LanguageSelector**: Dropdown button for language switching in the header
- **Routing**: Automatic locale-based routing (`/en/*`, `/sk/*`)
- **Translations**: Organized by page in JSON files

### Translation Files

```
app/messages/
├── en.json    # English translations
└── sk.json    # Slovak translations
```

### Usage

The language switcher is available in the top-right corner next to the theme toggle. When users switch languages:

- Current page content is translated
- URL is updated with locale prefix (except for default English)
- Language preference is maintained during navigation

### Adding Translations

To add new translations:

1. Update both `en.json` and `sk.json` files
2. Use translation keys in components:

```tsx
// Server components
const t = await getTranslations("home")
<h1>{t("title")}</h1>

// Client components  
const t = useTranslations("auth")
<button>{t("signIn")}</button>
```

### Adding New Languages

1. Add locale to `app/i18n/routing.ts`
2. Create new translation file in `app/messages/`
3. Update middleware matcher if needed

## 🔐 Authentication

This template includes a complete authentication system with:

- **Registration**: User sign-up with email, name, and password
- **Login**: Secure user authentication
- **Session Management**: Server-side session handling
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Form Validation**: Client-side validation with error preservation

### Authentication Flow

1. Users visit `/` and see the landing page
2. Click "Login / Register" to navigate to `/auth`
3. Register a new account or sign in with existing credentials
4. Successfully authenticated users are redirected to `/dashboard`
5. Users can log out from the dashboard or main page

## 🗄️ Database Schema

The application uses the following main tables:

- `user`: User account information
- `session`: Authentication sessions
- `account`: OAuth account connections
- `verification`: Email verification tokens

### Database Operations

```bash
# Generate new migration
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Open database studio
pnpm db:studio
```

## 🎨 UI Components

This template uses shadcn/ui components for a modern, accessible interface:

- Forms with validation
- Tabs for auth switching
- Cards for layout
- Alerts for error messages
- Buttons with loading states

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### Better Auth Configuration

The authentication system is configured in `lib/auth.ts` with:

- Email/password authentication
- SQLite database adapter
- Session management with cookies
- Admin plugin support

### Database Configuration

Database settings are in `drizzle.config.ts`:

- SQLite database file location
- Migration directory
- Schema configuration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- SQLite database or configure for PostgreSQL/MySQL
- Environment variables for Better Auth

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Better Auth Documentation](https://better-auth.com/docs) - Authentication setup
- [next-intl Documentation](https://next-intl-docs.vercel.app/) - Internationalization
- [next-themes Documentation](https://github.com/pacocoursey/next-themes) - Theme management
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview) - Database operations
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) - UI components
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Next.js](https://nextjs.org/)
- [Better Auth](https://better-auth.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Drizzle ORM](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
