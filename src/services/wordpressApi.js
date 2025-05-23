

// Test if WordPress API is available
export const isWordPressAPIAvailable = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/wp/v2`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Your default home page design data
export const defaultHomeDesign = {
  title: "Welcome to Our Website",
  content: "<p>This is the home page of our application.</p>",
  features: [
    "Feature 1",
    "Feature 2", 
    "Feature 3"
  ]
};