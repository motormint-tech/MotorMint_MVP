import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const gettingStartedFaqs = [
    {
      question: "How do I list my vehicle on MotorMint?",
      answer: (
        <div className="space-y-3">
          <p>First, thank you for your interest in listing your vehicle with MotorMint! Please keep in mind we are currently only accepting modified vehicles to ensure all vehicles correlate with the theme of the platform. Follow the steps below to begin your submission.</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>If you haven't already, please create an account</li>
            <li>Navigate to the Submit page</li>
            <li>Select a package, and you will be redirected to the submission page</li>
            <li>We will review your submission and reach out via email</li>
            <li>Once approved, you will receive an invoice for your package</li>
            <li>Once payment is placed, we will begin constructing your ad</li>
          </ul>
        </div>
      ),
    },
    {
      question: "My submission was accepted and payment has been made, when will my vehicle be posted?",
      answer: "Once the payment has been placed, we will begin working on constructing your ad. We aim to have all vehicles posted within 48 hours after the payment has been placed. However, in most cases, it's generally a lot quicker than 48 hours.",
    },
    {
      question: "How long will my listing be active?",
      answer: "This is all dependant on the package that you paid for, please review package details. If you have any additional questions or concerns, please feel free to contact us.",
    },
    {
      question: "Will my vehicle be posted on your social media outlets?",
      answer: "All vehicles listed on our platform will be featured on our social media outlets. However, please keep in mind the number of re-posts you receive is dependent on the package you paid for.",
    },
    {
      question: "Do you charge a commission?",
      answer: "No commission. No additional fees. We only charge a one-time listing fee that's paid for after your vehicle has been accepted.",
    },
    {
      question: "Can I get a discount for listing multiple vehicles at once?",
      answer: "If you're interested in listing multiple vehicles at once, shoot us a message with how many vehicles you want to list. We are always open to offering a discount for multiple vehicles! Please keep in mind the discount is only applicable if multiple vehicles are submitted at the same time.",
    },
    {
      question: "How do re-posts work?",
      answer: "Once your vehicle has been posted on our social media outlets, we will reach out to you bi-weekly to check if the vehicle is still available. If so, we will have it re-posted with any adjustments you would like. Re-post frequency depends on your selected package.",
    },
  ];

  const buyersFaqs = [
    {
      question: "How do I purchase a vehicle on here?",
      answer: "All listings will contain the seller's contact information, either a phone number, email or social handle. Reach out to the seller to make an offer or discuss further. We currently do not assist with purchasing a vehicle, however if you have any questions or would like a second opinion, please do not hesitate to reach out!",
    },
    {
      question: "Do you offer financing?",
      answer: "Unfortunately, we do not assist with financing at this time. If you are interested in financing a vehicle that's listed on MotorMint, we advise you reach out to your local credit union/bank to check if you may be eligible to finance the vehicle through them.",
    },
    {
      question: "Do you know any good shipping companies?",
      answer: "We are currently compiling a list of recommended shippers. In the future, check our Recommendations page as we will keep this list updated with any recommended shippers.",
    },
    {
      question: "What do I do if a seller isn't responding?",
      answer: "If you have attempted several times to reach out to a seller and haven't received a response, it's likely the vehicle has been sold. Please reach out to us, and we will try our best to get in contact with the seller to get an answer for you.",
    },
  ];

  const sellersFaqs = [
    {
      question: "I have exhausted all my available re-posts, can I pay for more?",
      answer: "In order to prevent burnout, we generally do not allow more re-posts to be purchased. However, your listing will still remain active on the site, and all of the social media posts that were made will remain active as well. We can make adjustments to your current listing/social media posts, just reach out to us!",
    },
    {
      question: "How should I go about completing the transaction with an out of state buyer?",
      answer: "We recommend drawing up a bill of sale and requesting a wire transfer from the buyer. Once the funds have officially cleared, that's when the vehicle/title can be released. We also recommend talking to your bank before doing so as they can help guide you in the right direction.",
    },
    {
      question: "How can I edit my listing on the site and social media outlets?",
      answer: "If you wish to make changes to your listing, sign in to your account and submit a ticket. Once your ticket has been submitted, we will have the listing updated ASAP! Submitting a ticket is the fastest way to get your ad updated.",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Diagonal Stripes Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left stripes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div 
            className="absolute top-0 left-[5%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/40 to-transparent origin-top-left"
            style={{ transform: 'rotate(25deg)' }}
          />
          <div 
            className="absolute top-0 left-[15%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/30 to-transparent origin-top-left"
            style={{ transform: 'rotate(25deg)' }}
          />
          <div 
            className="absolute top-0 left-[25%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/20 to-transparent origin-top-left"
            style={{ transform: 'rotate(25deg)' }}
          />
          <div 
            className="absolute top-0 left-[35%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/10 to-transparent origin-top-left"
            style={{ transform: 'rotate(25deg)' }}
          />
        </div>
        
        {/* Right stripes */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div 
            className="absolute top-0 right-[5%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/40 to-transparent origin-top-right"
            style={{ transform: 'rotate(-25deg)' }}
          />
          <div 
            className="absolute top-0 right-[15%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/30 to-transparent origin-top-right"
            style={{ transform: 'rotate(-25deg)' }}
          />
          <div 
            className="absolute top-0 right-[25%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/20 to-transparent origin-top-right"
            style={{ transform: 'rotate(-25deg)' }}
          />
          <div 
            className="absolute top-0 right-[35%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-border/10 to-transparent origin-top-right"
            style={{ transform: 'rotate(-25deg)' }}
          />
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            How can we help?
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Need support or have a question? We're here to help.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-6 relative z-10">
        <div className="container mx-auto max-w-3xl">
          {/* Getting Started */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Getting Started</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {gettingStartedFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`getting-started-${index}`}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-lg px-4 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Buyers */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Buyers</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {buyersFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`buyers-${index}`}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-lg px-4 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Sellers */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Sellers</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {sellersFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`sellers-${index}`}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-lg px-4 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="text-center py-12 border-t border-border">
            <h3 className="text-xl font-semibold mb-2">Cannot find what you're looking for?</h3>
            <p className="text-muted-foreground mb-6">Still have questions?</p>
            <Link to="/contact">
              <Button className="rounded-full px-6">
                Contact us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faq;
