/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'fixed', 'absolute', 'relative',
    'top-0', 'top-2', 'top-4', 'bottom-0', 'bottom-2', 'bottom-4',
    'left-0', 'left-2', 'left-4', 'right-0', 'right-2', 'right-4',
    'z-10', 'z-20', 'z-30', 'z-40', 'z-50',
    {
      pattern: /^(p|m|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr)-(0|1|2|3|4|5|6|8|10|12)$/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /^(bg|text|border)-(green|red|yellow|blue|gray)-(100|200|300|400|500|600|700|800|900)$/,
      variants: ['hover', 'focus'],
    },
    'flex', 'items-center', 'justify-center', 'justify-between', 'justify-around',
    'rounded', 'rounded-lg', 'rounded-xl', 'shadow-lg', 'shadow-xl',
    'transition', 'duration-300', 'ease-in-out',
    'font-medium', 'font-semibold', 'font-bold', 'text-sm', 'text-base', 'text-lg',
  ]
}

