import { ref, set } from 'firebase/database';
import { database } from '../firebase';

export const initializeSampleProducts = async () => {
  const sampleProducts = [
    {
      name: "Starter MLM Kit",
      price: 99.99,
      image: "https://via.placeholder.com/400?text=Starter+Kit",
      category: "Kits",
      description: "Complete starter kit for new MLM entrepreneurs. Includes training materials, marketing tools, and business cards.",
      features: [
        "Training Manual",
        "Marketing Templates",
        "Business Cards",
        "Product Samples"
      ],
      shipping: "Free Shipping",
      warranty: "30-Day Money Back",
      stock: 100,
      isActive: true,
      rating: 4.5,
      reviews: 28,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      name: "Digital Marketing Course",
      price: 149.99,
      image: "https://via.placeholder.com/400?text=Digital+Course",
      category: "Digital",
      description: "Comprehensive digital marketing course for MLM professionals. Learn social media marketing, content creation, and lead generation.",
      features: [
        "Video Lessons",
        "Downloadable Resources",
        "Live Q&A Sessions",
        "Certificate of Completion"
      ],
      shipping: "Instant Access",
      warranty: "Lifetime Access",
      stock: 999,
      isActive: true,
      rating: 4.8,
      reviews: 156,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      name: "One-on-One Training Session",
      price: 199.99,
      image: "https://via.placeholder.com/400?text=Training+Session",
      category: "Training",
      description: "Personalized training session with MLM experts. Get customized strategies and mentorship for your business.",
      features: [
        "2-Hour Session",
        "Custom Strategy Plan",
        "Follow-up Support",
        "Resource Package"
      ],
      shipping: "Online Session",
      warranty: "Satisfaction Guaranteed",
      stock: 50,
      isActive: true,
      rating: 5.0,
      reviews: 42,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      name: "Marketing Package Pro",
      price: 299.99,
      image: "https://via.placeholder.com/400?text=Marketing+Pro",
      category: "Marketing",
      description: "Professional marketing package including social media templates, email sequences, and landing page designs.",
      features: [
        "Social Media Templates",
        "Email Sequences",
        "Landing Pages",
        "Graphics Package"
      ],
      shipping: "Digital Delivery",
      warranty: "6-Month Support",
      stock: 200,
      isActive: true,
      rating: 4.7,
      reviews: 89,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  try {
    const productsRef = ref(database, 'products');
    const productsObject = {};
    sampleProducts.forEach((product, index) => {
      productsObject[`product_${index + 1}`] = product;
    });
    await set(productsRef, productsObject);
    console.log('Sample products added successfully');
  } catch (error) {
    console.error('Error adding sample products:', error);
  }
};
