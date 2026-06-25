import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-card py-28 text-center shadow-sm ring-1 ring-foreground/5">
      <h1 className="text-5xl font-semibold text-primary">404</h1>
      <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Button asChild className="rounded-full shadow-sm">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
