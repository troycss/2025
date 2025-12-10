export interface Project {
  id: number;
  title: string;
  category: string;
  credits: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Feature Films',
    category: 'Film Production',
    credits: [
      'The Social Network (2010)',
      'Moneyball (2011)',
      'Gone Girl (2014)',
      'Steve Jobs (2015)'
    ]
  },
  {
    id: 2,
    title: 'Television',
    category: 'TV Production',
    credits: [
      'House of Cards',
      'Mindhunter',
      'The Crown',
      'Ozark'
    ]
  }
];

export interface Skill {
  id: number;
  name: string;
}

export const skills: Skill[] = [
  { id: 1, name: 'Film Production' },
  { id: 2, name: 'Team Management' },
  { id: 3, name: 'Problem Solving' },
  { id: 4, name: 'Adaptability' },
  { id: 5, name: 'Web Development' },
  { id: 6, name: 'React' },
  { id: 7, name: 'JavaScript' },
  { id: 8, name: 'CSS' }
];

export const biography = {
  paragraphs: [
    'Troy Gianopoulos is an accomplished film production professional with extensive experience working on high-profile feature films and television series. With a career spanning over a decade, Troy has contributed to some of the most critically acclaimed productions in modern cinema.',
    'Known for his meticulous attention to detail and strong work ethic, Troy has worked alongside some of the industry\'s most respected directors and producers. His ability to manage complex production logistics while maintaining creative vision has made him a valued member of every production team he joins.',
    'Throughout his career, Troy has demonstrated exceptional problem-solving abilities and adaptability in the fast-paced environment of film production. His expertise spans various aspects of production, from pre-production planning to on-set execution and post-production coordination.',
    'Beyond his film production work, Troy has developed a passion for web development, applying the same dedication and attention to detail that has made him successful in the entertainment industry. He continues to expand his skill set while maintaining his commitment to excellence in every project he undertakes.'
  ]
};
