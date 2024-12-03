import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { ListGroup, Card, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  async function removeHistoryClicked(index) {
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }
  
  let parsedHistory = searchHistory.map(h => {
    let params = new URLSearchParams(h);
    return Object.fromEntries(params.entries());
  });

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory(current => {
      let newHistory = [...current];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  if (parsedHistory.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
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
  );
}