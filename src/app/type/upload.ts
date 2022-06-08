export interface Upload {
  progress: number | undefined,
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}