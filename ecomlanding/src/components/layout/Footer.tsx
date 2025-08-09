import React, { useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  slug: string;
}

interface FooterProps {
  categories: Category[];
}

const Footer: React.FC<FooterProps> = ({ categories }) => {

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
              ShopFlow
            </h3>
            <p className="text-gray-400">
              Your one-stop destination for premium products and exceptional shopping experience.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 4).map((category) => (
                <li key={category.slug}>
                  <Link href={`/categories/${category.slug}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors duration-200">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors duration-200">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors duration-200">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Feedback</h4>
            <p className="text-gray-400 mb-4">We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
            <form className="space-y-3" onSubmit={e => {
              e.preventDefault();
              if (!contactName || !contactEmail || !contactMessage) {
                setContactError("Please fill out all fields.");
                return;
              }
              if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactEmail)) {
                setContactError("Please enter a valid email address.");
                return;
              }
              setContactError("");
              setContactSuccess("Message sent! We'll reply soon.");
              setContactName("");
              setContactEmail("");
              setContactMessage("");
              // You can add API call here
            }}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none min-h-[80px]"
                value={contactMessage}
                onChange={e => setContactMessage(e.target.value)}
              />
              <button
                type="submit"
                className="w-full px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
            {contactError && <p className="text-red-400 mt-2 text-sm">{contactError}</p>}
            {contactSuccess && <p className="text-teal-400 mt-2 text-sm">{contactSuccess}</p>}
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ShopFlow. All rights reserved. Built with ❤️ for amazing shopping experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
