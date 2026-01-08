import { FaGlobe } from "react-icons/fa";

export default function TermsAndCondition() {
    return (
        <>
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
                    {/* <!-- Title --> */}
                    <h1 className="text-3xl font-bold text-gray-900">TERMS & CONDITIONS</h1>

                    {/* <!-- First 15 lines of detailed sentence --> */}
                    <p className="text-gray-700">
                        Welcome to MystiAura. By accessing or using our services, including our website, mobile application, and related platforms (collectively, "Platform"), you agree to comply with and be bound by the following Terms & Conditions. MystiAura provides a wide range of high-quality products, including lifestyle, fashion, accessories, and other specialty items, with a focus on customer satisfaction and convenience. Our services include seamless online shopping, secure payment processing, and order delivery directly to your doorstep. Orders above ₹500 are eligible for free shipping. We provide e-bills for every transaction, ensuring transparency and proof of purchase. By using our Platform, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. All purchases are final, and MystiAura has a strict "No Refund" policy, except as required by law. We strive to provide accurate product descriptions, images, and pricing, but minor discrepancies may occur. MystiAura reserves the right to modify the services, prices, and content on the Platform at any time without prior notice. Users are responsible for providing accurate shipping, billing, and contact information. Payments can be made via multiple modes, including credit/debit cards, UPI, and other payment options offered on the Platform. You agree to follow any promotional or discount terms associated with specific products or campaigns. Any unauthorized use of the Platform, including fraudulent orders or misuse of promotions, is strictly prohibited. MystiAura may suspend or terminate accounts involved in suspicious activities. By using the Platform, you consent to our collection and use of personal information as described in our Privacy Policy.
                    </p>


                    {/* <!-- Next header with 14 bullet points --> */}
                    <h2 className="text-2xl font-semibold text-gray-900 mt-6">Our Services & Policies</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Provision of a wide variety of specialty products through our online store.</li>
                        <li>Secure payment gateway for smooth online transactions.</li>
                        <li>Free shipping on orders above ₹500.</li>
                        <li>Instant e-bill generation for all transactions.</li>
                        <li>No refund policy for purchased products.</li>
                        <li>Option to track your orders via our Platform.</li>
                        <li>Regular updates and notifications about offers and promotions.</li>
                        <li>Customer support for queries and complaints.</li>
                        <li>Privacy protection and secure handling of personal data.</li>
                        <li>Delivery of orders within the estimated time frame.</li>
                        <li>Right to modify, update, or discontinue any product or service.</li>
                        <li>Promotional campaigns subject to specific terms and conditions.</li>
                        <li>Prohibition of unauthorized or fraudulent use of our Platform.</li>
                        <li>Reservation of rights to terminate accounts involved in policy violations.</li>
                    </ul>

                    {/* <!-- Detailed description (approx 500 words) --> */}
                    <section className="space-y-4 mt-6">
                        <p className="text-gray-700">
                            MystiAura is committed to providing exceptional services to our customers, ensuring that shopping on our Platform is convenient, reliable, and enjoyable. Our "No Refund" policy applies to all purchases, meaning that once a product is purchased, it cannot be returned for a refund. This ensures that our platform can maintain fair pricing and operational efficiency while offering high-quality products. Customers are encouraged to read product descriptions carefully, review images, and confirm their selections before placing orders. For orders above ₹500, we provide free shipping to make your shopping experience more rewarding and cost-effective. Each order comes with an e-bill, which serves as proof of purchase and can be used for warranty or any future reference. MystiAura continuously works to ensure that products displayed on the Platform match the quality and specifications described. We may, however, experience occasional discrepancies in product appearance, color, or specifications due to photography or device differences. Customers agree to understand and accept these minor variations. Our payment system is secure, and we accept multiple modes of payment to provide flexibility and convenience. All financial transactions on the Platform are encrypted to ensure safety and security. Promotional offers, discounts, and campaigns are subject to eligibility and may vary based on product categories, timing, or location. We encourage users to review promotional terms carefully before making purchases. Unauthorized or fraudulent activities, including misuse of promotions, false information, or manipulation of the Platform, may result in immediate suspension or termination of the customer account. MystiAura reserves the right to modify product availability, service features, pricing, and platform content at any time without prior notice. Users are responsible for providing accurate contact, shipping, and billing details to avoid delays or issues with order fulfillment. Customer queries, complaints, and requests are handled by our dedicated support team, which can be contacted through the Platform or email. Personal data collected during the use of our services is handled securely and in accordance with our Privacy Policy. Customers are responsible for keeping login credentials confidential and ensuring the security of their accounts. By continuing to use the Platform, users acknowledge and accept our terms, including the "No Refund" policy, free shipping benefits, and e-bill provision, and agree to comply with all applicable guidelines. MystiAura strives to maintain transparency, efficiency, and a customer-friendly environment, offering quality products and services to meet the expectations of our valued users.
                        </p>
                    </section>


                    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Grievance Officer & Contact</h2>
                    <p className="text-gray-700 mb-2">
                         <p className="text-gray-500 mt-6">Last Updated: September 2025</p>
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
        </>
    )
}