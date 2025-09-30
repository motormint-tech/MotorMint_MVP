import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Star, ChevronDown, ChevronUp, Instagram, Facebook, Youtube, Users } from "lucide-react";

// Import car images for recent sales
import camaroRed from "@/assets/cars/camaro-red.jpg";
import corvetteBlack from "@/assets/cars/corvette-black.jpg";
import mustangBlue from "@/assets/cars/mustang-blue.jpg";
import gtrSilver from "@/assets/cars/gtr-silver.jpg";

const pricingTiers = [
  {
    name: "Titanium Package",
    price: 299,
    originalPrice: 397,
    popular: true,
    cta: "Get started",
    features: [
      { text: "Instagram Posts", detail: "bi-weekly re-posts (3x)" },
      { text: "Facebook Posts", detail: "bi-weekly re-posts (3x)" },
      { text: "Pinned Facebook Post", detail: "temporarily pinned" },
      { text: "Instagram & Facebook Reel", detail: "single post" },
      { text: "Instagram & Facebook Stories", detail: "including Story updates" },
      { text: "Pricing Assistance", detail: "optional", hasTooltip: true },
      { text: "Website Featured Listing", detail: "large placement on homepage" },
      { text: "Cumulative Reach:", detail: "300,000+" },
    ],
    tooltipText: "Our team has years of experience selling thousands of highly modified vehicles, we can provide you with an effective range.",
  },
  {
    name: "Platinum Package",
    price: 199,
    popular: false,
    cta: "Get started",
    features: [
      { text: "Instagram Posts", detail: "bi-weekly re-posts (2x)" },
      { text: "Facebook Posts", detail: "bi-weekly re-posts (2x)" },
      { text: "Instagram & Facebook Reel", detail: "single post" },
      { text: "Instagram & Facebook Stories", detail: "including Story updates" },
      { text: "Website Listing", detail: "listed on the site" },
      { text: "Cumulative Reach:", detail: "100,000" },
    ],
  },
  {
    name: "Standard Package",
    price: 99,
    popular: false,
    cta: "Get started",
    features: [
      { text: "Instagram Post", detail: null },
      { text: "Facebook Post", detail: null },
      { text: "Website Listing", detail: "listed on the site" },
      { text: "Cumulative Reach:", detail: "50,000" },
    ],
  },
];

const stats = [
  { label: "Vehicles listed", value: "5,100+", icon: Users },
  { label: "Instagram", value: "213K+", icon: Instagram },
  { label: "Facebook", value: "80K+", icon: Facebook },
  { label: "YouTube views", value: "1.7M+", icon: Youtube },
];

const recentSales = [
  {
    title: "853whp 2019 Chevrolet Corvette Z06 2LZ",
    price: "$88,900",
    location: "Massachusetts",
    image: corvetteBlack,
  },
  {
    title: "937whp 2018 Audi RS3",
    price: "$55,000",
    location: "Newport News, VA",
    image: gtrSilver,
  },
  {
    title: "950whp 2016 Ford Mustang GT",
    price: "$45,000",
    location: "North Canton, OH",
    image: mustangBlue,
  },
  {
    title: "700whp 2017 Ford Mustang GT",
    price: "$29,500",
    location: "Keller, TX",
    image: camaroRed,
  },
];

const testimonials = [
  {
    quote: "Big thank you to MotorMint! Within 24 hours of listing, my phone was blowing up with serious inquiries.",
    author: "Mike R.",
    vehicle: "2020 Corvette C8",
  },
  {
    quote: "Sold my modified GTR within a week. The reach these guys have is incredible. Highly recommend!",
    author: "Jason T.",
    vehicle: "2017 Nissan GT-R",
  },
  {
    quote: "Professional service from start to finish. They really understand the enthusiast market.",
    author: "Sarah M.",
    vehicle: "2019 Mustang GT350",
  },
  {
    quote: "Got more leads in one day than I did in a month on other platforms. Worth every penny.",
    author: "Chris D.",
    vehicle: "2018 Camaro ZL1",
  },
];

const faqs = [
  {
    question: "Do you take commission?",
    answer: "No, we never take commission. What you sell your vehicle for is entirely yours. We only charge a one-time listing fee based on your chosen package.",
  },
  {
    question: "How does the process work?",
    answer: "Simply submit your vehicle details through our form, our team reviews it, you receive an invoice for your chosen package, and once paid, your listing goes live across all our platforms.",
  },
  {
    question: "How long does my listing stay active?",
    answer: "Your listing remains active until your vehicle sells. We don't remove listings based on time - we're committed to helping you sell.",
  },
  {
    question: "What makes MotorMint different?",
    answer: "We specialize in modified and high-performance vehicles. Our audience specifically follows us for these types of cars, meaning your listing reaches serious buyers who understand the value of modifications.",
  },
  {
    question: "Can I update my listing after it's posted?",
    answer: "Absolutely! If you make changes to the vehicle or want to update pricing, just reach out to us and we'll update your listing across all platforms.",
  },
];

const Submit = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple pricing, <span className="text-gradient-cyan">no commission</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your vehicle is listed on all of our platforms - from Instagram to Facebook 
            and our site. We do all the leg work, you just respond to interested buyers.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border ${
                  tier.popular 
                    ? "border-primary bg-gradient-to-b from-primary/10 to-card" 
                    : "border-border bg-card"
                } p-6 transition-all duration-300 hover:-translate-y-1`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                    <span className="text-muted-foreground text-sm">one-time payment</span>
                  </div>
                  {tier.originalPrice && (
                    <span className="text-muted-foreground line-through text-lg">${tier.originalPrice}</span>
                  )}
                </div>

                <Link to="/submission">
                  <Button 
                    className={`w-full mb-6 ${
                      tier.popular 
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>

                {tier.popular && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-foreground">All-access features</span>
                  </div>
                )}

                <ul className="space-y-3">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-foreground">{feature.text}</span>
                        {feature.detail && (
                          <span className="text-muted-foreground ml-1">{feature.detail}</span>
                        )}
                        {feature.hasTooltip && (
                          <button
                            className="ml-1 text-primary hover:text-primary/80 transition-colors"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            ⓘ
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {showTooltip && tier.tooltipText && tier.popular && (
                  <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                    {tier.tooltipText}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by buyers and sellers <span className="text-gradient-cyan">worldwide</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore the MotorMint's undisputed success with our recent sales.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Sales Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentSales.map((sale, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden">
                <img
                  src={sale.image}
                  alt={sale.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <span className="inline-block bg-tag-sold/90 text-white text-xs px-2 py-0.5 rounded mb-1">
                    Sold
                  </span>
                  <h4 className="text-white text-sm font-medium line-clamp-2">{sale.title}</h4>
                  <p className="text-white/70 text-xs">{sale.price} - {sale.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              We have worked with thousands <br />
              <span className="text-gradient-cyan">of amazing sellers</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We're been helping enthusiasts sell their high-performance builds since 2019. 
              A tried and true selling platform, while you wait, let us connect buyers to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.vehicle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked <span className="text-gradient-cyan">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="text-foreground font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to sell your vehicle?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of sellers who have successfully sold their vehicles through MotorMint.
          </p>
          <Link to="/submission">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Submit Your Vehicle
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Submit;