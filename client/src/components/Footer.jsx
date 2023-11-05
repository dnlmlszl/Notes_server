import { FaGooglePlusG, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://google.org"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noreferrer"
          >
            <FaGooglePlusG />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Note App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
