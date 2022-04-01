import React, { useState } from 'react'
import ReactMapLG, {Popup} from 'react-map-gl'
import { Marker } from 'react-map-gl'
import { getCenter } from 'geolib'
import "mapbox-gl/dist/mapbox-gl.css";
import {LocationMarkerIcon} from '@heroicons/react/solid'
import Image from "next/image"

function Map({searchResults}) {

    const [selectedLocation,setSelectedLocation] = useState({});


    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat
    }))


    const center = getCenter(coordinates);


    const [viewport,setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    }) 


  return (
    <ReactMapLG
    mapStyle='mapbox://styles/mikadoe/cl1f0a388003r15qspxq2cmw5'
    mapboxAccessToken={process.env.mapbox_key}
    width={viewport.width}
    height={viewport.height}
    latitude={viewport.latitude}
    longitude={viewport.longitude}
    zoom={viewport.zoom}
    onMove={(nextViewport) => setViewport(nextViewport.viewState)}>
        {searchResults.map((result) => (
            <div key={result.long}>
                <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <LocationMarkerIcon className='cursor-pointer h-16 text-red-400
                    animate-bounce'
                    onClick={() => setSelectedLocation(result)}/>
                    </Marker>

                 {selectedLocation.long === result.long ? (
                    <Popup
                    closeOnClick={true}
                    latitude={result.lat}
                    longitude={result.long}>

                        <p className='pb-1 font-semibold'>
                          {result.title}  
                        </p>
                        
                        <div className='relative h-32 w-48 mx-auto'>
                            <Image src={result.img} layout="fill" objectFit='cover'
                            className='h3 w-5 rounded-2xl'/>
                        </div>
                        
                    </Popup>
                ) : (
                    false
                )}

            </div>
        ))}

    </ReactMapLG>

  )
}

export default Map
