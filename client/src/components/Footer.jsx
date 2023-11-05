// import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
// import { HiOutlineMailOpen } from 'react-icons/hi';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
//         <hr className="my-4 border-gray-700" />
//         <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
//           <a
//             href="https://twitter.com/dn1el_lszl0"
//             className="text-white hover:text-gray-400"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <FaTwitter />
//           </a>
//           <a
//             href="https://www.linkedin.com/in/l%C3%A1szl%C3%B3-d%C3%A1niel-a39a956b/"
//             className="text-white hover:text-gray-400"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <FaLinkedinIn />
//           </a>
//           <a
//             href="mailto:daniel.mlaszlo@yahoo.com"
//             className="text-white hover:text-gray-400"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <HiOutlineMailOpen />
//           </a>
//         </div>
//         <p className="w-full text-center sm:text-right text-sm text-gray-400 mt-4 sm:mt-0">
//           &copy; {new Date().getFullYear()} Note App. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Social Links Section */}
        <div className="flex-1 flex justify-center md:justify-start gap-4">
          <div className="mb-4">
            <a
              href="https://twitter.com/dn1el_lszl0"
              className="text-white hover:text-gray-400"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={20} />
            </a>
          </div>
          <div className="mb-4">
            <a
              href="https://www.linkedin.com/in/l%C3%A1szl%C3%B3-d%C3%A1niel-a39a956b/"
              className="text-white hover:text-gray-400"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
          <div className="mb-4">
            <a
              href="mailto:daniel.mlaszlo@yahoo.com"
              className="text-white hover:text-gray-400"
              target="_blank"
              rel="noreferrer"
            >
              <HiOutlineMailOpen size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex-1 flex justify-center mb-4 md:mb-0">
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="text-gray-400 text-sm mt-2">
              <li>
                <a
                  href="/faq"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:daniel.mlaszlo@yahoo.com"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://econocoder.onrender.com"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Note App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
