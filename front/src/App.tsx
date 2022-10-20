import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/tsx';
import Textarea from './components/Textarea/Textarea';

function App() {
  return (
    <div className="App">
      <div className='AppBody'>
        <Input placeholder='Название урока'/>
        <Textarea placeholder='Описание урока'/>
        <Textarea placeholder='Домашнее задание'/>
        <Input placeholder='Ссылка на урок в youtube' type='url'/>
        <Button />
      </div>
    </div>
  );
}

export default App;
