import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}' 
  ],
  theme: {
    extend: {
      fontFamily: {
      // Keeps Geist as the default sans-serif font
      sans: ['var(--font-geist-sans)', 'sans-serif'],
      // Creates a new class specifically for Aeonik
      aeonik: ['var(--font-aeonik)', 'sans-serif'], 
      // Creates a new class specifically for Aeonik
      geistMono: ['var(--font-geistMono)', 'sans-serif'], 
      // Creates a new class specifically for Teachers
      teachers: ['var(--font-teachers)', 'sans-serif'], 
      // Creates a new class specifically for Montserrat
      montserrat: ['var(--font-montserrat)', 'sans-serif'], 
    },
      keyframes: {
        roundedTransition: {
          '0%, 100%': {
            borderRadius: '100%',
            width: '5%',
            height: '5%',
          },
          '50%': {
            borderRadius: '0%',
            width: '100%',
            height: '100%',
          },
        },
      },
      animation: {
        roundedTransition: 'roundedTransition 4s ease-in-out infinite',
      },
      objectFit: ['responsive', 'hover', 'focus'],
      colors: {
        // Hardcoded DUSACORE colors
        appWhite: '#FFFFFF',
        appBlack: '#000000',
        
        // Deep Purple (Buttons, Headers, Core Accents)
        appPurple: '#8300AF',
        appTitleBgColor: '#8300AF', 
        appBanner: '#8300AF',       
        
        // Light Purple (Footers, Backgrounds, Soft accents)
        appLightPurple: '#F3CFFF',
        
        // Darker Nav Purple
        appNav: '#6A008F',          
        
        // Utility colors
        appRed: '#FF0000',
        appYellow: '#EEF21C',
        appLightBlack: '#1C1C1C',
        appBlue: '#000033',
        applightBlue: '#B4FFF9',
      },
      boxShadow: {
        'custom': '10px 10px 30px rgba(0, 0, 0, 0.3)', 
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}
export default config