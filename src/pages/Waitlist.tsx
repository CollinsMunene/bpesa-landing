import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Mail, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Waitlist = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to our BPESA whitelist API
      const response = await fetch('https://api.bpesa.net/api/v1/send-waitlist-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message || undefined
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        toast.success("Successfully joined the waitlist! Check your email for confirmation.");
      } else {
        throw new Error(result.error || 'Failed to join waitlist');
      }
      
    } catch (error) {
      console.error("Error submitting waitlist form:", error);
      toast.error(`Failed to join waitlist: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">You're on the list!</CardTitle>
            <CardDescription className="text-lg">
              Thanks for joining the Bpesa waitlist. We'll notify you when we launch!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center space-x-1 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">B</span>
              </div>
              <span className="text-3xl font-bold text-primary">pesa</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Join the Waitlist</h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Be the first to experience the future of digital payments in Kenya.
            </p>
          </div>

          {/* Waitlist Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Get Early Access
              </CardTitle>
              <CardDescription>
                Join thousands of others waiting for Bpesa to launch. We'll send you an exclusive invitation when we're ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Any message for us? (optional)"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Early Access</h3>
                <p className="text-sm text-muted-foreground">
                  Be among the first to use Bpesa when we launch
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Exclusive Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest news and product updates
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">No Spam</h3>
                <p className="text-sm text-muted-foreground">
                  We respect your inbox and won't spam you
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <p className="text-center text-sm text-muted-foreground">
            By joining our waitlist, you agree to receive email updates about Bpesa. 
            We respect your privacy and you can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
