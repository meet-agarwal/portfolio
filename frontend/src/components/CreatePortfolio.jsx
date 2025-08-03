import { useState } from 'react';

const CreatePortfolio = ({ onClose, onCreated }) => {
  const [portfolioId, setPortfolioId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!portfolioId.trim() || !name.trim() || !role.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsCreating(true);

    try {
      // Create a basic portfolio template
      const templatePortfolio = {
        header: {
          name: name,
          role: role,
          desc: "I'm a developer passionate about creating amazing digital experiences.",
          skills: ["JavaScript", "React", "Node.js"],
          icons: {
            github: {
              link: "https://github.com/yourusername",
              iconSrc: "faGithub"
            },
            linkedin: {
              link: "https://linkedin.com/in/yourusername",
              iconSrc: "faLinkedin"
            }
          }
        },
        about: {
          txt: [
            "I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering.",
            "Currently, I'm working on exciting projects and always looking for new opportunities to learn and grow."
          ],
          link: {
            "GitHub": "https://github.com/yourusername",
            "LinkedIn": "https://linkedin.com/in/yourusername"
          }
        },
        experience: {
          cards: [
            {
              dates: "Jan 2024 - Present",
              role: "Software Developer",
              company: "Your Company",
              companyLink: "https://yourcompany.com",
              desc: "Working on exciting projects and contributing to the team's success.",
              tags: ["JavaScript", "React", "Node.js"],
              pinLinks: {}
            }
          ],
          links: {
            label: "Resume",
            src: "./resume"
          }
        },
        project: {
          cards: [
            {
              date: "Dec 2024",
              Title: "Portfolio Website",
              projectLink: "https://yourportfolio.com",
              desc: "A beautiful portfolio website built with React and modern web technologies.",
              tags: ["React", "JavaScript", "CSS"],
              pinLinks: {},
              img: "https://via.placeholder.com/400x200?text=Project+Image"
            }
          ],
          links: {
            label: "View All Projects",
            src: "./projects"
          },
          limit: 2
        },
        section: {
          cards: [],
          links: {
            label: "More Work",
            src: "./more"
          }
        },
        footer: {
          txt: [
            "Designed and built with ❤️ using React and Tailwind CSS."
          ],
          link: {
            "React": "https://reactjs.org/",
            "Tailwind CSS": "https://tailwindcss.com/"
          }
        }
      };

      const response = await fetch(`http://localhost:5000/api/portfolio/${portfolioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templatePortfolio),
      });

      if (!response.ok) {
        throw new Error('Failed to create portfolio');
      }

      alert(`Portfolio created successfully! Visit: ${window.location.origin}/${portfolioId}`);
      onCreated(portfolioId);
      onClose();
    } catch (error) {
      alert('Error creating portfolio: ' + error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Portfolio</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleCreate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Portfolio ID (URL slug)
                </label>
                <input
                  type="text"
                  value={portfolioId}
                  onChange={(e) => setPortfolioId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="your-name"
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  This will be your portfolio URL: {window.location.origin}/{portfolioId}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Software Developer"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isCreating ? 'Creating...' : 'Create Portfolio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio; 