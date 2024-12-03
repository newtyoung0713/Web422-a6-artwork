import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

// export default function ArtworkCardDetail({ objectID, ...props }) {
export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked() {

    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  }

  if (error) return <Error statusCode={404} />;
  else if (!data) return null;
  else {
    
    return (<>
      <Card>
        {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>{data.objectDate || "N/A"}<br />
            <strong>Classification: </strong>{data.classification || "N/A"}<br />
            <strong>Medium: </strong>{data.medium || "N/A"}
            <br /><br />
            
            <strong>Artist: </strong> {data.artistDisplayName || "N/A"} {data.artistWikidata_URL && <>( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> )</>}<br />
            <strong>Credit Line: </strong> {data.creditLine || "N/A"}<br />
            <strong>Dimensions: </strong> {data.dimensions || "N/A"}

          </Card.Text>
          <Button 
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    </>);
  }
}