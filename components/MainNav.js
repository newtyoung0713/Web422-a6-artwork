import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';

export default function MainNav() {

  const [searchField, setSearchField] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();
  let token = readToken();

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/');
  }

  async function submitForm(e){
    e.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    setIsExpanded(false);
    if (searchField != "") {
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchField("");
    }
  }


  return (
    <>
        <Navbar expanded={isExpanded} expand="lg" className="bg-dark navbar-dark fixed-top">
            <Container>
                <Navbar.Brand>Sheng-Lin Yang</Navbar.Brand>
                <Navbar.Toggle onClick={() => setIsExpanded((someBoolean) => {return !someBoolean;})} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                        {token &&
                        (<Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>)
                        }
                    </Nav>
                    { !token &&
                    (<Nav>
                        <Nav.Link href="/register" active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                        <Nav.Link href="/login" active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                    </Nav>)
                    }
                    {token &&
                    (<><Form className="d-flex" onSubmit={submitForm}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchField}
                        onChange={(e)=>setSearchField(e.target.value)}
                        />
                        <Button variant="success" type="submit">Search</Button>
                    </Form>
                    <Nav>
                        <NavDropdown title={token.userName} id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>History</NavDropdown.Item>
                            </Link>
                            
                            <NavDropdown.Item onClick={() => {
                                setIsExpanded(false);
                                logout();
                            }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav></>)
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br/>
        <br/>
    </>
  );
}