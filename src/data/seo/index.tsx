import { SEOContent } from './types';
import { financialSEO } from './financial';
import { healthSEO } from './health';
import { utilitySEO } from './utility';
import { nepalSpecificSEO } from './nepal-specific';
import { algebraSEO } from './algebra';
import { geometrySEO } from './geometry';
import { statisticsSEO } from './statistics';
import { physicsSEO } from './physics';
import { educationSEO } from './education';
import { convertersSEO } from './converters';
import { marketRatesSEO } from './market-rates';
import { constructionSEO } from './construction';
import { unitConvertersSEO } from './unit-converters';
import { engineeringSEO } from './engineering';

export const TIER1_SEO_CONTENT: Record<string, SEOContent> = {
  ...financialSEO,
  ...healthSEO,
  ...utilitySEO,
  ...nepalSpecificSEO,
  ...algebraSEO,
  ...geometrySEO,
  ...statisticsSEO,
  ...physicsSEO,
  ...educationSEO,
  ...convertersSEO,
  ...marketRatesSEO,
  ...constructionSEO,
  ...unitConvertersSEO,
  ...engineeringSEO,
};
