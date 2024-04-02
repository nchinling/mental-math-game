export interface TopScoreData {
    name: string
    score: number
    level: number
    date: Date

}

export interface Question{
    question: string
    answer: number
}

export interface MarkedQuestion {
    markedQuestion: string
}

export interface SaveScoreResponse {
    message: string
}