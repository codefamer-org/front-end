export type TParams = {
  id: number
}

export type TRecords = {
  id: number,
  is_delete: number,
  desc: string,
  title: string,
  html: string,
  category?: string,
  markdown: string,
  create_user: string,
  update_user: string,
  created_at: string,
  updated_at: string,
}

export type TPageParams = {
  page?: number,
  size?: number,
}