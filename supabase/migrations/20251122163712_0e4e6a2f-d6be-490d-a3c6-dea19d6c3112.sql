-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_story TEXT,
  category TEXT NOT NULL,
  goal DECIMAL(10, 2) NOT NULL,
  raised DECIMAL(10, 2) DEFAULT 0,
  animal_name TEXT,
  location TEXT,
  image_url TEXT NOT NULL,
  paypal_email TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  donor_name TEXT,
  donor_email TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Campaigns policies (public read, anyone can create)
CREATE POLICY "Anyone can view campaigns"
  ON public.campaigns
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create campaigns"
  ON public.campaigns
  FOR INSERT
  WITH CHECK (true);

-- Donations policies (public read, anyone can create)
CREATE POLICY "Anyone can view donations"
  ON public.donations
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create donations"
  ON public.donations
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_campaigns_created_at ON public.campaigns(created_at DESC);
CREATE INDEX idx_donations_campaign_id ON public.donations(campaign_id);

-- Create function to update campaign raised amount
CREATE OR REPLACE FUNCTION public.update_campaign_raised()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.campaigns
  SET raised = (
    SELECT COALESCE(SUM(amount), 0)
    FROM public.donations
    WHERE campaign_id = NEW.campaign_id
  )
  WHERE id = NEW.campaign_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update raised amount on new donation
CREATE TRIGGER update_campaign_raised_trigger
  AFTER INSERT ON public.donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_campaign_raised();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for campaigns updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample campaigns
INSERT INTO public.campaigns (title, description, full_story, category, goal, raised, animal_name, location, image_url, paypal_email, contact_email) VALUES
('Help Luna Fight Cancer', 'Luna, a 5-year-old golden retriever, needs urgent treatment for lymphoma.', 'Luna is a beloved 5-year-old golden retriever who has been diagnosed with lymphoma. She''s been part of our family since she was a puppy and has brought endless joy to everyone she meets. The diagnosis was devastating, but we''re determined to give her the best chance at recovery. Luna started showing symptoms two months ago - loss of appetite, lethargy, and swollen lymph nodes. After extensive testing, our vet confirmed lymphoma. The recommended treatment is a combination of chemotherapy sessions over the next 6 months.', 'Medical', 8000, 3500, 'Luna', 'Portland, OR', 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&auto=format&fit=crop', 'help.luna@example.com', 'luna.owner@example.com'),
('Rescue Street Cats', 'Fund medical care and shelter for abandoned cats in our community.', 'We are a small volunteer group dedicated to rescuing abandoned street cats in our community. Every day we find cats that need medical attention, food, and shelter. Your donations help us provide veterinary care, vaccinations, spaying/neutering, and temporary housing until we can find them loving forever homes.', 'Rescue', 5000, 2100, NULL, 'Seattle, WA', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop', 'streetcats.rescue@example.com', 'rescue.contact@example.com'),
('Save Max''s Life', 'Max was hit by a car and needs emergency surgery to walk again.', 'Max is a young rescue dog who was recently hit by a car. He suffered multiple fractures in his hind legs and needs immediate surgery. Without treatment, Max may never walk again. The surgery is complex and expensive, but the veterinarians are confident they can help him fully recover.', 'Emergency', 6500, 5800, 'Max', 'Denver, CO', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop', 'save.max@example.com', 'max.rescuer@example.com'),
('Sanctuary for Retired Horses', 'Help us build a sanctuary for horses retired from racing and work.', 'We''re creating a peaceful sanctuary where retired racehorses and work horses can live out their days in comfort. These magnificent animals deserve a dignified retirement after years of service. Your donations will help us build proper stables, fencing, and provide ongoing care.', 'Shelter', 25000, 12000, NULL, 'Austin, TX', 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop', 'horse.sanctuary@example.com', 'sanctuary.director@example.com'),
('Wildlife Rehabilitation Center', 'Support our center caring for injured wildlife and preparing them for release.', 'Our wildlife rehabilitation center treats injured and orphaned wild animals with the goal of releasing them back into their natural habitat. We care for everything from birds and squirrels to deer and foxes. Your support helps us provide medical treatment, proper nutrition, and safe rehabilitation spaces.', 'Wildlife', 15000, 8500, NULL, 'Asheville, NC', 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&auto=format&fit=crop', 'wildlife.center@example.com', 'wildlife.director@example.com'),
('Bella''s Kidney Disease Treatment', 'Bella is a 7-year-old cat who needs ongoing treatment for chronic kidney disease.', 'Bella has been diagnosed with chronic kidney disease and requires ongoing specialized care including prescription food, medications, and regular vet visits. Her family is struggling with the mounting costs but is committed to giving her the best quality of life possible. Any help is deeply appreciated.', 'Medical', 4000, 1200, 'Bella', 'Boston, MA', 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop', 'help.bella@example.com', 'bella.family@example.com');