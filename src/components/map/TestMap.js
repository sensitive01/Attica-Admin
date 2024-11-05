// ---------------------------------------------------------------Outside Values Display Map--------------------------------------------------------------
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button, Label } from "@windmill/react-ui";
import LabelArea from "components/form/LabelArea";
import { Input } from "@windmill/react-ui";

const Map = ({ updateCoordinates }) => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 20.5937, lng: 78.9629 });
  const [sellerCoordinates, setSellerCoordinates] = useState({ lat: '', lng: '' });
  const mapRef = useRef(null);
  const platform = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  useEffect(() => {
    const H = window.H;
    platform.current = new H.service.Platform({
      apikey: 'Jl6ENjAFQcXesu1RImYS-JlVRaYNzhu3Beyu-zY6aPE',
    });
    map.current = new H.Map(
      mapRef.current,
      platform.current.createDefaultLayers().vector.normal.map,
      {
        center: currentPosition,
        zoom: 5,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map.current));
    const ui = H.ui.UI.createDefault(map.current, platform.current.createDefaultLayers());
    marker.current = new H.map.Marker(currentPosition, {
      volatility: true,
      draggable: true
    });
    map.current.addObject(marker.current);
    map.current.addEventListener('tap', (e) => {
      const newCoord = map.current.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
      marker.current.setGeometry(newCoord);
      setCurrentPosition({ lat: newCoord.lat, lng: newCoord.lng });
    });
    setSellerCoordinates(currentPosition);
    return () => {
      mapRef.current = null;
      platform.current.dispose();
    };
  }, []);
  const handleSubmit = () => {
    console.log('Submitted Latitude:', currentPosition.lat.toFixed(7));
    console.log('Submitted Longitude:', currentPosition.lng.toFixed(7));
    updateCoordinates(currentPosition); // Pass updated coordinates
  };
  
  return (
    <>
        <div ref={mapRef} style={{ flex: 1, height: '100%', width: '100%' }} />
        <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40" >
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={("Latitude : ")}style={{color:'#ffffff'}} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              value={currentPosition.lat.toFixed(7)}
              type="text"
              placeholder="Latitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
              name='latitude'
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={("Longitude : ")} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              value={currentPosition.lng.toFixed(7)}
              type="text"
              placeholder="Longitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
              name='longitude'
            />
          </div>
        </div>
        <Button id="styleButton" className="mt-4 h-12 w-full" title="Submit" onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};
const MapComponent = (updateSellerCoordinates) => {
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const updateCoordinates = (newCoordinates) => {
    setCoordinates(newCoordinates); // Update the coordinates state
    updateSellerCoordinates(newCoordinates); // Call the updateSellerCoordinates function
  };
  
  return (
    <>
      <Label onClick={onOpenModal} id='styleLink'>Open Map View</Label>
      <Modal 
        open={open} onClose={onCloseModal} center classNames={{
          overlayAnimationIn: 'customEnterOverlayAnimation',
          overlayAnimationOut: 'customLeaveOverlayAnimation',
          modalAnimationIn: 'customEnterModalAnimation',
          modalAnimationOut: 'customLeaveModalAnimation',
        }}animationDuration={800} styles={{ modal: { width: '100vw', height: '100vh', background: '#fff', padding: 0 } }} zIndex={9999}>
        {open && <Map updateCoordinates={updateCoordinates} />}
      </Modal>
      <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={("Latitude : ")} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              // value={coordinates.lat}
              value={coordinates.lat !== '' ? parseFloat(coordinates.lat).toFixed(7) : ''}
              type="text"
              placeholder="Latitude"
              name='latitude'
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={("Longitude : ")} />
          <div className="col-span-8 sm:col-span-4">
            <Input
              readOnly
              value={coordinates.lng!==''?parseFloat(coordinates.lng).toFixed(7):''}
              type="text"
              name='longitude'
              placeholder="Longitude"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;

