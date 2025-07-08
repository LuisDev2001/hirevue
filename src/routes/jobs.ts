import { Router } from 'express';
import { getRemotiveJobs } from '../services/remotive';
import { getGetOnBoardJobs } from '../services/getonboard';
import { Job } from '../types/job';

const router = Router();

router.get('/jobs', async (req, res) => {
  try {
    const [remotiveJobs, gobJobs] = await Promise.all([getRemotiveJobs(), getGetOnBoardJobs()]);
    const allJobs: Job[] = [...remotiveJobs, ...gobJobs];
    res.json(allJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

export default router;
