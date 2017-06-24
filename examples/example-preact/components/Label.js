import { createComponent } from 'preact-alef'

const label = props => ({
  fontSize: props.size,
  lineHeight: '200px',
  padding: 20
})

export default createComponent(label)
