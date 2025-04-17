import { Instructor } from '@/types/course';

/**
 * Mock SAT instructor data
 */
const mockInstructors: Record<string, Instructor> = {
  'inst-math': {
    id: 'inst-math',
    name: 'Dr. Sarah Johnson',
    avatar: '/profile/jane-avatar.svg',
    title: 'Math Section Lead',
    bio: 'Dr. Johnson holds a Ph.D. in Mathematics from MIT and has been teaching SAT prep for over 10 years. She specializes in making complex math concepts accessible to students of all levels.',
    expertise: ['SAT Math', 'Algebra', 'Problem Solving', 'Data Analysis'],
    averageRating: 4.9,
    studentCount: 12548,
  },
  'inst-reading': {
    id: 'inst-reading',
    name: 'Michael Chen',
    avatar: '/profile/jane-avatar.svg',
    title: 'Reading & Writing Section Lead',
    bio: 'Michael has a Master\'s in English Literature from Stanford and has helped thousands of students improve their SAT Reading & Writing scores. His techniques focus on critical reading and analytical skills.',
    expertise: ['SAT Reading', 'Text Analysis', 'Critical Reading', 'Vocabulary'],
    averageRating: 4.7,
    studentCount: 8732,
  },
  'inst-strategy': {
    id: 'inst-strategy',
    name: 'Emily Rodriguez',
    avatar: '/profile/jane-avatar.svg',
    title: 'Test Strategy Specialist',
    bio: 'Emily is a perfect-score SAT taker who has developed innovative strategies for test preparation. Her approach combines content knowledge with test-taking psychology to maximize student performance.',
    expertise: ['Test Strategy', 'Time Management', 'Score Improvement', 'Stress Reduction'],
    averageRating: 4.8,
    studentCount: 5419,
  },
};

export default mockInstructors;
