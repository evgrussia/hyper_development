import { motion } from 'motion/react';
import { Reveal } from '@/components/common/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import {
  Sparkles, Brain, Activity, BookOpen, Shield, Smartphone, Dna,
  MessageCircle, BookHeart, ShieldAlert, Watch, Clock, Lock,
  ChefHat, Store, Truck, BarChart3, FileCheck,
  MapPin, Receipt, User,
  Baby, Stethoscope, Video, Calendar, Users,
  Key, ShieldCheck, Car, Percent,
  Wrench, Star, Gavel,
  Camera, Timer, Apple, Mic, ShoppingCart, Heart,
  Bell, ShoppingBag,
  Scale, FileText, Accessibility,
} from 'lucide-react';
import type { ProjectFeature } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles, Brain, Activity, BookOpen, Shield, Smartphone, Dna,
  MessageCircle, BookHeart, ShieldAlert, Watch, Clock, Lock,
  ChefHat, Store, Truck, BarChart3, FileCheck,
  MapPin, Receipt, User,
  Baby, Stethoscope, Video, Calendar, Users,
  Key, ShieldCheck, Car, Percent,
  Wrench, Star, Gavel,
  Camera, Timer, Apple, Mic, ShoppingCart, Heart,
  Bell, ShoppingBag,
  Scale, FileText, Accessibility,
};

interface ProjectFeaturesProps {
  features: ProjectFeature[];
}

function getIcon(name: string) {
  return iconMap[name] || Sparkles;
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">Ключевые функции</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <Reveal key={index} delay={prefersReducedMotion ? 0 : index * 0.1}>
                <motion.div
                  className="glass rounded-xl p-6 border border-border/50 h-full hover:border-primary/30 transition-colors group"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
