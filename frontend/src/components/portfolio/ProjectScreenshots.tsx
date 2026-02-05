import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

interface ProjectScreenshotsProps {
  screenshots: string[];
  title: string;
}

export function ProjectScreenshots({ screenshots, title }: ProjectScreenshotsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (screenshots.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">Скриншоты</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map((src, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.button
                className="relative rounded-xl overflow-hidden glass border border-border/50 group cursor-pointer w-full"
                onClick={() => setSelectedImage(src)}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-video">
                  <img
                    src={src}
                    alt={`${title} — скриншот ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                className="absolute top-6 right-6 p-2 glass rounded-full border border-border/50 hover:border-primary/30 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.img
                src={selectedImage}
                alt={title}
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
