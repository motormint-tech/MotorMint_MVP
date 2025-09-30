import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/about-hero.jpg";
import aboutCollage from "@/assets/about-collage.jpg";

const About = () => {
  const stats = [
    { label: "Business was founded", value: "2015" },
    { label: "People on the team", value: "2+" },
    { label: "Users on the platform", value: "1,100+" },
    { label: "Vehicles listed", value: "5,100+" },
  ];

  const fastFeatures = [
    {
      title: "Fast response times.",
      description: "Slow response times are a thing of the past, we're on stand-by and ready to answer any questions or requests.",
    },
    {
      title: "Fast vehicles.",
      description: "Fast is our specialty, our track record speaks for itself.",
    },
    {
      title: "Fast queues.",
      description: "Cut the wait time, our team works swiftly to ensure all submissions are posted within 48 hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                The relentless pursuit of{" "}
                <span className="font-bold text-primary">BETTER</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                A constantly evolving digital platform that's built on vigorous work ethic, 
                exceptional creativity, and outstanding customer service.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  Join <ArrowRight className="w-4 h-4" />
                </Link>
                <Button className="rounded-full px-6">
                  Submit a vehicle <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Image - Rotated Card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <img
                  src={aboutHero}
                  alt="Modified Audi R8"
                  className="w-full max-w-md rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-12 border-y border-border mt-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>A DECADE OF</span>
              <span className="font-semibold text-primary">EXPERIENCE</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>OVER</span>
              <span className="font-semibold text-primary">4,000</span>
              <span>MODIFIED VEHICLES SOLD</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span>ON FACEBOOK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our approach</h2>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>
              Every listing is carefully crafted by the MotorMint team with detailed information 
              that's provided by the seller. During the submission process, the seller must complete our 
              submission form which requests several important bits of information regarding the vehicle 
              to ensure we can structure and develop an effective listing.
            </p>
            
            <p>
              <span className="text-foreground font-medium">We help communicate the value of your build,</span>{" "}
              selling a highly modified vehicle in a traditional marketplace can be a daunting task since 
              the average consumer is primarily focused on finding a vehicle with no modifications. 
              Modifications are often deemed to be detrimental to the overall value of the vehicle, which 
              is not the case in a majority of circumstances (this does not mean you will receive every 
              penny back that you put into the build). Our process behind the screen involves utilizing 
              our creativity and vigorous work ethic to formulate a transparent and well written listing 
              that stands out from the norm.
            </p>

            <p>
              <span className="text-foreground font-medium">Powerful advertising will bring your listing to life</span>{" "}
              and capture the attention of potential buyers who are largely unreachable with tradition 
              listing websites. We handle all of the advertising for your listing by dispersing your 
              vehicle through our social media channels, newsletter features, and a bespoke listing here 
              on the official MotorMint site.
            </p>

            <p>
              <span className="text-foreground font-medium">Transparent, well written and well structured ads</span>{" "}
              are the key attributes that make up the MotorMint. Transparency allows potential 
              buyers to gain a better understanding of what they're looking at and what the vehicle is 
              capable of. We combine the user submitted information and your expertise to develop an 
              effective listing that drives meaningful engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Expanding to new markets</h2>
          <h3 className="text-xl text-primary font-medium mb-8">Introducing Divisions</h3>
          
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
            We've helped sell every type of performance vehicle imaginable, from garage builds to world record 
            holding builds assembled by top tier performance shops. Now that we have established our 
            presence in the performance car scene, we are expanding to new markets with the introduction of 
            Divisions. If you're looking to sell your modified vehicle, we may have a Division that 
            perfectly suits your build. If not, shoot us a message, we are always open to expanding 
            our Divisions if there is enough interest.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="rounded-full">
              Request new Division
            </Button>
            <Link to="/listings">
              <Button className="rounded-full">
                View Divisions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAST Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">FAST</h2>
              <p className="text-muted-foreground leading-relaxed">
                Not only do we help sell some of the fastest vehicles in the world, but we also 
                mirror the FAST term into our service to ensure we provide the best possible 
                customer experience. While we do pride ourselves on our top tier quality, we also 
                work tirelessly to ensure we do so in a very quick manner, which allows us to keep 
                the market updated at all times while maintaining excellent communication with all 
                current and potential customers.
              </p>

              <div className="space-y-6 pt-4">
                {fastFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src={aboutCollage}
                alt="MotorMint Success Stories"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;