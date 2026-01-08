// RefundPolicy.tsx
import { FaGlobe } from "react-icons/fa";

export default function RefundPolicy() {
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
                    <h1 className="text-2xl font-bold text-gray-900">Refund policy</h1>
                </div>

                {/* Disclaimer */}


                {/* Sections */}
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">About refund policy</h2>
                <p className="text-gray-700 mb-2">
                    Return/Exchange is only possible if the product reaches you fully damaged.Any other reasons for the return or exchange of the product will not be taken in by the company.
                </p>


                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Cancellation policy</h2>
                <p className="text-gray-700 mb-2">
                    mystiaura.net reserves the right to cancel an order without cause if the request is not complied with. The company will ensure timely notice of order cancellation or applicable refund. If the customer partially cancels when the total cart value is less than the free shipping amount, mystiaura.net reserves the right to charge his Rs.99/- shipping fee.
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

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Disclaimer</h2>
                <p className="text-gray-700 mb-2">
                    The product photography is taken under the lighting conditions that reproduce the nearest possible product color. We have taken every effort to accurately reproduce the exact look of this product but there might be slight variations in the color and size of the actual product received due to the on-screen representation. Color may also vary due to your device settings.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Grievance Officer & Contact</h2>
                <p className="text-gray-700 mb-2">
                    {/* Mr. Shremanth M, Senior Manager, MystiAura Pvt Ltd.<br /> */}
                    Email: <a href="mailto:mystiaura108@gmail.com" className="text-blue-600">mystiaura108@gmail.com</a><br />
                    Contact: +91 9895 380 343<br />
                    Website: <a href="https://www.mystiaura.net/" className="text-blue-600">https://www.mystiaura.net/</a>
                </p>

                <footer className="text-center text-gray-500 text-sm mt-10">
                    © 2025 MystiAura. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
