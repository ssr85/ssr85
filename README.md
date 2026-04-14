# SSR Website - Portfolio of Sarabjeet Rattan

B2B AI Specialist & Industrial Hemp Consultant.

## Project Info

- **Domain**: [sarabjeetrattan.com](https://sarabjeetrattan.com)
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase

## Local Development

Prerequisites: Node.js (v20+), pnpm.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ssr85/ssr85.git
    cd ssr85
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Environment Variables**:
    Create a `.env` file with the following placeholders (see `.env.example` if available):
    - `VITE_RECAPTCHA_SITE_KEY`
    - `RECAPTCHA_SECRET_KEY`
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_PUBLISHABLE_KEY`

4.  **Start development server**:
    ```bash
    pnpm run dev
    ```

## Deployment

This project is deployed on **Vercel**.

1.  **Environment Variables**: Ensure all variables from `.env` are set in the Vercel Dashboard.
2.  **Push to `main`**: Any push to the `main` branch triggers an automatic deployment.
3.  **Manual Deploy**:
    ```bash
    vercel --prod
    ```

## Technologies Used

- **Frontend**: React 18, Vite, TypeScript, React Hook Form, Zod.
- **UI Components**: shadcn/ui (Radix UI), Lucide Icons, Framer Motion.
- **Data Management**: TanStack Query (React Query), Supabase client.
- **Analytics**: Vercel Analytics.
- **SEO**: Static Site Generation (SSG) via `vite-react-ssg`.
