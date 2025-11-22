import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
          <Heart className="h-7 w-7 fill-primary text-primary" />
          <span className="text-2xl font-bold tracking-tight text-foreground">HAIN</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/campaigns">
            <Button variant="ghost" className="font-medium">
              Browse Campaigns
            </Button>
          </Link>
          <Link to="/create">
            <Button className="font-semibold">
              Start a Campaign
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
