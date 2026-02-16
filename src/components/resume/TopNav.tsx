import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/builder", label: "Builder" },
  { to: "/preview", label: "Preview" },
  { to: "/proof", label: "Proof" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="text-lg font-bold tracking-tight">
          AI Resume Builder
        </NavLink>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
