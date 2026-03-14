import { v2SiteConfig } from "@/data/v2Content";

interface V2FooterProps {
  onOpenEnquiry: () => void;
  onOpenResume: () => void;
}

export const V2Footer = ({ onOpenEnquiry, onOpenResume }: V2FooterProps) => {
  return (
    <footer id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
            Ready to Scale Your B2B Operations?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Whether you're looking to implement agentic systems or seeking strategic operational guidance, let's discuss how we can build your next engine.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={onOpenEnquiry}
              className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-all w-full md:w-auto active:scale-95"
            >
              Get in Touch
            </button>
            <button 
              onClick={onOpenResume}
              className="border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/5 transition-all w-full md:w-auto active:scale-95"
            >
              Download PDF Resume
            </button>
          </div>

          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} {v2SiteConfig.name}. Built for B2B Scale.
            </p>
            <div className="flex gap-8 text-sm font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
