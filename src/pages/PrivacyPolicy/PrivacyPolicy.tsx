// PrivacyPolicy.tsx
import { FaGlobe } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FaGlobe className="text-gray-600" />
            <span className="text-gray-800 font-medium">English</span>
            {/* <FaChevronDown className="text-gray-600" /> */}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PRIVACY POLICY</h1>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-6">
          <p className="text-gray-800 text-sm">
            Disclaimer: In case of any discrepancy or difference, the English version will take precedence over the translation.
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 mb-4">
          We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how <strong>MystiAura</strong> (https://www.mystiaura.net/) and its affiliates collect, use, share or otherwise process your personal data through our website, mobile app, and m-site.
        </p>
        <p className="text-gray-700 mb-6">
          While you can browse sections of the Platform without sharing any information, please note we operate primarily in India. By using this Platform, you agree to the terms of this Privacy Policy and applicable laws of India.
        </p>

        {/* Sections */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Collection of Your Information</h2>
        <p className="text-gray-700 mb-2">
          We collect information you provide, your buying behavior, browsing patterns, preferences, and other data to enhance your experience and personalize our services.
        </p>
        <p className="text-gray-700 mb-2">
          This information may be shared with affiliates, partners, and third-party service providers for purposes including product recommendations, marketing, and improving the Platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Use of Your Information</h2>
        <p className="text-gray-700 mb-2">
          Your data is used to process orders, deliver products, communicate with you, enhance your experience, and for promotional purposes. With your consent, we may access device information and KYC details to provide certain services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Cookies</h2>
        <p className="text-gray-700 mb-2">
          We use cookies to improve your browsing experience, analyze usage, and provide targeted information. You can disable cookies, but some features may be limited.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Sharing of Personal Data</h2>
        <p className="text-gray-700 mb-2">
          We may share your data with affiliates, business partners, sellers, and third-party services as necessary to provide products and services, comply with laws, and conduct marketing.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Security Precautions</h2>
        <p className="text-gray-700 mb-2">
          We maintain reasonable safeguards to protect your information. Users are responsible for protecting their account login and password.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Choice / Opt-Out</h2>
        <p className="text-gray-700 mb-2">
          Users can opt-out of promotional communications via their Notification Preferences page.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Children Information</h2>
        <p className="text-gray-700 mb-2">
          Our Platform is not intended for children under 18. If personal data of children is shared, you confirm authority to do so.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Your Rights & Consent</h2>
        <p className="text-gray-700 mb-2">
          You may access, update, or delete your data. By using the Platform, you consent to our collection and processing of your personal data in accordance with this Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Grievance Officer & Contact</h2>
        <p className="text-gray-700 mb-2">
          {/* Mr. Shremanth M, Senior Manager, MystiAura Pvt Ltd.<br /> */}
          Email: <a href="mailto:mystiaura108@gmail.com" className="text-blue-600">mystiaura108@gmail.com</a><br />
          Contact: +91 9895 380 343<br />
          Website: <a href="https://www.mystiaura.net/" className="text-blue-600">https://www.mystiaura.net/</a>
        </p>
        {/* domestic policy */}
         <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2"> Domestic Shipping Information</h2>
         <p className="text-gray-700 mb-4">
          At <strong>MystiAura</strong>, we understand how important it is for you
          to receive your purchase in top condition and on time. That’s why we
          use a large network of courier partners to deliver your products as
          quickly and safely as possible.
        </p>

        <p className="text-gray-700 mb-4">
          Depending on your location, your order will be delivered within
          <strong> 7–15 business days</strong> from the date it is dispatched
          from our warehouse.
        </p>

        <p className="text-gray-700">
          In case an order is cancelled or lost during transit, the complete
          order amount, including shipping charges, will be refunded to the
          original mode of payment.
        </p>

        <footer className="text-center text-gray-500 text-sm mt-10">
          © 2025 MystiAura. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
