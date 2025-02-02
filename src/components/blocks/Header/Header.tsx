import { motion } from 'framer-motion';
import logo from '../../../assets/images/common/logo.svg';
import { CustomLink } from '../../miscellaneous/index.tsx';
import { BRAND_URL, BRAND_NAME } from '../../../js/global-variables.ts';

const Header = () => {
  return (
    <motion.header
      className="integration-message absolute top-[60px] z-10 flex w-full flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: '-10rem' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.3, ease: [0.42, 0, 0.58, 1] }}
    >
      <h3 className="integration-text font-lato m-0 pb-[12px] text-[9px] leading-none font-medium text-white uppercase">
        Advertising feature{' '}
        <span className="sr-only">{`sponsored by ${BRAND_NAME}`}</span>
      </h3>
      <CustomLink href={BRAND_URL} className="integration-logo group">
        <img
          src={logo}
          alt={`${BRAND_NAME} logo`}
          className="transition-all duration-200 ease-out group-hover:scale-110"
        />
      </CustomLink>
    </motion.header>
  );
};

export default Header;
