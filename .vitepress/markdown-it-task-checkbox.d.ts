declare module 'markdown-it-task-checkbox' {
  import MarkdownIt from 'markdown-it'
  
  interface TaskCheckboxOptions {
    disabled?: boolean
    divWrap?: boolean
    divClass?: string
    idPrefix?: string
    ulClass?: string
    liClass?: string
  }
  
  const markdownItTaskCheckbox: (md: MarkdownIt, options?: TaskCheckboxOptions) => void
  export default markdownItTaskCheckbox
}
