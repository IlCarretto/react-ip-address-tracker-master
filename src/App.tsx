import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, FormGroup, Header, InfoBlock, Input, Main, Title } from './styles/styled';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'; 
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import LoadingSpinner from './components/Loading/Loading';

type Data = {
  error: boolean;
  loading: boolean;
  lat: number,
  lng: number,
  ipAddress: string | null,
  location: string,
  timezone: string,
  isp: string
}

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState<Data>({
    error: false,
    loading: false,
    lat: 51.505,
    lng: -0.09,
    ipAddress: null,
    location: 'Brooklyn, NY 10001',
    timezone: 'UTC -05:00',
    isp: 'SpaceX Starlink'
  })
  const [ipAddressCopy, setIpAddressCopy] = useState<string | null>(null);

  async function getIPAddress() {
    try {
      setData((prevData) => ({
        ...prevData,
        loading: true,
        error: false
      }));
      let resp: any;
      if (!data.ipAddress) {
        resp = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`);
      } else {
        resp = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${data.ipAddress}`);
      }
      setIpAddressCopy(resp.data.ip);
      setData((prevData) => ({
        ...prevData,
        error: false,
        loading: false,
        lat: resp.data.location.lat,
        lng: resp.data.location.lng,
        ipAddress: resp.data.ip,
        location: `${resp.data.location.city}, ${resp.data.location.country}`,
        timezone: resp.data.location.timezone,
        isp: resp.data.isp
      }));
      console.log(error);
    } catch (err) {
      console.error(err);
      setData((prevData) => ({
        ...prevData,
        error: true,
        loading: false
      }));
      console.log(data.error);
    }
  }

  useEffect(() => {
    getIPAddress();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      ipAddress: e.target.value
    }));
  }

  const { error, loading, lat, lng, ipAddress, location, timezone, isp } = data;
  const customIcon = new Icon({
    iconUrl: '/icon-location.svg',
  })

  function UpdateMapView({ center }: { center: [ number, number ]}) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }

  return (
    <div className="App">
      <Header>
        <Title>IP Address Tracker</Title>
        <FormGroup>
          <Input className={error ? 'invalid-input' : ''} placeholder='Search for any IP address or domain' onChange={handleChange} value={ipAddress ?? ''} onKeyUp={e => e.key === 'Enter' && getIPAddress()}/>
          <Button onClick={getIPAddress}>
            <img src="/icon-arrow.svg" alt="Arrow Search" />
          </Button>
          {error && <small className='invalid-error'>Invalid IP Address inserted</small>}
        </FormGroup>
      </Header>
      <Main>
      {loading ? (
          <LoadingSpinner/>
        ) : (
          <>
        <Container>
          <InfoBlock>
            <h4>Ip Address</h4>
            <h3>{ipAddressCopy}</h3>
          </InfoBlock>
          <InfoBlock>
            <h4>Location</h4>
            <h3>{location}</h3>
          </InfoBlock>
          <InfoBlock>
            <h4>Timezone</h4>
            <h3>{timezone}</h3>
          </InfoBlock>
          <InfoBlock>
            <h4>Ip Address</h4>
            <h3>{isp}</h3>
          </InfoBlock>
        </Container>
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={[lat, lng]} icon={customIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <UpdateMapView center={[lat, lng]}/>
        </MapContainer>
        </>
        )}
      </Main>
    </div>
    );
}

export default App;
