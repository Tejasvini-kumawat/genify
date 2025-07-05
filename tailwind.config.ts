// @ts-ignore
const config = {
  content: {
    files: [
      './app/**/*.{ts,tsx}',           // app directory (Next.js 13+)
      './pages/**/*.{ts,tsx}',         // pages directory (if used)
      './components/**/*.{ts,tsx}',    // custom components
      './src/**/*.{ts,tsx}',           // optional if using `src/`
      './node_modules/@shadcn/ui/**/*.{ts,tsx}', // for shadcn/ui components
    ],
    // @ts-ignore - safelist is valid in Tailwind v4
    safelist: [
      // Button variant classes
      "bg-primary", "text-primary-foreground", "hover:bg-primary/90",
      "bg-secondary", "text-secondary-foreground", "hover:bg-secondary/80",
      "bg-destructive", "text-white", "hover:bg-destructive/90",
      "bg-accent", "text-accent-foreground", "hover:bg-accent", "hover:text-accent-foreground",
      "bg-background", "bg-input/30", "bg-input/50",
      "border", "shadow-xs", "rounded-md",
      "focus-visible:ring-destructive/20", "dark:focus-visible:ring-destructive/40",
      "dark:bg-destructive/60", "dark:bg-input/30", "dark:border-input", "dark:hover:bg-input/50",
      "text-primary", "underline-offset-4", "hover:underline",
      // Add any other classes used in your buttonVariants
    ],
  },
  theme: {
    extend: {
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#3b82f6',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
