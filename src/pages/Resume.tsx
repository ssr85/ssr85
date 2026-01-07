import { FileDown, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/SR_LOGO_no_bg.png";

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="min-h-screen bg-muted/30 print:min-h-0 print:bg-transparent">
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-background border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Home size={18} />
            <span>Back to Portfolio</span>
          </Link>
          <Button onClick={handlePrint} className="gap-2">
            <FileDown size={18} />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Resume Container */}
      <div className="resume-container py-8 print:py-0 print:m-0 print:p-0">
        {/* Page 1 */}
        <div className="resume-page bg-white shadow-lg print:shadow-none mx-auto mb-8 print:mb-0 print:mx-0 overflow-hidden">
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-[35%] bg-[#5D2E2E] text-white p-6 print:p-5 flex flex-col">
              {/* Logo */}
              <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img src={Logo} alt="SR Logo" className="w-20 h-20 object-contain" />
              </div>

              {/* Contact Section */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">Contact</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <span className="opacity-70">📧</span>
                    <span className="break-all">sarabjit.rattan@gmail.com</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="opacity-70">📍</span>
                    <span>Pune, India</span>
                  </p>

                  <p className="flex items-start gap-2">
                    <span className="opacity-70">📱</span>
                    <span>+91 866 898 4323</span>
                  </p>
                </div>
              </div>

              {/* Education Section */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">Education</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold">Product Management with Generative & Agentic AI</p>
                    <p className="opacity-80 text-xs">BITS School of Management</p>
                    <p className="opacity-60 text-xs">2025-2026</p>
                  </div>
                  <div>
                    <p className="font-semibold">Master in International Business</p>
                    <p className="opacity-80 text-xs">Grenoble Graduate School of Business</p>
                    <p className="opacity-60 text-xs">2009-2011</p>
                  </div>
                  <div>
                    <p className="font-semibold">Bachelor of Engineering</p>
                    <p className="opacity-80 text-xs">Nagpur University</p>
                    <p className="opacity-60 text-xs">2004-2007</p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">Skills</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Operations Setup & Optimization</li>
                  <li>• Sustainable Product Innovation</li>
                  <li>• Business Analysis & Strategy</li>
                  <li>• International B2B Sales</li>
                  <li>• Process Automation</li>
                  <li>• Systems Design</li>
                  <li>• Project Management</li>
                  <li>• Team Leadership</li>
                </ul>
              </div>

              {/* Languages Section */}
              <div className="mt-auto">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">Languages</h3>
                <ul className="space-y-1 text-sm">
                  <li>• English (Fluent)</li>
                  <li>• Hindi (Native)</li>
                  <li>• Punjabi (Native)</li>
                </ul>
              </div>
            </div>

            {/* Right Main Section */}
            <div className="w-[65%] p-6 print:p-5 flex flex-col">
              {/* Header */}
              <div className="mb-6 border-b-2 border-[#5D2E2E] pb-4">
                <h1 className="text-3xl font-serif text-[#5D2E2E] mb-1">Sarabjeet Rattan</h1>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Strategic Operations Leader | Sustainable Business Builder
                </p>
              </div>

              {/* Professional Summary */}
              <div className="mb-6">
                <h2 className="text-sm uppercase tracking-widest text-[#5D2E2E] mb-3 font-semibold">
                  Professional Summary
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dynamic business consultant with 16+ years of experience in building sustainable systems and
                  small-business solutions. Proven track record in international sales, sustainable manufacturing, and
                  business systems consulting. Expert at bridging the gap between traditional operations and modern
                  automation, delivering measurable results across diverse industries and markets.
                </p>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-sm uppercase tracking-widest text-[#5D2E2E] mb-4 font-semibold">
                  Professional Experience
                </h2>

                {/* Experience Entry 1 */}
                <div className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">Business Consultant</h3>
                      <p className="text-sm text-muted-foreground">SkaizenTech | Pune</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">2020 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    Led strategic initiatives to optimize business operations and implement automation practices across
                    multiple client organizations.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Implemented process automation solutions reducing operational costs by reducing man-hours</li>
                    <li>• Translate consumer pain points into a solution leveraging AI tools</li>
                    <li>• End mile drinking water solutions for commercial establishments</li>
                  </ul>
                </div>

                {/* Experience Entry 2 */}
                <div className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">International B2B Sales</h3>
                      <p className="text-sm text-muted-foreground">OG Hemp | Pune</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">2017 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    Drove international business development and established key partnerships across multiple regions,
                    focusing on sustainable and eco-friendly product solutions.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Expanded market presence to 10+ countries</li>
                    <li>• Built and maintained relationships with key international distributors</li>
                    <li>• Developed and launched sustainable product lines for international markets</li>
                    <li>• Led product positioning and market entry strategies for new regions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div className="resume-page bg-white shadow-lg print:shadow-none mx-auto overflow-hidden">
          <div className="flex h-full">
            {/* Left Sidebar - Continued */}
            <div className="w-[35%] bg-[#5D2E2E] text-white p-6 print:p-5 flex flex-col">
              {/* Certifications Section */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">Certifications</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <p className="font-semibold">Certification Name</p>
                    <p className="opacity-60 text-xs">Issuing Organization, Year</p>
                  </li>
                  <li>
                    <p className="font-semibold">Certification Name</p>
                    <p className="opacity-60 text-xs">Issuing Organization, Year</p>
                  </li>
                </ul>
              </div>

              {/* Tools & Technologies */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">
                  Tools & Technologies
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Microsoft Office Suite</li>
                  <li>• CRM Systems</li>
                  <li>• ERP Solutions</li>
                  <li>• Project Management Tools</li>
                  <li>• Data Analytics</li>
                </ul>
              </div>

              {/* Interests */}
              <div className="mt-auto">
                <h3 className="text-xs uppercase tracking-widest mb-3 border-b border-white/30 pb-2">Interests</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Sustainable Manufacturing</li>
                  <li>• Green Technology</li>
                  <li>• Business Innovation</li>
                </ul>
              </div>
            </div>

            {/* Right Main Section - Continued */}
            <div className="w-[65%] p-6 print:p-5 flex flex-col">
              {/* Professional Experience Continued */}
              <div className="mb-6">
                <h2 className="text-sm uppercase tracking-widest text-[#5D2E2E] mb-4 font-semibold">
                  Professional Experience (Continued)
                </h2>

                {/* Experience Entry 3 */}
                <div className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">Operations Manager</h3>
                      <p className="text-sm text-muted-foreground">OG Hemp | Pune</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">2017 - Present</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    Oversaw day-to-day operations and led process improvement initiatives to enhance efficiency and
                    reduce waste in manufacturing operations.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Streamlined production processes, improving efficiency</li>
                    <li>• Implemented quality control measures reducing defect rates</li>
                    <li>• Trained and mentored team members on operational best practices</li>
                  </ul>
                </div>

                {/* Experience Entry 4 */}
                <div className="mb-5">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">Business Development Executive</h3>
                      <p className="text-sm text-muted-foreground">Company Name | Location</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">2008 - 2010</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    Identified and pursued new business opportunities, building client relationships and contributing to
                    company growth in competitive markets.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Generated new leads and converted prospects into long-term clients</li>
                    <li>• Collaborated with marketing team on promotional strategies</li>
                    <li>• Achieved X% of annual sales targets consistently</li>
                  </ul>
                </div>
              </div>

              {/* Key Projects */}
              <div className="mb-6">
                <h2 className="text-sm uppercase tracking-widest text-[#5D2E2E] mb-4 font-semibold">Key Projects</h2>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Skaizen Water — Water Solutions</h3>
                    <p className="text-sm text-muted-foreground">
                      Developed business systems and processes for innovative water purification and sustainability
                      solutions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Tech Automation — Process Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Implemented technology solutions to automate business processes and improve operational
                      efficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="mt-auto">
                <p className="text-sm text-muted-foreground italic">References available upon request</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        /* Hide reCAPTCHA badge on resume page */
        .grecaptcha-badge {
          display: none !important;
        }
        
        .resume-container {
          max-width: 210mm;
          margin: 0 auto;
        }
        
        .resume-page {
          width: 210mm;
          min-height: 297mm;
        }
        
        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: A4;
            margin: 0 !important;
          }
          
          html, body, #root {
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .resume-container {
            width: 210mm !important;
            max-width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .resume-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-after: always;
            page-break-inside: avoid;
            box-shadow: none !important;
            overflow: hidden !important;
          }
          
          .resume-page:last-child {
            page-break-after: auto;
          }
          
          /* Ensure sidebar and content fill the page */
          .resume-page > div {
            height: 297mm !important;
            min-height: 297mm !important;
          }
          
          .resume-page .w-\\[35\\%\\] {
            min-height: 297mm !important;
            height: 297mm !important;
          }
          
          .resume-page .w-\\[65\\%\\] {
            min-height: 297mm !important;
            height: 297mm !important;
          }
        }
        
        @media screen and (max-width: 900px) {
          .resume-page {
            width: 100%;
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
};
export default Resume;
