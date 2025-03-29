"use client";

import { useState } from "react";

const KAPREKARS_CONSTANT = 6174;

function NumberChoice({ onClick }: { onClick: (value: string) => number }) {
  const [choice, setChoice] = useState<string>('');
  
  return (
    <section className="flex gap-x-2">
      <input onChange={event => setChoice(event.target.value)} value={choice} type="text" maxLength={4} className="w-[5rem] font-[courier] bg-[#e5e5e5] text-[30px] p-[2px] outline-none border-1 rounded-[5px] border-[#adadad]" />
      <button onClick={() => onClick(choice)} className="flex-1 text-[#ffffff] bg-[#0058ff] px-4 rounded-[5px] text-[14px]">go!</button>
    </section>
  );
}

export default function Constant() {
  const [calcHistory, setCalcHistory] = useState([]);
  const [status, setStatus] = useState('');

  function orderDigits(number: number, asc = false) {
    const numberArr = Array
      .from(String(number))
      .sort()
    
    const orderedArr = asc ? numberArr.reverse() : numberArr

    return Number(orderedArr.join(''));      
  }

  function calculateConstant(number: number): number {
    if (!number) return KAPREKARS_CONSTANT;
    if (number === KAPREKARS_CONSTANT) return KAPREKARS_CONSTANT;
    
    const minOrder = orderDigits(number);
    const maxOrder = orderDigits(number, true);
    const adjMaxOrder = maxOrder < 1000 ? maxOrder * 10 : maxOrder;
    const difference = adjMaxOrder - minOrder;

    setCalcHistory((calcHistory) => [...calcHistory, [adjMaxOrder, minOrder, difference]]);

    if (difference !== KAPREKARS_CONSTANT) {
      calculateConstant(difference);
    }
  }

  const handleClick = (choice: string) => {
    setCalcHistory([]);
    setStatus('');

    const numberChoice = Number(choice);
    if (numberChoice < 1000) {
      setStatus('4 digit numbers only.');
      return KAPREKARS_CONSTANT;
    };
    const KConstant = calculateConstant(numberChoice);

    return KConstant;
  }

  return (
    <article className="justify-center flex-col flex self-center flex-1 p-1 w-max">
      <header className="capitalize">Kaprekar's constant</header>
      <NumberChoice onClick={handleClick} />
      {calcHistory.length > 0 && (
        <section className="bg-[#394b59] p-2 mt-2 rounded-[5px] text-[chartreuse] text-[14px] font-[courier]">
          {calcHistory.map(([minuend, subtrahend, difference], i) => (
            <div key={i} className="flex">
              <span className="flex justify-end w-[2rem] text-right">{minuend}</span>
              <span className="px-2">-</span>
              <span className="flex justify-end w-[2rem] text-right">{subtrahend}</span>
              <span className="px-2">=</span>
              <span className="flex justify-end w-[2rem] text-right">{difference}</span>
            </div>
          ))}
        </section>
      )}
      {status && (
        <div className="bg-[#394b59] p-2 mt-2 rounded-[5px] text-[chartreuse] text-[14px] font-[courier]">{status}</div>
      )}
    </article>
  );
}