import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiUser, FiSend } from 'react-icons/fi';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-snow">
      <div className="bg-white py-12 shadow-sm">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl font-heading text-charcoal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-lg text-taupe mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd love to hear from you. Please fill out the form or contact us directly.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2 className="text-3xl font-heading text-charcoal mb-4">Contact Information</h2>
            <p className="text-taupe mb-8">
              Have a question or a special request? Our team is ready to assist you.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <FiPhone className="text-gold text-2xl" />
                <span className="text-lg">+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-4">
                <FiMail className="text-gold text-2xl" />
                <span className="text-lg">support@elegance.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FiMapPin className="text-gold text-2xl" />
                <span className="text-lg">123 Luxury Lane, New York, NY</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <form onSubmit={submitHandler}>
              <div className="relative mb-4">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div className="relative mb-4">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-taupe" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div className="relative mb-6">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold h-32 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-gold text-charcoal font-bold font-body py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg flex items-center justify-center">
                <FiSend className="mr-3" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;