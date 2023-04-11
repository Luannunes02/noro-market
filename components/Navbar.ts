import styled from "styled-components";

export const Header = styled.header`
    background-color: #333;
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .navbar-logo a {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
  }

  .navbar-menu {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;

    li {
      margin: 0 10px;

      a {
        font-size: 18px;
        text-decoration: none;
        color: #fff;
      }
    }
  }

  .navbar-toggle {
    display: none;

    span {
      display: block;
      height: 3px;
      width: 25px;
      margin-bottom: 5px;
      background-color: #fff;
    }
  }

  @media (max-width: 768px) {
    .navbar-menu {
      display: none;
    }
    
    .navbar-toggle {
      display: block;
      cursor: pointer;
    }
  }

  &.active {
    .navbar-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #333;
      padding: 20px 0;

      li {
        margin: 10px 0;

        a {
          color: #fff;
        }
      }
    }
  }

`