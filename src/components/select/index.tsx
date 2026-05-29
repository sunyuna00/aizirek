import { Select } from 'antd';
import type { SelectProps } from 'antd';

const DropDown = ({ options, onChange, value, placeholder = '', listHeight = 256 }: SelectProps) => {
  return (
    <Select
      style={{ width: 220, height: 40 }}
      onChange={onChange}
      options={options}
      value={value}
      placeholder={placeholder}
      listHeight={listHeight}
    />
  )
}

export default DropDown