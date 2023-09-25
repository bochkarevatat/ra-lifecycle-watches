import { useState } from 'react';
import './inputStyle.css';

type InputComponentsProps = {
    times: Time[],
    setTimes: (prev: Time[]) => void
  }
  
  const InputComponents: React.FC<InputComponentsProps> = ({ times, setTimes }) => {
    const [inputState, setInputState] = useState<Time>({
      title: '',
      timeZone: 0
    });
    
    const addTime = () => {
      if (!inputState.title || !inputState.timeZone) return;
      times.every(time => time.title !== inputState.title)
        ? setTimes([...times, inputState])
        : setTimes(times);
  
      setInputState({
        title: '',
        timeZone: 0
      });
    }
  
    return (
      <div className="input-components">
        <label className="input-label">
          <span>Название</span>
          <input
            type="text"
            className="input"
            required
            value={inputState.title}
            onChange={e => e.target.value !== '' 
              && setInputState(prev => ({...prev, title: e.target.value}))
            }
          />
        </label>
        <label className="input-label">
          <span>Временная зона</span>
          <input
            type="number"
            className="input"
            required
            value={inputState.timeZone}
            onChange={e => setInputState(prev => ({...prev, timeZone: +e.target.value < -11
              ? -11
              : +e.target.value > 14
                ? 14
                : +e.target.value
            }))}
          />
        </label>
        <button
          className="submit"
          onClick={addTime}
        >Добавить</button>
      </div>
    )
  }
  interface Time {
    title: string,
    timeZone: number
  }
  export default InputComponents