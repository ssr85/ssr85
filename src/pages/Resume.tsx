import { FileDown, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/SR_LOGO_no_bg.png";

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted/30">
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
      <div className="resume-container">
        {/* Page 1 */}
        <div className="resume-page">
          <div className="resume-sidebar">
            {/* Logo */}
            <div className="logo-container">
              <img src={Logo} alt="SR Logo" className="logo-image" />
            </div>

            {/* Contact Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Contact</h3>
              <div className="contact-list">
                <p className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span className="contact-text">sarabjit.rattan@gmail.com</span>
                </p>
                <p className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Pune, India</span>
                </p>
                <p className="contact-item">
                  <span className="contact-icon">🔗</span>
                  <span>LinkedIn Profile</span>
                </p>
                <p className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+91 XXXXX XXXXX</span>
                </p>
              </div>
            </div>

            {/* Education Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Education</h3>
              <div className="education-list">
                <div className="education-item">
                  <p className="education-title">Master of Business Administration</p>
                  <p className="education-subtitle">University Name</p>
                  <p className="education-year">Year - Year</p>
                </div>
                <div className="education-item">
                  <p className="education-title">Bachelor's Degree</p>
                  <p className="education-subtitle">University Name</p>
                  <p className="education-year">Year - Year</p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Skills</h3>
              <ul className="skills-list">
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
            <div className="sidebar-section-bottom">
              <h3 className="sidebar-heading">Languages</h3>
              <ul className="skills-list">
                <li>• English (Fluent)</li>
                <li>• Hindi (Native)</li>
                <li>• Punjabi (Native)</li>
              </ul>
            </div>
          </div>

          {/* Right Main Section */}
          <div className="resume-main">
            {/* Header */}
            <div className="main-header">
              <h1 className="main-name">Sarabjeet Rattan</h1>
              <p className="main-title">
                Strategic Operations Leader | Sustainable Business Builder
              </p>
            </div>

            {/* Professional Summary */}
            <div className="main-section">
              <h2 className="section-heading">Professional Summary</h2>
              <p className="section-text">
                Dynamic business consultant with 16+ years of experience in building sustainable systems 
                and small-business solutions. Proven track record in international sales, sustainable 
                manufacturing, and business systems consulting. Expert at bridging the gap between 
                traditional operations and modern automation, delivering measurable results across 
                diverse industries and markets.
              </p>
            </div>

            {/* Professional Experience */}
            <div className="main-section">
              <h2 className="section-heading">Professional Experience</h2>

              {/* Experience Entry 1 */}
              <div className="experience-entry">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">Business Systems Consultant</h3>
                    <p className="experience-company">Company Name | Location</p>
                  </div>
                  <span className="experience-date">2020 - Present</span>
                </div>
                <p className="experience-description">
                  Led strategic initiatives to optimize business operations and implement sustainable 
                  manufacturing practices across multiple client organizations.
                </p>
                <ul className="experience-bullets">
                  <li>• Implemented process automation solutions reducing operational costs by X%</li>
                  <li>• Developed and launched sustainable product lines for international markets</li>
                  <li>• Managed cross-functional teams to deliver complex business transformation projects</li>
                </ul>
              </div>

              {/* Experience Entry 2 */}
              <div className="experience-entry">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">International Sales Manager</h3>
                    <p className="experience-company">Company Name | Location</p>
                  </div>
                  <span className="experience-date">2015 - 2020</span>
                </div>
                <p className="experience-description">
                  Drove international business development and established key partnerships across 
                  multiple regions, focusing on sustainable and eco-friendly product solutions.
                </p>
                <ul className="experience-bullets">
                  <li>• Expanded market presence to X+ countries, generating $X million in revenue</li>
                  <li>• Built and maintained relationships with key international distributors</li>
                  <li>• Led product positioning and market entry strategies for new regions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div className="resume-page">
          <div className="resume-sidebar">
            {/* Certifications Section */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Certifications</h3>
              <ul className="certification-list">
                <li>
                  <p className="education-title">Certification Name</p>
                  <p className="education-year">Issuing Organization, Year</p>
                </li>
                <li>
                  <p className="education-title">Certification Name</p>
                  <p className="education-year">Issuing Organization, Year</p>
                </li>
              </ul>
            </div>

            {/* Tools & Technologies */}
            <div className="sidebar-section">
              <h3 className="sidebar-heading">Tools & Technologies</h3>
              <ul className="skills-list">
                <li>• Microsoft Office Suite</li>
                <li>• CRM Systems</li>
                <li>• ERP Solutions</li>
                <li>• Project Management Tools</li>
                <li>• Data Analytics</li>
              </ul>
            </div>

            {/* Interests */}
            <div className="sidebar-section-bottom">
              <h3 className="sidebar-heading">Interests</h3>
              <ul className="skills-list">
                <li>• Sustainable Manufacturing</li>
                <li>• Green Technology</li>
                <li>• Business Innovation</li>
              </ul>
            </div>
          </div>

          {/* Right Main Section - Continued */}
          <div className="resume-main">
            {/* Professional Experience Continued */}
            <div className="main-section">
              <h2 className="section-heading">Professional Experience (Continued)</h2>

              {/* Experience Entry 3 */}
              <div className="experience-entry">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">Operations Manager</h3>
                    <p className="experience-company">Company Name | Location</p>
                  </div>
                  <span className="experience-date">2010 - 2015</span>
                </div>
                <p className="experience-description">
                  Oversaw day-to-day operations and led process improvement initiatives to enhance 
                  efficiency and reduce waste in manufacturing operations.
                </p>
                <ul className="experience-bullets">
                  <li>• Streamlined production processes, improving efficiency by X%</li>
                  <li>• Implemented quality control measures reducing defect rates</li>
                  <li>• Trained and mentored team members on operational best practices</li>
                </ul>
              </div>

              {/* Experience Entry 4 */}
              <div className="experience-entry">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">Business Development Executive</h3>
                    <p className="experience-company">Company Name | Location</p>
                  </div>
                  <span className="experience-date">2008 - 2010</span>
                </div>
                <p className="experience-description">
                  Identified and pursued new business opportunities, building client relationships 
                  and contributing to company growth in competitive markets.
                </p>
                <ul className="experience-bullets">
                  <li>• Generated new leads and converted prospects into long-term clients</li>
                  <li>• Collaborated with marketing team on promotional strategies</li>
                  <li>• Achieved X% of annual sales targets consistently</li>
                </ul>
              </div>
            </div>

            {/* Key Projects */}
            <div className="main-section">
              <h2 className="section-heading">Key Projects</h2>
              
              <div className="projects-list">
                <div className="project-item">
                  <h3 className="project-title">OG Hemp — Sustainable Products</h3>
                  <p className="project-description">
                    Led operations for eco-friendly hemp products company, establishing supply chains 
                    and market positioning for sustainable consumer goods.
                  </p>
                </div>
                <div className="project-item">
                  <h3 className="project-title">Skaizen Water — Water Solutions</h3>
                  <p className="project-description">
                    Developed business systems and processes for innovative water purification 
                    and sustainability solutions.
                  </p>
                </div>
                <div className="project-item">
                  <h3 className="project-title">Tech Automation — Process Optimization</h3>
                  <p className="project-description">
                    Implemented technology solutions to automate business processes and improve 
                    operational efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="references">
              <p className="references-text">References available upon request</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        .resume-container {
          max-width: 210mm;
          margin: 0 auto;
          padding: 2rem 0;
        }
        
        .resume-page {
          width: 210mm;
          height: 297mm;
          background: white;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          margin-bottom: 2rem;
          display: flex;
          overflow: hidden;
        }
        
        .resume-sidebar {
          width: 35%;
          background: #5D2E2E;
          color: white;
          padding: 20mm 6mm 15mm 6mm;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        
        .resume-main {
          width: 65%;
          padding: 15mm 10mm 15mm 8mm;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        
        .logo-container {
          width: 100px;
          height: 100px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo-image {
          width: 80%;
          height: 80%;
          object-fit: contain;
        }
        
        .sidebar-section {
          margin-bottom: 18px;
        }
        
        .sidebar-section-bottom {
          margin-top: auto;
        }
        
        .sidebar-heading {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }
        
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
        }
        
        .contact-icon {
          opacity: 0.7;
        }
        
        .contact-text {
          word-break: break-all;
        }
        
        .education-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .education-item {
          font-size: 11px;
        }
        
        .education-title {
          font-weight: 600;
          font-size: 11px;
        }
        
        .education-subtitle {
          opacity: 0.8;
          font-size: 10px;
        }
        
        .education-year {
          opacity: 0.6;
          font-size: 10px;
        }
        
        .skills-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 11px;
          line-height: 1.6;
        }
        
        .certification-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .main-header {
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #5D2E2E;
        }
        
        .main-name {
          font-size: 28px;
          font-family: Georgia, serif;
          color: #5D2E2E;
          margin-bottom: 4px;
        }
        
        .main-title {
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .main-section {
          margin-bottom: 18px;
        }
        
        .section-heading {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #5D2E2E;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .section-text {
          font-size: 11px;
          color: #555;
          line-height: 1.6;
        }
        
        .experience-entry {
          margin-bottom: 16px;
        }
        
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }
        
        .experience-title {
          font-weight: 600;
          font-size: 13px;
          color: #333;
        }
        
        .experience-company {
          font-size: 11px;
          color: #666;
        }
        
        .experience-date {
          font-size: 10px;
          color: #666;
          white-space: nowrap;
        }
        
        .experience-description {
          font-size: 11px;
          color: #555;
          line-height: 1.5;
          margin-bottom: 6px;
        }
        
        .experience-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 11px;
          color: #555;
          line-height: 1.5;
        }
        
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .project-title {
          font-weight: 600;
          font-size: 12px;
          color: #333;
          margin-bottom: 4px;
        }
        
        .project-description {
          font-size: 11px;
          color: #555;
          line-height: 1.5;
        }
        
        .references {
          margin-top: auto;
        }
        
        .references-text {
          font-size: 11px;
          color: #666;
          font-style: italic;
        }
        
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .resume-container {
            padding: 0;
            max-width: none;
          }
          
          .resume-page {
            width: 210mm;
            height: 297mm;
            page-break-after: always;
            page-break-inside: avoid;
            box-shadow: none;
            margin: 0;
          }
          
          .resume-page:last-child {
            page-break-after: auto;
          }
          
          .resume-sidebar {
            background: #5D2E2E !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        @media screen and (max-width: 900px) {
          .resume-page {
            width: 100%;
            height: auto;
            min-height: auto;
            flex-direction: column;
          }
          
          .resume-sidebar,
          .resume-main {
            width: 100%;
          }
          
          .resume-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
