/* @flow */
export default function generateDisplayName(component: any): string {
  const displayName = component.displayName || component.name

  if (displayName) {
    return `Alef${displayName}`
  }

  return 'ConnectedAlefComponent'
}
