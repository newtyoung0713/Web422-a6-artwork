import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { ListGroup, Card, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!Array.isArray(searchHistory)) return null;
  
  let parsedHistory = [];

  searchHistory.forEach(h => {
      let params = new URLSearchParams(h);
      let entries = params.entries();
      parsedHistory.push(Object.fromEntries(entries));
  });
  

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    try {
      const updatedHistory = await removeFromHistory(searchHistory[index]);
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to remove from history:", error);
    }
  };  

  if (parsedHistory.length === 0) {
    return (<>
      <Card.Text>History</Card.Text>
      <Card>
        <Card.Body>
          <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
        </Card.Body>
      </Card>
    </>);
  }

  return (<>
    <h1>History</h1>
    <ListGroup>
      {parsedHistory.map((historyItem, index) => (
        <ListGroup.Item 
          key={index} 
          className={styles.historyListItem}
          onClick={(e) => historyClicked(e, index)}
        >
          {Object.keys(historyItem).map(key => (
            <>
              {key}: <strong>{historyItem[key]}</strong>&nbsp;
            </>
          ))}
          <Button 
            className="float-end" 
            variant="danger" 
            size="sm" 
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </>);
}