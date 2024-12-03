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

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <>
    <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>Sheng-Lin Yang</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior><Nav.Link active={isActive("/")} onClick={() => setIsExpanded(false)}>Home</Nav.Link></Link>
            {token && (
              <>
                <Link href="/search" passHref legacyBehavior><Nav.Link active={isActive("/search")} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link></Link>
              </>
            )}
          </Nav>
          { token &&
          (<Nav>
            <>
              <Link href="/register" passHref legacyBehavior><Nav.Link active={isActive("/register")} onClick={() => setIsExpanded(false)}>Register</Nav.Link></Link>
              <Link href="/login" passHref legacyBehavior><Nav.Link active={isActive("/login")} onClick={() => setIsExpanded(false)}>Login</Nav.Link></Link>
            </>
          </Nav>)
          }
          {token && (
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="success">Search</Button>
          </Form>
          )}
          &nbsp;
          {token ? (
          <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                    Search History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
            <Link href="/register" passHref legacyBehavior>
              <Nav.Link onClick={() => setIsExpanded(false)} active={isActive("/register")}>Register</Nav.Link>
            </Link>
            <Link href="/login" passHref legacyBehavior>
              <Nav.Link onClick={() => setIsExpanded(false)} active={isActive("/login")}>Login</Nav.Link>
            </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br /><br /><br />
    </>
  );
}