import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, Calendar, MapPin, ExternalLink } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const CampaignDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: donations } = useQuery({
    queryKey: ['donations', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('campaign_id', id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handlePayPalDonate = () => {
    if (campaign?.paypal_email) {
      // Opens PayPal with pre-filled recipient email
      window.open(`https://www.paypal.com/paypalme/${campaign.paypal_email.replace('@', '')}`, '_blank');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Campaign link has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="w-full h-[500px] rounded-3xl" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Campaign Not Found</h1>
          <Link to="/campaigns">
            <Button>Browse Campaigns</Button>
          </Link>
        </div>
      </div>
    );
  }

  const percentage = Math.round((Number(campaign.raised) / Number(campaign.goal)) * 100);
  const donorCount = donations?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img 
                src={campaign.image_url} 
                alt={campaign.title}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Title and Meta */}
            <div className="space-y-4">
              <div className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full">
                {campaign.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {campaign.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                {campaign.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{campaign.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created {format(new Date(campaign.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Story */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Campaign Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">{campaign.description}</p>
                {campaign.full_story && (
                  <p className="text-lg leading-relaxed">{campaign.full_story}</p>
                )}
              </div>
            </div>

            {donations && donations.length > 0 && (
              <>
                <Separator />
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Recent Donations</h2>
                  <div className="space-y-4">
                    {donations.slice(0, 5).map((donation) => (
                      <Card key={donation.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {donation.donor_name || 'Anonymous'}
                              </CardTitle>
                              <CardDescription>
                                {format(new Date(donation.created_at), 'MMM d, yyyy')}
                              </CardDescription>
                            </div>
                            <span className="text-xl font-bold text-primary">
                              ${Number(donation.amount).toLocaleString()}
                            </span>
                          </div>
                        </CardHeader>
                        {donation.message && (
                          <CardContent>
                            <p className="text-muted-foreground italic">"{donation.message}"</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <Card className="border-2 sticky top-24">
              <CardHeader>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">
                      ${Number(campaign.raised).toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">
                      raised of ${Number(campaign.goal).toLocaleString()} goal
                    </div>
                  </div>
                  
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold">{donorCount} donations</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full text-lg font-semibold h-14"
                  onClick={handlePayPalDonate}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Donate via PayPal
                </Button>

                <div className="text-sm text-center text-muted-foreground">
                  PayPal: {campaign.paypal_email}
                </div>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full text-base font-semibold"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Campaign
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Campaign Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>Contact: {campaign.contact_email}</p>
                <p className="text-sm">
                  All funds go directly to {campaign.animal_name || 'the animals'} via PayPal
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
