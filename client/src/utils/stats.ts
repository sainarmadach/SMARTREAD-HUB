export function countWords(text: string): number {
    return text.trim().split(/\s+/).length
  }
  
  export function estimateReadingTime(text: string): string {
    const wordsPerMinute = 200
    const wordCount = countWords(text)
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }
  