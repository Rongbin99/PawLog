import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-center mt-8 mb-6 text-center">
      <SocialIcon url='https://github.com/Rongbin99/PawLog' style={{ height: "30px", width: "30px", marginRight: "10px" }} />
      <p>&copy; 2025: Made with ❤️ from DeltaHacks XI</p>
    </footer>
  );
};

export default Footer;
