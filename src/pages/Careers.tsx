import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer"; 

const Careers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Updated roles with specific questions for each role
  const roles = [
    {
      department: "Design Marketing Intern",
      about:
        "We're looking for a creative and detail-oriented Design Marketing Intern to join our team! You'll help craft compelling content across social media, blogs, ads, and our website, while also supporting SEO strategies to boost our online presence.",
      questions: [
        {
          id: "portfolio",
          label: "Portfolio Link",
          type: "text",
          placeholder: "https://yourportfolio.com",
          required: true
        },
        {
          id: "design_tools",
          label: "What design tools are you proficient in?",
          type: "text",
          placeholder: "Figma, Adobe XD, Photoshop, etc.",
          required: true
        },
        {
          id: "viral_post",
          label: "You wake up, and Fixo has just gone viral! What would your first design post look like? (Describe or share a rough idea)",
          type: "textarea",
          placeholder: "Describe your creative concept here...",
          required: true
        },
        {
          id: "repair_meme",
          label: "Create a meme about bad repair experiences and how Fixo solves them.",
          type: "textarea",
          placeholder: "Describe your meme concept here...",
          required: true
        },
        {
          id: "fixo_aesthetic",
          label: "If Fixo were a person, what would be its visual aesthetic? Sketch or describe it.",
          type: "textarea",
          placeholder: "Describe Fixo's visual character and aesthetic...",
          required: true
        },
        {
          id: "color_palette",
          label: "Choose a color palette for Fixo's marketing—explain why.",
          type: "textarea",
          placeholder: "Describe your color choices and reasoning...",
          required: true
        },
        {
          id: "design_trends",
          label: "What's a design trend you love, and what's one you absolutely hate?",
          type: "textarea",
          placeholder: "Share your thoughts on current design trends...",
          required: true
        }
      ]
    },
    {
      department: "Content Marketing Intern",
      about: 
        "We're on the hunt for a talented and imaginative Content Marketing Intern to create eye-catching visuals that elevate our brand's marketing efforts. From social media graphics to website assets, your designs will help communicate our message in a bold and creative way.",
      questions: [
        {
          id: "writing_sample",
          label: "Link to a writing sample",
          type: "text",
          placeholder: "https://medium.com/yourarticle",
          required: true
        },
        {
          id: "quirky_ad",
          label: "Write a quirky ad copy for Fixo in less than 50 words.",
          type: "textarea",
          placeholder: "Your ad copy here...",
          required: true
        },
        {
          id: "fixo_tagline",
          label: "If Fixo had a tagline, what would it be?",
          type: "text",
          placeholder: "Your tagline idea here...",
          required: true
        },
        {
          id: "linkedin_post",
          label: "You have to write a viral LinkedIn post about why people should trust online repair services. How would you start it?",
          type: "textarea",
          placeholder: "Start your LinkedIn post here...",
          required: true
        },
        {
          id: "tech_story",
          label: "What's the most interesting tech story or repair hack you've come across? Write a short post about it.",
          type: "textarea",
          placeholder: "Share your tech story here...",
          required: true
        },
        {
          id: "brand_lessons",
          label: "Pick a brand known for its amazing content marketing. What lessons can Fixo learn from them?",
          type: "textarea",
          placeholder: "Share your analysis here...",
          required: true
        }
      ]
    },
  ];

  const handleApplyClick = (department) => {
    setSelectedDepartment(department);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Create an object to store all form data
    const applicationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      cv: formData.get("cv"),
      department: selectedDepartment,
      responses: {}
    };
    
    // Get the current role's questions
    const currentRole = roles.find(role => role.department === selectedDepartment);
    
    // Add question responses to the data object
    if (currentRole && currentRole.questions) {
      currentRole.questions.forEach(question => {
        applicationData.responses[question.id] = formData.get(question.id);
      });
    }
    
    console.log(applicationData);
    
    setIsFormOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Find the current role based on selected department
  const currentRole = roles.find(role => role.department === selectedDepartment);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At FIXO, we're building the future of device repair services. Join us in our
            mission to provide reliable and efficient repair solutions to our customers.
          </p> */}
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {roles.map((role) => (
              <div key={role.department} className="border p-6 rounded-lg shadow-lg flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-4">{role.department}</h2>
                <p className="mb-6 text-gray-600">{role.about}</p>
                <div className="mt-auto">
                  <Button className="w-full" onClick={() => handleApplyClick(role.department)}>
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Popup with Blur Background */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-4">
                Apply for {selectedDepartment}
              </h3>
              <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                {/* Basic information */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                    Upload CV
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    required
                    className="mt-1 w-full"
                  />
                </div>

                {/* Role-specific questions */}
                {currentRole && currentRole.questions && (
                  <div className="mb-6">
                    <h4 className="font-medium text-lg mb-3">Role-Specific Questions</h4>
                    <div className="space-y-4">
                      {currentRole.questions.map((question) => (
                        <div key={question.id} className="mb-4">
                          <label 
                            htmlFor={question.id} 
                            className="block text-sm font-medium text-gray-700"
                          >
                            {question.label}
                          </label>
                          {question.type === 'textarea' ? (
                            <textarea
                              id={question.id}
                              name={question.id}
                              required={question.required}
                              placeholder={question.placeholder}
                              className="mt-1 p-2 w-full border rounded-md min-h-24"
                            />
                          ) : (
                            <input
                              type={question.type}
                              id={question.id}
                              name={question.id}
                              required={question.required}
                              placeholder={question.placeholder}
                              className="mt-1 p-2 w-full border rounded-md"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
            Application submitted successfully! We will contact you soon.
          </div>
        )}
      </div>
      <Footer /> 
    </div>
  );
};

export default Careers;