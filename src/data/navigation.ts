import type { NavLinkItem, SocialLinkItem } from '@/types/navigation';
import { SITE_CONFIG } from '@/lib/constants';

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'WORK', href: '/#work' },
  { label: 'LAB', href: '/lab' },
  { label: 'HOW I BUILD', href: '/#build' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/#contact' },
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'GitHub',
    url: SITE_CONFIG.githubUrl,
    handle: '@SwastikPandey1024',
    iconName: 'Github',
  },
  {
    name: 'LinkedIn',
    url: SITE_CONFIG.linkedinUrl,
    handle: 'Swastik Pandey',
    iconName: 'Linkedin',
  },
];
