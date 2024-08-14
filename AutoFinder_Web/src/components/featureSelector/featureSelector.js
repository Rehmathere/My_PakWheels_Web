import { useEffect, useState } from 'react';

const FeatureSelector = ({ passValueFn }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const suggestions = [
    'Alloy Rims', 'Sunroof', 'Leather Seats', 'Navigation System', 'Fog Lights',
    'Cruise Control', 'Air Conditioning', 'Bluetooth Connectivity', 'Keyless Entry',
    'Power Windows', 'Power Steering',  'Auction Sheet Available',
    'Bumper-to-Bumper Original',
  ];

  const handleFeatureChange = (e) => {
    const feature = e.target.value;
    if (e.target.checked) {
      setSelectedFeatures([...selectedFeatures, feature]);
    } else {
      setSelectedFeatures(selectedFeatures.filter(item => item !== feature));
    }
  };

  useEffect(() => {
    passValueFn(selectedFeatures)
  }, [selectedFeatures]);

  return (
    <div className="FeatureSelector" style={styles.container}>
      <label style={styles.label}>Features:</label>
      <div className="featuresContainer" style={styles.featuresContainer}>
        {suggestions.map(item => (
          <div key={item} style={styles.checkboxContainer}>
            <input
              type='checkbox'
              value={item}
              onChange={handleFeatureChange}
              checked={selectedFeatures.includes(item)}
            />
            <label style={styles.checkboxLabel}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSelector;

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    marginBottom: '5px',
    flexBasis: '50%', // Each checkbox container takes up 50% of the width
    boxSizing: 'border-box',
    padding: '0 5px', // Add some padding between checkboxes
  },
  checkboxLabel: {
    marginLeft: '5px',
    fontWeight:"300"
  },
};
