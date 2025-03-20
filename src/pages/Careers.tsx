import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer"; 
import { Button } from "@/components/ui/button";

const Careers = () => {
  // Updated roles with Google Forms links
  const roles = [
    {
      department: "Design Marketing Intern",
      about:
        "We're looking for a creative and detail-oriented Design Marketing Intern to join our team! You'll help craft compelling content across social media, blogs, ads, and our website, while also supporting SEO strategies to boost our online presence.",
      formLink: "Google form"
    },
    {
      department: "Content Marketing Intern",
      about: 
        "We're on the hunt for a talented and imaginative Content Marketing Intern to create eye-catching visuals that elevate our brand's marketing efforts. From social media graphics to website assets, your designs will help communicate our message in a bold and creative way.",
      formLink: "Google form"
    },
    {
      department: "Web Dev Intern",
      about: 
        "We're seeking a Web Development Intern to help build and maintain our website. You'll work closely with our design and marketing teams to create a seamless user experience and optimize site performance.",
      formLink: "google form"
    },
  ];

  const handleApplyClick = (formLink) => {
    // Open Google Form in a new tab
    window.open(formLink, "_blank");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        </div>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {roles.map((role) => (
              <div key={role.department} className="border p-6 rounded-lg shadow-lg flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-4">{role.department}</h2>
                <p className="mb-6 text-gray-600">{role.about}</p>
                <div className="mt-auto">
                  <Button 
                    className="w-full" 
                    onClick={() => handleApplyClick(role.formLink)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Careers;


