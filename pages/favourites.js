import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Container, Row, Col } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <Container>
        <h1>Favourites</h1>
        <p><strong>Nothing here</strong>. Try adding some new artwork to the list.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Favourites</h1>
      <Row>
        {favouritesList.map((objectID) => (
          <Col key={objectID} md={4}>
            <ArtworkCard objectID={objectID} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}