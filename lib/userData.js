import { getToken } from "./authenticate";

// PUT request to /favourites/id
export async function addToFavourites(id) {
  try {
    const token = getToken();
    console.log('Token:', token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      return data
    } else {
      const errorData = await res.json();
      console.error('Error:', errorData);
      return [];
    }
  } catch(err) {
    console.error("Error adding to favourites:", err);
    return [];
  }
}

// DELETE request to /favourites/id
export async function removeFromFavourites(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      return data
    } else {
      const errorData = await res.json();
      console.error('Error:', errorData);
      return [];
    }  
  } catch(err) {
    console.error("Error deleting from favourites:", err);
    return [];
  }
}

// GET request to /favourites
export async function getFavourites() {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {   
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      return data
    } else {
      const errorData = await res.json();
      console.error('Error:', errorData);
      return [];
    }  
  } catch(err) {
    console.error("Error retrieving favourites:", err);
    return [];
  }
}

// PUT request to /history/id
export async function addToHistory(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      return data
    } else {
      const errorData = await res.json();
      console.error('Error:', errorData);
      return [];
    } 
  } catch(err) {
    console.error("Error adding to history:", err);
    return [];
  }
}

// DELETE request to /history/id
export async function removeFromHistory(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      return data
    } else {
      const errorData = await res.json();
      console.error('Error:', errorData);
      return [];
    }  
  } catch(err) {
    console.error("Error deleting from history:", err);
    return [];
  }
}

//GET request to /history
export async function getHistory() {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      headers: {   
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    if (res.status === 200) {
      const data = await res.json();
      return data
    } else {
      const errorData = await res.json();
      console.error('Error:', errorData);
      return [];
    }
  } catch(err) {
    console.error("Error retrieving history:", err);
    return [];
  }
}
