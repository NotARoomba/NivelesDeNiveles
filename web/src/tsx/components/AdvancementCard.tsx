import { motion } from "framer-motion";
import { AdvancementCardProps } from "../utils/Types";

export default function AdvancementCard({title, subtitle, link, imagePath}: AdvancementCardProps) {
    return <div className="w-2/5 h-auto rounded-xl relative group -z-20">
        <img src={imagePath} className="rounded-xl -z-20" />
        <div className="w-full h-full bg-accent-300/30 absolute bottom-0 -right-full group-hover:right-0 rounded-xl transition-all duration-300 -z-10" />
        <motion.p className="absolute bottom-12 font-bold text-2xl text-white left-1/2 -translate-x-1/2">{title}</motion.p>
    </div>

}