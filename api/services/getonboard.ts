import axios from 'axios';
import { jobCache } from '../utils/cache';
import { type Job, type GetOnBoardApiResponse } from '../types/job';

const GETONBOARD_API_URL = 'https://www.getonbrd.com/api/v0/search/jobs?query=vue.js&expand=[%22company%22]';
const CACHE_KEY = 'getonboardJobs';
const CACHE_TTL = 60 * 60 * 1000; // 60 minutes in milliseconds

export const getGetOnBoardJobs = async (): Promise<Job[]> => {
  const cachedJobs = jobCache.get(CACHE_KEY) as Job[] | undefined;
  if (cachedJobs) {
    return cachedJobs;
  }

  const response = await axios.get<GetOnBoardApiResponse>(GETONBOARD_API_URL);
  const jobs: Job[] = response.data.data.map(item => ({
    title: item.attributes.title,
    company: item.attributes.company.data.attributes.name,
    logo: item.attributes.company.data.attributes.logo,
    url: item.links.public_url,
    location: item.attributes.company.data.attributes.country,
    source: 'getonboard',
  }));

  jobCache.put(CACHE_KEY, jobs, CACHE_TTL);
  return jobs;
};
