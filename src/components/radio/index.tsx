import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import './style.scss'


const RadioGroup = ({ value, options, onChange }: RadioGroupProps) => {

  return (<Radio.Group options={options} onChange={onChange} value={value} optionType="button" />)
}

export default RadioGroup 