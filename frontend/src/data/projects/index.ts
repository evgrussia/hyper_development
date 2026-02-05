import type { ProjectDetail, InvestorData } from '@/types';

import * as biomaxAi from './biomax-ai';
import * as neuroPsychologist from './neuro-psychologist';
import * as darkChef from './dark-chef';
import * as kraftMarket from './kraft-market';
import * as roditelPro from './roditel-pro';
import * as arendaSosedi from './arenda-sosedi';
import * as autoShering from './auto-shering';
import * as vkusRobot from './vkus-robot';
import * as telemedPitomec from './telemed-pitomec';
import * as uristVKarmane from './urist-v-karmane';

export interface ProjectData {
  detail: ProjectDetail;
  investor: InvestorData;
}

export const projectsMap: Record<string, ProjectData> = {
  'biomax-ai': { detail: biomaxAi.projectDetail, investor: biomaxAi.investorData },
  'neuro-psychologist': { detail: neuroPsychologist.projectDetail, investor: neuroPsychologist.investorData },
  'dark-chef': { detail: darkChef.projectDetail, investor: darkChef.investorData },
  'kraft-market': { detail: kraftMarket.projectDetail, investor: kraftMarket.investorData },
  'roditel-pro': { detail: roditelPro.projectDetail, investor: roditelPro.investorData },
  'arenda-sosedi': { detail: arendaSosedi.projectDetail, investor: arendaSosedi.investorData },
  'auto-shering': { detail: autoShering.projectDetail, investor: autoShering.investorData },
  'vkus-robot': { detail: vkusRobot.projectDetail, investor: vkusRobot.investorData },
  'telemed-pitomec': { detail: telemedPitomec.projectDetail, investor: telemedPitomec.investorData },
  'urist-v-karmane': { detail: uristVKarmane.projectDetail, investor: uristVKarmane.investorData },
};

export function getProjectBySlug(slug: string): ProjectData | null {
  return projectsMap[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projectsMap);
}
