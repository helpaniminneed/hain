import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const CreateCampaign = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Campaign Created!",
      description: "Your campaign has been submitted and is now live.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Start a Campaign
            </h1>
            <p className="text-xl text-muted-foreground">
              Help an animal in need by creating a fundraising campaign
            </p>
          </div>

          {/* Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Campaign Details</CardTitle>
              <CardDescription className="text-base">
                Provide information about the animal and their needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">Campaign Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Help Luna Fight Cancer"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base">Category *</Label>
                  <Select required>
                    <SelectTrigger id="category" className="h-12 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Treatment</SelectItem>
                      <SelectItem value="emergency">Emergency Care</SelectItem>
                      <SelectItem value="rescue">Rescue Operation</SelectItem>
                      <SelectItem value="shelter">Shelter & Housing</SelectItem>
                      <SelectItem value="wildlife">Wildlife Rehabilitation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-base">Funding Goal (USD) *</Label>
                  <Input 
                    id="goal" 
                    type="number"
                    placeholder="5000"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="animal" className="text-base">Animal Name</Label>
                  <Input 
                    id="animal" 
                    placeholder="e.g., Luna"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">Campaign Story *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Tell us about the animal and why they need help. Include details about their condition, treatment needed, and how the funds will be used."
                    className="min-h-[200px] text-base resize-none"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    A compelling story helps donors connect with your cause
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-base">Campaign Image *</Label>
                  <Input 
                    id="image" 
                    type="file"
                    accept="image/*"
                    className="h-12 text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload a clear photo of the animal (max 5MB)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-base">Contact Email *</Label>
                  <Input 
                    id="contact" 
                    type="email"
                    placeholder="your.email@example.com"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full text-base font-semibold h-14">
                    Create Campaign
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-muted/50 border-2">
            <CardHeader>
              <CardTitle className="text-xl">Before You Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• All campaigns must be animal-related</p>
              <p>• Be honest and transparent about how funds will be used</p>
              <p>• Provide regular updates to your donors</p>
              <p>• Respond to questions and comments promptly</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
