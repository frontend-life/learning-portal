import './Input.css'

export default function Input(props:{placeholder:string, type?:string}) {
  return (
    <input placeholder={props.placeholder} type={props.type || 'text'} className='input'></input>
  )
};
