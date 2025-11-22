import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, PawPrint, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-animals.jpg";

const Index = () => {
  const featuredCampaigns = [
    {
      id: 1,
      title: "Help Luna Fight Cancer",
      description: "Luna, a 5-year-old golden retriever, needs urgent treatment for lymphoma.",
      raised: 3500,
      goal: 8000,
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Rescue Street Cats",
      description: "Fund medical care and shelter for abandoned cats in our community.",
      raised: 2100,
      goal: 5000,
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Save Max's Life",
      description: "Max was hit by a car and needs emergency surgery to walk again.",
      raised: 5800,
      goal: 6500,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <PawPrint className="h-4 w-4" />
                Help Animals In Need
              </div>
              <h1 className="text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl">
                Every Animal Deserves a{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Fighting Chance
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Join our compassionate community in making a difference. Fund life-saving treatments, 
                rescue operations, and give animals the care they desperately need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/campaigns">
                  <Button size="lg" className="text-lg font-semibold px-8 h-14">
                    Browse Campaigns
                  </Button>
                </Link>
                <Link to="/create">
                  <Button size="lg" variant="outline" className="text-lg font-semibold px-8 h-14">
                    Start a Campaign
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-200">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Rescued animals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg p-6 max-w-xs border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">1,234+</p>
                    <p className="text-sm text-muted-foreground">Animals Helped</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">How HAIN Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to make a meaningful impact
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Find a Cause",
                description: "Browse through animal campaigns that need your support",
              },
              {
                icon: Heart,
                title: "Make a Donation",
                description: "Contribute any amount to help reach funding goals",
              },
              {
                icon: Users,
                title: "Track Impact",
                description: "See updates and know exactly how your donation helped",
              },
            ].map((step, i) => (
              <Card key={i} className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight">Featured Campaigns</h2>
              <p className="text-xl text-muted-foreground">Animals that need your help right now</p>
            </div>
            <Link to="/campaigns">
              <Button variant="outline" size="lg">View All</Button>
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCampaigns.map((campaign) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100);
              
              return (
                <Card key={campaign.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                  <div className="overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/campaign/${campaign.id}`} className="w-full">
                      <Button className="w-full font-semibold">
                        Donate Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-primary via-accent to-secondary text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Start a campaign for an animal in need or support an existing cause. 
            Every contribution matters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" variant="secondary" className="text-lg font-semibold px-8 h-14">
                Start a Campaign
              </Button>
            </Link>
            <Link to="/campaigns">
              <Button size="lg" variant="outline" className="text-lg font-semibold px-8 h-14 bg-white/10 border-white/30 hover:bg-white/20 text-white">
                Browse All Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 fill-primary text-primary" />
              <span className="text-xl font-bold">HAIN</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Connecting compassionate people with animals in need. Together, we can make a difference.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 HAIN - Help Animals In Need. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
