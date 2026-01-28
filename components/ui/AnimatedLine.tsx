'use client';
import { motion } from 'framer-motion';

export const AnimatedLine = ({ text }: { text: string }) => {
    return (
        <div className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
                {text}
            </motion.div>
        </div>
    )
}
