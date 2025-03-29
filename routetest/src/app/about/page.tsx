"use client";
export default function About() {
    return (
        <section className="about" id="about">
        <div className="pt-16 p-6  min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">About MenThee Technologies</h3>
                <p className="text-gray-600 leading-relaxed">
                    At MenThee Technologies, we are passionate about innovation and excellence in the tech industry. 
                    Our mission is to provide cutting-edge digital solutions that empower businesses and individuals to 
                    thrive in the digital era.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Who We Are</h3>
                <p className="text-gray-600 leading-relaxed">
                    MenThee Technologies is a dynamic team of creative minds, developers, and strategists committed to delivering 
                    high-quality software solutions, web development, and IT consulting services. We combine technology with strategic 
                    insights to create solutions that drive success.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">What We Do</h3>
                <ul className="space-y-4">
                    <li className="bg-gray-200 p-4 rounded-lg">
                        <span className="font-semibold text-gray-800">Web Development</span> – Building responsive, user-friendly websites tailored to your business needs.
                    </li>
                    <li className="bg-gray-200 p-4 rounded-lg">
                        <span className="font-semibold text-gray-800">Software Solutions</span> – Custom software development for businesses of all sizes.
                    </li>
                    <li className="bg-gray-200 p-4 rounded-lg">
                        <span className="font-semibold text-gray-800">Mobile App Development</span> – Engaging, feature-rich applications for Android and iOS.
                    </li>
                    <li className="bg-gray-200 p-4 rounded-lg">
                        <span className="font-semibold text-gray-800">IT Consulting</span> – Expert guidance to help businesses navigate the evolving tech landscape.
                    </li>
                </ul>
            </div>
        </div>
        </section>
    );
}
