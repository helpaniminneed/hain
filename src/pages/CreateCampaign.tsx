import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          full_story: formData.get('full_story') as string,
          category: category,
          goal: parseFloat(formData.get('goal') as string),
          animal_name: formData.get('animal') as string || null,
          location: formData.get('location') as string || null,
          image_url: formData.get('image_url') as string,
          paypal_email: formData.get('paypal_email') as string,
          contact_email: formData.get('contact_email') as string,
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Campaign Created!",
        description: "Your campaign has been submitted and is now live.",
      });

      navigate(`/campaign/${data.id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    name="title"
                    placeholder="e.g., Help Luna Fight Cancer"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base">Category *</Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="h-12 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical">Medical Treatment</SelectItem>
                      <SelectItem value="Emergency">Emergency Care</SelectItem>
                      <SelectItem value="Rescue">Rescue Operation</SelectItem>
                      <SelectItem value="Shelter">Shelter & Housing</SelectItem>
                      <SelectItem value="Wildlife">Wildlife Rehabilitation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-base">Funding Goal (USD) *</Label>
                  <Input 
                    id="goal" 
                    name="goal"
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="5000"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="animal" className="text-base">Animal Name</Label>
                  <Input 
                    id="animal" 
                    name="animal"
                    placeholder="e.g., Luna"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    placeholder="e.g., Portland, OR"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">Short Description *</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="A brief summary (1-2 sentences) about the animal and what they need."
                    className="min-h-[100px] text-base resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_story" className="text-base">Full Campaign Story</Label>
                  <Textarea 
                    id="full_story"
                    name="full_story"
                    placeholder="Tell the complete story. Include details about the animal's condition, treatment needed, and how the funds will be used. A compelling story helps donors connect with your cause."
                    className="min-h-[200px] text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-base">Campaign Image URL *</Label>
                  <Input 
                    id="image_url" 
                    name="image_url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="h-12 text-base"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter a URL to a photo of the animal
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paypal_email" className="text-base">PayPal Email *</Label>
                  <Input 
                    id="paypal_email" 
                    name="paypal_email"
                    type="email"
                    placeholder="your.paypal@example.com"
                    className="h-12 text-base"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Donors will be directed to donate via this PayPal email
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email" className="text-base">Contact Email *</Label>
                  <Input 
                    id="contact_email" 
                    name="contact_email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-base font-semibold h-14"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
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
              <p>• Donations go directly to your PayPal account</p>
              <p>• Make sure your PayPal email is correct</p>
              <p>• Update donors regularly about the animal's progress</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
