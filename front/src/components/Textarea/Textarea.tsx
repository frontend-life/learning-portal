import './Textarea.css'

export default function Textarea(props:{placeholder:string}) {
  return (
    <textarea placeholder={props.placeholder} className='textarea'></textarea>
  )
};