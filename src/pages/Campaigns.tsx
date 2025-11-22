import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Campaigns = () => {
  const campaigns = [
    {
      id: 1,
      title: "Help Luna Fight Cancer",
      description: "Luna, a 5-year-old golden retriever, needs urgent treatment for lymphoma.",
      raised: 3500,
      goal: 8000,
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&auto=format&fit=crop",
      category: "Medical",
    },
    {
      id: 2,
      title: "Rescue Street Cats",
      description: "Fund medical care and shelter for abandoned cats in our community.",
      raised: 2100,
      goal: 5000,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop",
      category: "Rescue",
    },
    {
      id: 3,
      title: "Save Max's Life",
      description: "Max was hit by a car and needs emergency surgery to walk again.",
      raised: 5800,
      goal: 6500,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop",
      category: "Emergency",
    },
    {
      id: 4,
      title: "Sanctuary for Retired Horses",
      description: "Help us build a sanctuary for horses retired from racing and work.",
      raised: 12000,
      goal: 25000,
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop",
      category: "Shelter",
    },
    {
      id: 5,
      title: "Wildlife Rehabilitation Center",
      description: "Support our center caring for injured wildlife and preparing them for release.",
      raised: 8500,
      goal: 15000,
      image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&auto=format&fit=crop",
      category: "Wildlife",
    },
    {
      id: 6,
      title: "Bella's Kidney Disease Treatment",
      description: "Bella is a 7-year-old cat who needs ongoing treatment for chronic kidney disease.",
      raised: 1200,
      goal: 4000,
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop",
      category: "Medical",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Browse Campaigns
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Discover animals in need and make a difference with your contribution
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search campaigns..." 
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button variant="outline" size="lg" className="sm:w-auto">
              Filter by Category
            </Button>
          </div>

          {/* Campaigns Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100);
              
              return (
                <Card key={campaign.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-primary font-semibold px-3 py-1 rounded-full text-sm">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                    <CardDescription className="text-base">{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-primary">${campaign.raised.toLocaleString()} raised</span>
                        <span className="text-muted-foreground">${campaign.goal.toLocaleString()} goal</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{percentage}% funded</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/campaign/${campaign.id}`} className="w-full">
                      <Button className="w-full font-semibold">
                        View Campaign
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
