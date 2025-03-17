'use client';

import { useEffect, useState } from "react";

type Tile = {
  x: number
  y: number
  room?: Room
  connection?: Connector
}

type Room = {
  id: number
  title: string
  n?: number
  e?: number
  s?: number
  w?: number
  u?: number
  d?: number
}

type Connector = {
  id: number
  isVertical: boolean,
  source: Tile,
  destination: Tile,
}

const GRID_SIZE = 32;

const tiles: Tile[] = [];
for (let y = 1; y <= GRID_SIZE; y++) {
  for (let x = 1; x <= GRID_SIZE; x++) {
    tiles.push({ x, y });
  }
}

function TileEditor({ tile }: { tile: Tile }) {
  return (
    <section className="text-[#9ca2ac]">
      <div><span className="w-12 inline-block mb-2">tile:</span><span className="text-[#afbdd4] font-bold text-[18px]bg-[#171d27]">{tile.x}, {tile.y}</span></div>
      <div><span className="w-12 inline-block mb-2">id:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">name:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">n:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">e:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">s:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">w:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">u:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">d:</span><input className="bg-[#171d27] rounded-[5px] border-[#303338] border-1" type="text" /></div>
      {tile?.connection && (
        <div>connection section</div>
      )}
      <div className="flex gap-x-4 mt-4 justify-end">
        <button className="px-4 py-1 flex items-center justify-center border-[#61b882] border-1 rounded-[4]">clear</button>
        <button className="px-4 py-1 flex items-center justify-center border-[#61b882] border-1 rounded-[4]">save</button>
      </div>
    </section>
  )
}

function Tile({ onClick, tile }: { onClick: (tile: Tile) => void, tile: Tile }) {
  // useEffect(() => {
  //   console.log('bingo tile render')
  // })

  return (
    <>
      <div onClick={() => onClick(tile)} className="bg-[#171d27] w-[1rem] h-[1rem] hover:bg-[#454e5e]" />
    </>    
  )
}

export default function Home() {
  const [map, setMap] = useState<Tile[]>([])
  const [tile, setTile] = useState<Tile | null>(null);

  // useEffect(() => {
  //   console.log('bingo render')
  // })

  const handleTileClick = (tile: Tile) => {
    // console.log('bingo tile', tile)
    setTile(tile)
  }

  return (
    <article className="flex justify-center items-center gap-x-4">
      <div className="p-1 grid gap-1 grid-cols-[repeat(32,minmax(0,1rem))] border-1 border-solid border-[#303338]">
        {tiles.map((tile, i) => (
          <Tile key={i} tile={tile} onClick={handleTileClick} />
        ))}
      </div>
      {tile && (
        <TileEditor tile={tile} />
      )}
    </article>
  );
}
