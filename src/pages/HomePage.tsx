import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TopNav } from "@/components/resume/TopNav";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Build a Resume
            <br />
            That Gets Read.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            A clean, structured resume builder designed for clarity. Fill in your
            details, preview in real time, and ship with confidence.
          </p>
          <Button
            size="lg"
            className="mt-8 px-8 text-base"
            onClick={() => navigate("/builder")}
          >
            Start Building <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
