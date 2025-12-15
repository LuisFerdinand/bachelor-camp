import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-sky-100 px-4 py-10">
      <SignUp
        appearance={{
          elements: {
            // Card
            card: "bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200 rounded-2xl px-6 py-8 max-w-md w-full",

            // Header
            headerTitle: "text-2xl font-semibold text-slate-900",
            headerSubtitle: "text-sm text-slate-500",

            // Social Buttons
            socialButtonsBlockButton:
              "rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 py-2 text-sm font-medium",

            // Divider
            dividerLine: "bg-slate-200",
            dividerText: "text-slate-400 text-xs",

            // Inputs
            formFieldInput:
              "rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 py-2",

            // Primary button
            formButtonPrimary:
              "rounded-xl bg-sky-600 hover:bg-sky-700 transition-all duration-200 py-2 font-medium text-white w-full",

            // Footer
            footerActionText: "text-slate-600 text-sm",
            footerActionLink:
              "text-sky-600 hover:text-sky-700 font-medium hover:underline",
          },

          // Global theme (spacing, fonts)
          layout: {
            socialButtonsPlacement: "top",
            helpPageUrl: "",
            shimmer: true,
          },
        }}
      />
    </div>
  );
}
