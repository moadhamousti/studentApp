import styled from 'styled-components';
import { Button } from '@mui/material';

const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

const BlueButton = styled(Button)`
  && {
    background-color: #1877f2;
    color: #fff;
    &:hover {
      background-color: #0780b8;
    }
  }
`;

const PurpleButton = styled(Button)`
  && {
    background-color: #121e6e;
    color: #fff;
    &:hover {
      background-color: #2138cf;
    }
  }
`;




const LightPurpleButton = styled(Button)`
  && {
    background-color: #0b51bf;
    transition: transform 0.3s ease;
    color: #fff;
    &:hover {
      background-color: #5689da;
      transform: translateY(-5px);
    }
  }
`;

const AddButton = styled(Button)`
  && {
    background-color: #288dd1;
    color: #fff;
    &:hover {
      background-color: #5ab5f2;
    }
  }
`;

const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;

const IndigoButton = styled(Button)`
  && {
    background-color: #2f2b80;
    color: white;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;

export {
  RedButton,
  BlackButton,
  DarkRedButton,
  BlueButton,
  PurpleButton,
  LightPurpleButton,
  AddButton,
  BrownButton,
  IndigoButton,
};
