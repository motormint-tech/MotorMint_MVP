import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex flex-col mb-4">
              <span className="text-xs text-muted-foreground tracking-widest">BLOCKCHAIN POWERED</span>
              <span className="text-xl font-bold tracking-tight text-foreground">MOTOR<span className="text-primary">MINT</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              The decentralized marketplace for tokenized vehicle ownership. 
              Smart contract escrow. On-chain verification. Global access.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/listings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Submit Vehicle
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tag/street-cars" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Street Cars
                </Link>
              </li>
              <li>
                <Link to="/tag/performance-trucks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Performance Trucks
                </Link>
              </li>
              <li>
                <Link to="/tag/available" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Available
                </Link>
              </li>
              <li>
                <Link to="/tag/sold" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Recently Sold
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2015-2026 MotorMint. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
