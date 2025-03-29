"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Tile = {
  x: number
  y: number
  room?: Room
  connection?: Connector
}

type Room = {
  id?: number
  name?: string
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

const GRID_SIZE = 10;

const defaultTiles: Tile[] = [];
for (let y = 1; y <= GRID_SIZE; y++) {
  for (let x = 1; x <= GRID_SIZE; x++) {
    defaultTiles.push({ x, y });
  }
}

function TileEditor({ tile }: { tile: Tile }) {
  const [editedTile, setEditedTile] = useState<Tile>(null)

  useEffect(() => {
    console.log('bingo loading edited tile')
    setEditedTile(tile)
  }, [tile])

  return (
    <section className="text-[#9ca2ac]">
      <div><span className="w-12 inline-block mb-2">tile:</span><span className="text-[#afbdd4] p-1 outline-none font-bold text-[18px]bg-[#171d27]">{tile.x}, {tile.y}</span></div>
      <div><span className="w-12 inline-block mb-2">id:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" value={editedTile?.room?.id ?? ""} onChange={() => setEditedTile(editedTile)} /></div>
      <div><span className="w-12 inline-block mb-2">name:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" value={editedTile?.room?.name ?? ""} onChange={() => setEditedTile(editedTile)} /></div>
      <div><span className="w-12 inline-block mb-2">n:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">e:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">s:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">w:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">u:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" /></div>
      <div><span className="w-12 inline-block mb-2">d:</span><input className="bg-[#171d27] p-1 outline-none rounded-[5px] border-[#303338] border-1" type="text" /></div>
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

const Tile = React.memo(({ onClick, tile }: { onClick: (tile: Tile) => void, tile: Tile }) => {
  const style = { "--bg-color": tile?.room ? "#ff0000" : "#171d27" } as React.CSSProperties;

  useEffect(() => {
    console.log('bingo tile render', tile)
  })

  return (
    //hover:bg-[#454e5e]
    <div onClick={() => onClick(tile)} style={style} className="bg-[var(--bg-color)] w-[1rem] h-[1rem]" /> 
  )
})

export default function Home() {
  const [tiles, setTiles] = useState<Tile[]>(defaultTiles)
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  useEffect(() => {
    console.log('bingo render', tiles)
  })

  const handleTileClick = useCallback((selectedTile: Tile) => {
    const updatedTiles = tiles.map(tile => {
      if (tile.x === selectedTile.x && tile.y === selectedTile.y) {
        const updatedTile = { 
          ...tile,
          room: selectedTile.room ? null : {}
        }
        setSelectedTile(updatedTile)
        return updatedTile
      } else {
        return tile
      }
    })
    setTiles(updatedTiles)
  }, [tiles])
  
  const style = { "--grid-size": GRID_SIZE } as React.CSSProperties;

  return (
    <article className="bg-[#171717] flex-1 flex justify-center items-center gap-x-4">
      <div style={style} className={`p-1 grid gap-1 outline-none grid-cols-[repeat(var(--grid-size),1fr)] border-1 border-solid border-[#303338]`}>
        {tiles.map((tile, i) => (
          <Tile key={i} tile={tile} onClick={handleTileClick} />
        ))}
      </div>
      {selectedTile && (
        <TileEditor tile={selectedTile} />
      )}
    </article>
  );
}
