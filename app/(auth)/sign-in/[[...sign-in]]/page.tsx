import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

function SignInFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading sign-in...</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<SignInFallback />}>
          <SignIn 
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'shadow-xl border-0',
                headerTitle: 'text-2xl font-bold text-gray-900 dark:text-white',
                headerSubtitle: 'text-gray-600 dark:text-gray-400',
                socialButtonsBlockButton: 'bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200',
                socialButtonsBlockButtonText: 'text-gray-700 font-medium',
                formButtonPrimary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200',
                formFieldInput: 'border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg px-4 py-3 transition-all duration-200',
                footerActionLink: 'text-purple-600 hover:text-purple-700 font-medium',
                dividerLine: 'bg-gray-300',
                dividerText: 'text-gray-500 bg-white dark:bg-gray-900',
              },
              variables: {
                colorPrimary: '#8b5cf6',
                colorBackground: '#ffffff',
                colorText: '#1f2937',
                borderRadius: '0.5rem',
              },
            }}
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </Suspense>
      </div>
    </div>
  );
}