import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const stores = useLoaderData();
    const mapRef = useRef();
    // console.log(stores);

    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.search.value;
        const district = stores.find(store => store.district.toLowerCase().includes(location.toLowerCase()));
        const cord = [district.latitude, district.longitude];
        mapRef.current.flyTo(cord, 14);
    }
    return (
        <div className='space-y-10 my-20'>
            <h1 className='text-secondary-content text-left'>We are available in 64 districts</h1>
            <div className='flex flex-col gap-4'>
                <form onSubmit={handleSearch}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name="search" required placeholder="Search" className='rounded-2xl ' />
                    </label>
                    <button type='submit' className='btn1 py-1'>Search</button>
                </form>
            </div>
            <div className='w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[750px] border border-secondary'>
                <MapContainer
                    ref={mapRef}
                    className='h-full'
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        stores.map((store, index) => <Marker
                            key={index}
                            position={[store.latitude, store.longitude]}>
                            <Popup className='p-3'>
                                <strong>{store.district}</strong>
                                <br></br>
                                {store.covered_area.join(", ")}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>,
            </div>
        </div>
    );
};

export default Coverage;