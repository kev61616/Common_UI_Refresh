import { redirect } from 'next/navigation'

/**
 * Board View has been replaced by the enhanced Question View
 * This page redirects to the Question View to maintain any existing links
 */
export default function BoardViewPage() {
  redirect('/review/question')
}
