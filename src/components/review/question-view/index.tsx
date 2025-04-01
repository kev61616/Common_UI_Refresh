import { QuestionViewProps } from './types'
import { EnhancedCollapsibleBoardView } from '../board/EnhancedCollapsibleBoardView'

/**
 * QuestionView - Enhanced view of questions based on the board view visualization
 * Provides a visual mastery progression matrix showing questions organized by proficiency level
 */
export const QuestionView: React.FC<QuestionViewProps> = (props) => {
  return <EnhancedCollapsibleBoardView {...props} />
}

export * from './types'
