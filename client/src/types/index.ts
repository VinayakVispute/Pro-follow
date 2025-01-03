export interface Communication {
    type: string
    date: string
    notes?: string
}

export interface CompanyData {
    id: string
    name: string
    lastFiveCommunications: Communication[]
    nextScheduledCommunication: Omit<Communication, 'notes'>
    isOverdue: boolean
    isDueToday: boolean
}

