import React from 'react'
import ReactPlayer from 'react-player'

export default function SingleItem({match, data}) {
  var pose = data.find(p => p.id === match.params.id)
  var posesData;

  if(pose) {
    posesData = (
      <div style={{border: '5px solid black'}}>
        <h4>Sanskirt Name: {pose.sanskritName}</h4>
        <h4>Benefits : {pose.benefits}</h4>
        <img src={pose.yogaIcon} alt={pose.englishName} style={{width: '50%'}}></img>
        <ReactPlayer
          url={pose.videoUrl}
          width='50%'
          heigh='50%'
        />
      </div>
    );
  }

  else posesData = <h2>Find another pose</h2>

  return (
    <div>
      <div>{posesData}</div>
    </div>
  )
}
