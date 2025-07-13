import axios from 'axios';
import { jobCache } from '../utils/cache'; // Use absolute path
import { type RemotiveJob, type Job, type RemotiveApiResponse } from '../types/job'; // Use absolute path

const REMOTIVE_API_URL = 'https://remotive.com/api/remote-jobs?limit=11&search=vue';
const CACHE_KEY = 'remotiveJobs';
const CACHE_TTL = 60 * 60 * 1000; // 60 minutes in milliseconds

export const getRemotiveJobs = async (): Promise<Job[]> => {
  const cachedJobs = jobCache.get(CACHE_KEY) as Job[] | undefined;
  if (cachedJobs) {
    console.log('Serving Remotive jobs from cache');
    return cachedJobs
  }

  console.log('Fetching Remotive jobs from API');
  const response = await axios.get<RemotiveApiResponse>(REMOTIVE_API_URL);
  const jobs: Job[] = response.data.jobs.map((job: RemotiveJob) => ({
    title: job.title,
    company: job.company_name,
    logo: job.company_logo,
    url: job.url,
    location: job.candidate_required_location,
    source: 'remotive',
  }));

  jobCache.put(CACHE_KEY, jobs, CACHE_TTL);
  return jobs;
};


