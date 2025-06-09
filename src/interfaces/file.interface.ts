export interface FileInfo {
  id:string;
  original_filename:string;
  converted_filename:string;
  glb_url:string;
  size_mb:number;
  created_at:string;
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  units?: string
  partCount?: number
  surfaceArea?: number
  volume?: number
}