import { useState } from 'react';
import Whatch from "../WhatchComponent/Whatch";
import InputComponents from "../InputComponent/Input";
import './clock.css'


const Clock = () => {
  const [times, setTimes] = useState<Time[]>([{
    title: 'Grinvich',
    timeZone: 0
  }])
  return (
    <div className="clock">
      <h1 className='clock-title'>Мировые часы</h1>
      <ul className="clock-items">
        {
          times.map(time => <li className='clock-item' key={time.title}>{time.title}</li>)
        }
      </ul>
      <InputComponents times={times} setTimes={setTimes} />
      <div className="clock-container">
        {
          times.map(item => <Whatch
            key={item.title}
            title={item.title}
            timeZone={item.timeZone}
            times={times}
            setTimes={setTimes}
          />)
        }
      </div>
    </div>
  )
}
interface Time {
    title: string,
    timeZone: number
  }
export default Clock