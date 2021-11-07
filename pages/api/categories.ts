// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type category = {
  displayName: string;
  slug: string;
  subCategories?: category[];
}

const categories: category[] = [
  {
    displayName: 'Design & Graphics',
    slug: '/design-and-graphics',
    subCategories: [
      {
        displayName: 'Painting',
        slug: '/painting'
      },
      {
        displayName: 'Animation',
        slug: '/animation'
      },
      {
        displayName: '3d Graphics',
        slug: '/3d-graphics'
      },
      {
        displayName: 'Digital Design',
        slug: '/digital-design'
      },
      {
        displayName: 'Web Design',
        slug: '/web-design'
      },
      {
        displayName: 'Architecture',
        slug: '/architecture'
      }
    ]
  },
  {
    displayName: "Music & Audio",
    slug: '/music-audio',
    subCategories: [
      {
        displayName: "Music Production",
        slug: '/music-production'
      },
      {
        displayName: "Singing",
        slug: '/singing'
      },
      {
        displayName: "Voice Acting",
        slug: '/voice-acting'
      }
    ]
  },
  {
    displayName: "Photography & Video",
    slug: "/photography-video",
    subCategories: [
      {
        displayName: "Photography",
        slug: "/photo"
      },
      {
        displayName: "Video Production",
        slug: "/video-production"
      },
      {
        displayName: "Video Montage",
        slug: "/video-montage"
      }
    ]
  },
  {
    displayName: "Language & Literature",
    slug: "/language-literature",
    subCategories: [
      {
        displayName: "Languages",
        slug: "/languages"
      },
      {
        displayName: "Translation",
        slug: "/translation"
      },
      {
        displayName: "Writing",
        slug: "/writing"
      }
    ]
  },
  {
    displayName: "Business & Marketing",
    slug: "/business-marketing",
    subCategories: [
      {
        displayName: "Web Marketing",
        slug: '/web-marketing'
      },
      {
        displayName: "Business Consulting",
        slug: "/business-consulting"
      }
    ]
  },
  {
    displayName: "Technology & Programming",
    slug: "/technology-programming",
    subCategories: [
      {
        displayName: "Software Development",
        slug: "/software-development"
      },
      {
        displayName: "IT",
        slug: '/it'
      },
      {
        displayName: "Cyber Security",
        slug: "/cyber-security"
      },
      {
        displayName: "Cryptocurrencies",
        slug: "cryptocurrency"
      }
    ]
  },
  {
    displayName: "Others",
    slug: "/others"
  }
]


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<category[]>
) {
  res.status(200).json(categories)
}
