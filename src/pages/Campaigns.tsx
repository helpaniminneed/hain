import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Campaigns = () => {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

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
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-56" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : campaigns?.map((campaign) => {
              const percentage = Math.round((Number(campaign.raised) / Number(campaign.goal)) * 100);
              
              return (
                <Card key={campaign.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={campaign.image_url} 
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
                    <CardDescription className="text-base line-clamp-2">{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-primary">${Number(campaign.raised).toLocaleString()} raised</span>
                        <span className="text-muted-foreground">${Number(campaign.goal).toLocaleString()} goal</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
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
