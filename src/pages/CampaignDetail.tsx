import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, Calendar, MapPin } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const CampaignDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock data - in real app, fetch based on ID
  const campaign = {
    id: 1,
    title: "Help Luna Fight Cancer",
    description: "Luna is a beloved 5-year-old golden retriever who has been diagnosed with lymphoma. She's been part of our family since she was a puppy and has brought endless joy to everyone she meets. The diagnosis was devastating, but we're determined to give her the best chance at recovery.",
    fullStory: "Luna started showing symptoms two months ago - loss of appetite, lethargy, and swollen lymph nodes. After extensive testing, our vet confirmed lymphoma. The recommended treatment is a combination of chemotherapy sessions over the next 6 months. While the prognosis is good with treatment, the costs are overwhelming for our family. Luna deserves to fight this battle, and we need your help to make it possible. Every donation, no matter how small, brings us closer to giving Luna the treatment she needs.",
    raised: 3500,
    goal: 8000,
    donors: 87,
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=1200&auto=format&fit=crop",
    category: "Medical",
    animalName: "Luna",
    location: "Portland, OR",
    created: "2 weeks ago",
  };

  const percentage = Math.round((campaign.raised / campaign.goal) * 100);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank You!",
      description: "Your donation will help Luna get the treatment she needs.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link Copied!",
      description: "Campaign link has been copied to your clipboard.",
    });
  };

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
                src={campaign.image} 
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
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created {campaign.created}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Story */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Campaign Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p className="text-lg leading-relaxed">{campaign.description}</p>
                <p className="text-lg leading-relaxed">{campaign.fullStory}</p>
              </div>
            </div>

            <Separator />

            {/* Updates Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Updates</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Latest Update</CardTitle>
                  <CardDescription>Posted 3 days ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Thank you all for the overwhelming support! Luna completed her first round of chemotherapy 
                    and the vet says she's responding well. She's eating better and has more energy. 
                    We still have a long way to go, but your donations are making this possible. ❤️
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <Card className="border-2 sticky top-24">
              <CardHeader>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-1">
                      ${campaign.raised.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">
                      raised of ${campaign.goal.toLocaleString()} goal
                    </div>
                  </div>
                  
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold">{campaign.donors} donations</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleDonate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-base">Donation Amount</Label>
                    <Input 
                      id="amount" 
                      type="number"
                      placeholder="50"
                      className="h-12 text-lg"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full text-lg font-semibold h-14">
                    Donate Now
                  </Button>
                </form>

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
                <p>Verified campaign creator</p>
                <p className="text-sm">
                  All funds go directly to {campaign.animalName}'s medical treatment
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
