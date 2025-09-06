1 frontend setup 
2 building the frontend components to interact with the data 
3 installing all the frontend dependencies line by line 
    npm install @radix-ui/react-dialog @radix-ui/react-label
    npm install @radix-ui/react-slot class-variance-authority
    npm install clsx tailwind-merge
    npm install @hookform/resolvers react-hook-form zod
4 run npm run dev to see if all is working properly 
5 set up tailwind.config.ts
6 postcss.config.cjs
7 src/index.css
8 creating utility functions src/lib/utilis.ts
9 building basic ui components (src/components/ui/button.tsx)
10 src/componets/ui/label.tsx defines a custom Label component
11 create a simple test components to check if ui components are working properly
12 update main to test componets 
![alt text](image.png) all is working nice button with lable and other components 
13creating basic app structure (src/app.tsx)

14 creating Toaster system Setup (the toaster system provides user feedback when user creat, edit or delete brew entries)
    toast.tsx core toast ui components
    user-toast.ts hook that manages toast and provides toast functions
    toaster.tsx container that renders all active toasts
    sonner.tsx altenative toast system
15 building the core Toast component (src/components/ui/toast.tsx)
16 building the toast state management (src/hooks/use-toast.tsx)
17 building the alternative toast system (src/components/ui/sonner.tsx)
18 test all toast systems src/components/ui/TestToast.tsx
19 update src/app.tsx to use the toast system

defining a Toast component, which is a notification system for your React app (components/ui/toast.tsx)
defines a Toaster component, which is a notification system for your React app components/ui/toaster
components/ui/sonner
components/ui/tooltip