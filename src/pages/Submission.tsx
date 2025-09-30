import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ChevronLeft, Camera, Car, FileText, User, DollarSign } from "lucide-react";

const packages = [
  { id: "standard", name: "Standard Package", price: 99 },
  { id: "platinum", name: "Platinum Package", price: 199 },
  { id: "titanium", name: "Titanium Package", price: 299 },
];

const years = Array.from({ length: 35 }, (_, i) => (2025 - i).toString());

const Submission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState("titanium");
  const [photos, setPhotos] = useState<File[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Vehicle Info
    year: "",
    make: "",
    model: "",
    trim: "",
    vin: "",
    mileage: "",
    horsepower: "",
    transmission: "",
    drivetrain: "",
    exteriorColor: "",
    interiorColor: "",
    // Location & Price
    city: "",
    state: "",
    askingPrice: "",
    // Modifications
    modifications: "",
    // Story
    story: "",
    // Contact
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    instagram: "",
    // Photographer
    photographerCredit: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      if (photos.length + newPhotos.length > 16) {
        toast({
          title: "Too many photos",
          description: "Maximum 16 photos allowed",
          variant: "destructive",
        });
        return;
      }
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (photos.length < 6) {
      toast({
        title: "More photos needed",
        description: "Please upload at least 6 photos of your vehicle",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Submission received!",
      description: "We'll review your listing and get back to you within 24-48 hours.",
    });
    
    setIsSubmitting(false);
    navigate("/submit");
  };

  const selectedPkg = packages.find((p) => p.id === selectedPackage);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/submit")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to packages
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Submit Your Vehicle
          </h1>
          <p className="text-muted-foreground">
            Fill out the form below to get your vehicle listed. We'll review your submission and reach out within 24-48 hours.
          </p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Package Selection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Select Package</h2>
                <p className="text-sm text-muted-foreground">Choose your listing package</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPackage === pkg.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm text-muted-foreground">{pkg.name}</span>
                  <div className="text-2xl font-bold text-foreground">${pkg.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Vehicle Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about your vehicle</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select value={formData.year} onValueChange={(v) => handleInputChange("year", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  placeholder="e.g., Chevrolet"
                  value={formData.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  placeholder="e.g., Corvette"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trim">Trim</Label>
                <Input
                  id="trim"
                  placeholder="e.g., Z06"
                  value={formData.trim}
                  onChange={(e) => handleInputChange("trim", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input
                  id="vin"
                  placeholder="Vehicle Identification Number"
                  value={formData.vin}
                  onChange={(e) => handleInputChange("vin", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage *</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g., 25000"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horsepower">Horsepower (whp)</Label>
                <Input
                  id="horsepower"
                  placeholder="e.g., 650"
                  value={formData.horsepower}
                  onChange={(e) => handleInputChange("horsepower", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission *</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(v) => handleInputChange("transmission", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="dct">DCT / Dual Clutch</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="drivetrain">Drivetrain *</Label>
                <Select
                  value={formData.drivetrain}
                  onValueChange={(v) => handleInputChange("drivetrain", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drivetrain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rwd">RWD</SelectItem>
                    <SelectItem value="fwd">FWD</SelectItem>
                    <SelectItem value="awd">AWD</SelectItem>
                    <SelectItem value="4wd">4WD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exteriorColor">Exterior Color</Label>
                <Input
                  id="exteriorColor"
                  placeholder="e.g., Torch Red"
                  value={formData.exteriorColor}
                  onChange={(e) => handleInputChange("exteriorColor", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interiorColor">Interior Color</Label>
                <Input
                  id="interiorColor"
                  placeholder="e.g., Jet Black"
                  value={formData.interiorColor}
                  onChange={(e) => handleInputChange("interiorColor", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Location & Price */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Location & Price</h2>
                <p className="text-sm text-muted-foreground">Where is the vehicle and what's your asking price?</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g., Los Angeles"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="e.g., CA"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="askingPrice">Asking Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="askingPrice"
                    type="number"
                    placeholder="e.g., 85000"
                    className="pl-7"
                    value={formData.askingPrice}
                    onChange={(e) => handleInputChange("askingPrice", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Modifications</h2>
                <p className="text-sm text-muted-foreground">List all modifications and upgrades</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modifications">Modification List *</Label>
              <Textarea
                id="modifications"
                placeholder="List all modifications, upgrades, and performance parts. Be as detailed as possible - buyers want to know exactly what's been done to the vehicle.

Example:
- Whipple 3.0L Supercharger
- Kooks Long Tube Headers
- Corsa Sport Exhaust
- BMR Suspension Components
- Forgeline Wheels"
                className="min-h-[200px]"
                value={formData.modifications}
                onChange={(e) => handleInputChange("modifications", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Story */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Your Story</h2>
                <p className="text-sm text-muted-foreground">Share the journey of your build</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Vehicle Story</Label>
              <Textarea
                id="story"
                placeholder="Tell us about your vehicle's history, the build process, memorable moments, and why you're selling. A compelling story helps connect with buyers."
                className="min-h-[150px]"
                value={formData.story}
                onChange={(e) => handleInputChange("story", e.target.value)}
              />
            </div>
          </div>

          {/* Photos */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Photos</h2>
                <p className="text-sm text-muted-foreground">
                  Upload 6-16 high-quality photos (landscape orientation preferred)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Upload Area */}
              <label className="block">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-medium mb-1">Click to upload photos</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG up to 10MB each • {photos.length}/16 photos
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>

              {/* Photo Preview Grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="photographerCredit">Photographer Credit (optional)</Label>
                <Input
                  id="photographerCredit"
                  placeholder="@photographer_instagram"
                  value={formData.photographerCredit}
                  onChange={(e) => handleInputChange("photographerCredit", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
                <p className="text-sm text-muted-foreground">How can buyers reach you?</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="instagram">Instagram Handle (optional)</Label>
                <Input
                  id="instagram"
                  placeholder="@your_instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-3 mb-6">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the Terms of Service and understand that my listing will be reviewed before 
                being published. I confirm that all information provided is accurate and that I am the 
                legal owner of this vehicle.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Selected package</p>
                <p className="text-lg font-semibold text-foreground">
                  {selectedPkg?.name} - ${selectedPkg?.price}
                </p>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8"
              >
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Submission;
