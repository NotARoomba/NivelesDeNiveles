import {motion} from 'framer-motion';
import {SectionHeaderProps} from '../utils/Types';

export default function SectionHeader({title, subtitle}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 100}}
      whileInView={{opacity: 1, y: 0, transition: {duration: 0.75}}}>
      <p className="text-neutral-400 text-center text-2xl my-2 font-bold">
        {title}
      </p>
      <p className="text-neutral-700 text-center text-4xl my-2 font-bold">
        {subtitle}
      </p>
      <hr className="bg-accent w-24 h-1 my-5 justify-center mx-auto" />
    </motion.div>
  );
}
