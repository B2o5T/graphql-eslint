import { FC, ReactNode } from 'react';
// import { IBM_Plex_Sans } from 'next/font/google';
// import { Toaster } from 'react-hot-toast';
import { GuildLogo, PRODUCTS } from '@theguild/components';
import { getDefaultMetadata, GuildLayout } from '@theguild/components/server';
import '@theguild/components/style.css';
// import './globals.css';

const description = 'Modern, Open-source API Tooling and Ecosystem that scales';
const websiteName = 'GraphQL-ESLint';
import { QueryParamProvider } from './query-params-provider'
  ;
export const metadata = getDefaultMetadata({
  description,
  websiteName,
  productName: 'GUILD',
  // alternates: {
  //   types: {
  //     'application/rss+xml': [
  //       {
  //         title: 'RSS Feed for the-guild.dev',
  //         url: '/feed.xml',
  //       },
  //     ],
  //   },
  // },
});

// const ibmPlexSans = IBM_Plex_Sans({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
// });


const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  // const jsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Organization',
  //   url: 'https://the-guild.dev',
  //   logo: 'https://the-guild.dev/static/logo.svg',
  //   name: 'The Guild',
  //   sameAs: [
  //     'https://x.com/TheGuildDev',
  //     'https://linkedin.com/company/the-guild-software',
  //     'https://github.com/the-guild-org',
  //   ],
  //   contactPoint: {
  //     '@type': 'ContactPoint',
  //     email: 'contact@the-guild.dev',
  //   },
  // };

  return (
    <GuildLayout
      websiteName={websiteName}
      description={description}
      logo={<PRODUCTS.ESLINT.logo className="text-lg" />}
      // htmlProps={{
      //   className: ibmPlexSans.className,
      // }}
      headProps={{
        backgroundColor: {
          dark: 'rgb(15, 17, 20)',
          light: 'rgb(250, 250, 250)',
        },
      }}
      layoutProps={{
        docsRepositoryBase:
          'https://github.com/the-guild-org/the-guild-website/tree/master/website',
      }}
      navbarProps={{
        navLinks: [
          { children: 'Playground', href: '/play' },
          { children: 'Rules', href: '/rules' },
        ],
      //   searchProps: {
      //     placeholder: 'Search…',
      //   },
      }}
    >
      {/* Add JSON-LD to your page */}
      {/*<script*/}
      {/*  type="application/ld+json"*/}
      {/*  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}*/}
      {/*/>*/}
      <QueryParamProvider>
      {children}
      </QueryParamProvider>
      {/*<Toaster />*/}
    </GuildLayout>
  );
};

export default RootLayout;
