import { useState, useEffect } from 'react';

const PortfolioEditor = ({ portfolioData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(portfolioData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setFormData(portfolioData);
  }, [portfolioData]);

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        // Handle array fields
        if (Array.isArray(newData[section][field])) {
          newData[section][field] = [...newData[section][field]];
          newData[section][field][index] = value;
        }
      } else {
        // Handle object fields
        if (typeof newData[section][field] === 'object' && newData[section][field] !== null) {
          newData[section][field] = { ...newData[section][field], ...value };
        } else {
          newData[section][field] = value;
        }
      }
      
      return newData;
    });
  };

  const handleArrayItemChange = (section, field, index, subField, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][field][index] = { ...newData[section][field][index] };
      newData[section][field][index][subField] = value;
      return newData;
    });
  };

  const addArrayItem = (section, field, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], template]
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      await onSave(formData);
      setSaveMessage('Portfolio saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving portfolio: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const renderTextArrayInput = (section, field, label) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {formData[section][field].map((text, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <textarea
            value={text}
            onChange={(e) => handleInputChange(section, field, e.target.value, index)}
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
            rows="3"
          />
          <button
            onClick={() => removeArrayItem(section, field, index)}
            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem(section, field, '')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add {label}
      </button>
    </div>
  );

  const renderLinksInput = (section, field, label) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {Object.entries(formData[section][field]).map(([key, value]) => (
        <div key={key} className="flex gap-2 mb-2">
          <input
            type="text"
            value={key}
            onChange={(e) => {
              const newLinks = { ...formData[section][field] };
              delete newLinks[key];
              newLinks[e.target.value] = value;
              handleInputChange(section, field, newLinks);
            }}
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
            placeholder="Link text"
          />
          <input
            type="url"
            value={value}
            onChange={(e) => {
              const newLinks = { ...formData[section][field] };
              newLinks[key] = e.target.value;
              handleInputChange(section, field, newLinks);
            }}
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
            placeholder="URL"
          />
          <button
            onClick={() => {
              const newLinks = { ...formData[section][field] };
              delete newLinks[key];
              handleInputChange(section, field, newLinks);
            }}
            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          const newLinks = { ...formData[section][field] };
          newLinks['New Link'] = '';
          handleInputChange(section, field, newLinks);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Link
      </button>
    </div>
  );

  const renderCardArrayInput = (section, field, label) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {formData[section][field].map((card, index) => (
        <div key={index} className="border border-gray-600 rounded p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-white">Card {index + 1}</h4>
            <button
              onClick={() => removeArrayItem(section, field, index)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove Card
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={card.date || card.dates || ''}
              onChange={(e) => handleArrayItemChange(section, field, index, 'date' in card ? 'date' : 'dates', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              placeholder="Date"
            />
            
            <input
              type="text"
              value={card.Title || card.role || ''}
              onChange={(e) => handleArrayItemChange(section, field, index, 'Title' in card ? 'Title' : 'role', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              placeholder="Title/Role"
            />
            
            <input
              type="text"
              value={card.company || ''}
              onChange={(e) => handleArrayItemChange(section, field, index, 'company', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              placeholder="Company"
            />
            
            <input
              type="url"
              value={card.projectLink || card.companyLink || ''}
              onChange={(e) => handleArrayItemChange(section, field, index, 'projectLink' in card ? 'projectLink' : 'companyLink', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
              placeholder="Link"
            />
            
            <div className="md:col-span-2">
              <textarea
                value={card.desc || ''}
                onChange={(e) => handleArrayItemChange(section, field, index, 'desc', e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                rows="3"
                placeholder="Description"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(card.tags) ? card.tags.join(', ') : ''}
                onChange={(e) => handleArrayItemChange(section, field, index, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                placeholder="Python, React, JavaScript"
              />
            </div>
            
            {card.img && (
              <div className="md:col-span-2">
                <input
                  type="url"
                  value={card.img}
                  onChange={(e) => handleArrayItemChange(section, field, index, 'img', e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Image URL"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem(section, field, {
          date: '',
          Title: '',
          company: '',
          projectLink: '',
          desc: '',
          tags: [],
          img: ''
        })}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Card
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Portfolio</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {saveMessage && (
            <div className={`mb-4 p-3 rounded ${saveMessage.includes('Error') ? 'bg-red-600' : 'bg-green-600'} text-white`}>
              {saveMessage}
            </div>
          )}

          <div className="space-y-8">
            {/* Header Section */}
            <div className="border border-gray-600 rounded p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.header.name}
                  onChange={(e) => handleInputChange('header', 'name', e.target.value)}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={formData.header.role}
                  onChange={(e) => handleInputChange('header', 'role', e.target.value)}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Role"
                />
                <div className="md:col-span-2">
                  <textarea
                    value={formData.header.desc}
                    onChange={(e) => handleInputChange('header', 'desc', e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    rows="3"
                    placeholder="Description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.header.skills) ? formData.header.skills.join(', ') : ''}
                    onChange={(e) => handleInputChange('header', 'skills', e.target.value.split(',').map(skill => skill.trim()))}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    placeholder="Python, React, JavaScript"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="border border-gray-600 rounded p-4">
              <h3 className="text-xl font-semibold text-white mb-4">About</h3>
              {renderTextArrayInput('about', 'txt', 'About Text')}
              {renderLinksInput('about', 'link', 'About Links')}
            </div>

            {/* Experience Section */}
            <div className="border border-gray-600 rounded p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
              {renderCardArrayInput('experience', 'cards', 'Experience Cards')}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.experience.links.label}
                  onChange={(e) => handleInputChange('experience', 'links', { ...formData.experience.links, label: e.target.value })}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={formData.experience.links.src}
                  onChange={(e) => handleInputChange('experience', 'links', { ...formData.experience.links, src: e.target.value })}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Link Source"
                />
              </div>
            </div>

            {/* Project Section */}
            <div className="border border-gray-600 rounded p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Projects</h3>
              {renderCardArrayInput('project', 'cards', 'Project Cards')}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.project.links.label}
                  onChange={(e) => handleInputChange('project', 'links', { ...formData.project.links, label: e.target.value })}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={formData.project.links.src}
                  onChange={(e) => handleInputChange('project', 'links', { ...formData.project.links, src: e.target.value })}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Link Source"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Limit</label>
                <input
                  type="number"
                  value={formData.project.limit}
                  onChange={(e) => handleInputChange('project', 'limit', parseInt(e.target.value))}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  min="1"
                />
              </div>
            </div>

            {/* Section Section */}
            <div className="border border-gray-600 rounded p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Additional Section</h3>
              {renderCardArrayInput('section', 'cards', 'Section Cards')}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.section.links.label}
                  onChange={(e) => handleInputChange('section', 'links', { ...formData.section.links, label: e.target.value })}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={formData.section.links.src}
                  onChange={(e) => handleInputChange('section', 'links', { ...formData.section.links, src: e.target.value })}
                  className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Link Source"
                />
              </div>
            </div>

            {/* Footer Section */}
            <div className="border border-gray-600 rounded p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Footer</h3>
              {renderTextArrayInput('footer', 'txt', 'Footer Text')}
              {renderLinksInput('footer', 'link', 'Footer Links')}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditor; 