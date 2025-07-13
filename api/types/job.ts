export interface Job {
  title: string;
  company: string;
  logo: string;
  url: string;
  location?: string;
  source: 'remotive' | 'getonboard';
}

export interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

export interface RemotiveApiResponse {
  '00-warning': string;
  '0-legal-notice': string;
  'job-count': number;
  'total-job-count': number;
  jobs: RemotiveJob[];
}

export interface GetOnBoardCompanyAttributes {
  name: string;
  description: string;
  long_description: string;
  projects: string;
  benefits: string;
  web: string;
  twitter: string;
  github: string;
  facebook: string;
  angellist: string;
  country: string;
  response_time_in_days: { min: number | null; max: number | null };
  logo: string;
}

export interface GetOnBoardJobAttributes {
  title: string;
  description: string;
  remote: boolean;
  description_headline: string;
  projects: string;
  functions_headline: string;
  functions: string;
  benefits_headline: string;
  benefits: string;
  desirable_headline: string;
  desirable: string;
  remote_modality: string;
  remote_zone: string | null;
  countries: string[];
  lang: string;
  rejected_reasons: any[];
  category_name: string;
  perks: string[];
  min_salary: number | null;
  max_salary: number | null;
  published_at: number;
  response_time_in_days: { min: number | null; max: number | null };
  applications_count: number;
  location_regions: { data: any[] };
  location_tenants: { data: any[] };
  location_cities: { data: any[] };
  modality: { data: { id: number; type: string } };
  seniority: { data: { id: number; type: string } };
  tags: { data: any[] };
  company: { data: { id: string; type: string; attributes: GetOnBoardCompanyAttributes } };
}

export interface GetOnBoardJobData {
  id: string;
  type: string;
  attributes: GetOnBoardJobAttributes;
  links: {
    public_url: string;
  };
}

export interface GetOnBoardApiResponse {
  data: GetOnBoardJobData[];
  meta: {
    page: number;
    per_page: number;
    total_pages: number;
  };
}
