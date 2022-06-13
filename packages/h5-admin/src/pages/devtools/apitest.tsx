import { JSONEditor } from '~/components/json-editor'

const APITest = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <JSONEditor json='{"a":0}'></JSONEditor>
    </div>
  )
}

export default APITest
