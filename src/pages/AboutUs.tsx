import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="About Us"
        showBackButton={true}
      />

      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About RARITONE</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing fashion with AI-powered technology to deliver perfect-fit clothing and personalized style experiences across India.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <Target className="w-12 h-12 text-amber-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To democratize perfect-fit fashion through cutting-edge AI technology, making premium clothing accessible to everyone while eliminating the guesswork from online shopping.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <Globe className="w-12 h-12 text-amber-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become India's leading AI-powered fashion platform, setting new standards for personalized shopping experiences and sustainable fashion consumption.
              </p>
            </motion.div>
          </div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Founded in 2024 in the heart of Mumbai, RARITONE emerged from a simple yet powerful idea: fashion should fit perfectly, every time. Our founders, passionate about both technology and style, recognized the frustration of online clothing shopping where sizes never seemed quite right.
              </p>
              <p className="mb-4">
                Combining expertise in artificial intelligence, computer vision, and fashion design, we developed revolutionary body scanning technology that captures precise measurements using just a smartphone camera. This innovation ensures that every piece of clothing you purchase fits you perfectly.
              </p>
              <p>
                Today, RARITONE serves thousands of customers across India, offering a curated collection of premium fashion items backed by our AI-powered sizing technology. We're not just selling clothes; we're transforming how people experience fashion in the digital age.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is centered around delivering exceptional customer experiences and perfect-fit solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of fashion technology to create solutions that didn't exist before.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Globe className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                By ensuring perfect fit, we reduce returns and waste, contributing to a more sustainable fashion industry.
              </p>
            </motion.div>
          </div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              RARITONE is powered by a diverse team of fashion experts, AI engineers, designers, and customer experience specialists. 
              Based in Mumbai with team members across India, we combine local fashion insights with global technology standards 
              to deliver world-class experiences to our customers.
            </p>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-xl mb-6 opacity-90">
              Experience the future of fashion with AI-powered perfect fit technology.
            </p>
            <button
              onClick={() => window.location.href = '/catalog'}
              className="bg-white text-amber-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;