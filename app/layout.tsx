import type { Metadata } from "next";
import { Geist, Geist_Mono,Outfit } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ThemeProvider } from './contexts/ThemeContext'

const geistSans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Outfit({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genify - AI Content Generator",
  description: "Create amazing content with AI-powered templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
          card: 'shadow-lg border border-gray-200 dark:border-gray-700',
          headerTitle: 'text-2xl font-bold',
          headerSubtitle: 'text-gray-600 dark:text-gray-400',
          socialButtonsBlockButton: 'bg-white border border-gray-300 hover:bg-gray-50',
          socialButtonsBlockButtonText: 'text-gray-700',
          formFieldInput: 'border border-gray-300 focus:border-purple-500 focus:ring-purple-500',
          footerActionLink: 'text-purple-600 hover:text-purple-700',
        },
        variables: {
          colorPrimary: '#8b5cf6',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
