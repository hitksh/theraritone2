import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import Navbar from '@/components/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Privacy Policy"
        showBackButton={true}
      />

      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Your privacy is our top priority. Learn how we protect and handle your personal information.
            </p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Shield className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-600">Industry-standard encryption</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-sm text-gray-600">Local processing only</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Eye className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">No Tracking</h3>
              <p className="text-sm text-gray-600">Body data never stored</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Database className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
              <p className="text-sm text-gray-600">Delete data anytime</p>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <p>We collect information you provide directly, including name, email, phone number, shipping address, and payment details when you create an account or make a purchase.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Body Scan Data</h3>
                  <p>Our AI body scanning technology processes measurements locally on your device. This data is used solely for size recommendations and is never transmitted to our servers or stored permanently.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Information</h3>
                  <p>We collect information about how you interact with our platform, including pages visited, products viewed, and search queries to improve our services.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide personalized size recommendations and product suggestions</li>
                <li>• Process orders and manage your account</li>
                <li>• Send order confirmations and shipping updates</li>
                <li>• Improve our AI algorithms and user experience</li>
                <li>• Provide customer support and respond to inquiries</li>
                <li>• Send promotional communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement robust security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• End-to-end encryption for all data transmission</li>
                <li>• Secure servers with regular security audits</li>
                <li>• Limited access to personal data on a need-to-know basis</li>
                <li>• Regular security training for all team members</li>
                <li>• Compliance with international data protection standards</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">You have the following rights regarding your personal data:</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Access and review your personal information</li>
                <li>• Update or correct your data</li>
                <li>• Delete your account and associated data</li>
                <li>• Opt out of marketing communications</li>
                <li>• Request a copy of your data</li>
                <li>• File a complaint with data protection authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <p className="text-gray-800">
                  <strong>Email:</strong> privacy@raritone.in<br />
                  <strong>Phone:</strong> +91 98765 43210<br />
                  <strong>Address:</strong> RARITONE Fashion Technologies Pvt. Ltd., Mumbai, India
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;