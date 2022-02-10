import styled from "styled-components";

export const Table = styled.table`
  border-spacing: 0;
  border-top: 4px solid #009223;
  min-width: 1200px;

  tr {
    height: 69px;
  }
  th {
    text-align: left;
    padding: 0 30px;
    color: #292929;
    line-height: 22px;
    font-weight: normal;
    border-bottom: 1px solid #dddddd;
  }
  td {
    padding: 0 30px;
    text-align: left;
    color: #666;
    line-height: 22px;
    letter-spacing: -0.05em;
    border-bottom: 1px solid #dddddd;
  }
`;

export const Tbody = styled.tbody``;

export const Thead = styled.thead`
  tr > th {
    font-weight: bold;
  }
`;

export const Tfoot = styled.tfoot`
  background-color: #f6f6f6;
  tr > th {
    font-weight: bold;
  }
  tr > td {
    font-weight: bold;
  }
`;

export const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 5% auto;
  border: 1px solid #888;
  height: 70%;
  border-radius: 20px;
  border: 0px;
  display: table;

  @media only screen and (max-width: 600px) {
    padding: 10px;
    width: 90%;
  }
  @media only screen and (min-width: 600px) {
    padding: 10px;
    width: 80%;
  }
  @media only screen and (min-width: 768px) {
    padding: 20px;
    width: 70%;
  }
  @media only screen and (min-width: 992px) {
    padding: 20px;
    width: 60%;
  }
  @media only screen and (min-width: 1200px) {
    padding: 20px;
    width: 50%;
  }
`;

const EditLi = styled.li`
  padding: 15px 15px;
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background-color: #eff6f5;
  }
  span {
    font-size: ${(props) => props.theme.fontSizes.title5};
  }
`;

const EditUl = styled.ul`
  display: none;
  position: absolute;
  z-index: 9999;
  right: 10px;
  text-align: left;
  white-space: nowrap;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0px 0px 5px 0.1px #dddddd;
  border-radius: 20px;
  padding: 10px 0px;
  min-width: 120px;
`;

const EditWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
  &:hover ${EditUl} {
    display: block;
  }
`;

const EditButton = styled.button`
  display: block;
  position: relative;
  z-index: 1;
  padding: 5px;
  cursor: pointer;
  right: 10px;
  background-color: white;
  border-radius: 100%;
  border: 1px solid #175436;
  &:hover {
    box-shadow: 0px 0px 5px 0.1px #dddddd;
  }
`;

const Li = styled.li`
  display: block;
`;

export const InputWrap = styled.div`
  text-align: left;
  display: grid;
  margin-top: 10px;
`;

const LabelWrap = styled.div`
  padding: 10px;
`;
export const Label = styled.label`
  color: rgb(139, 152, 167);
  font-weight: 600;
  font-size: 17px;
`;

export const Description = styled.p`
  color: rgb(139, 152, 167);
  line-height: 2;
  font-size: 12px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  overflow: auto;
  border-radius: 10px;
  border: 1px solid #d2d4de;
  padding: 20px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  margin: 5px 0px;
  font-size: 13px;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #d2d4de;
  padding: 0px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  margin: 5px 0px;
  font-size: 13px;
`;

export const Select = styled.select`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #d2d4de;
  padding: 0px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  font-size: 13px;
`;

const Form = styled.form``;

const ImageInput = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #d2d4de;
  padding: 0px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  font-size: 13px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const Content = styled.p`
  color: #8e9ba7;
  font-size: 13px;
  margin-top: 3px;
`;

const Icon = styled.button`
  display: table-cell;
  padding: 5px;
  cursor: pointer;
  background-color: white;
  border-radius: 100%;
  margin-left: 5px;
  border: 1px solid #175436;
`;

export const Button = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 0px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(12, 36, 59);
  &:hover {
    background-color: rgb(12, 50, 59);
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
  }
  margin: 40px auto 0px auto;
  cursor: pointer;
`;

const AddButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 0px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  background-color: #d15b56;
  &:hover {
    background-color: #cc3d3d;
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
  }
  margin: 40px auto 0px auto;
  cursor: pointer;
`;

const DroppableLi = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  overflow: auto;
  margin: 0px;
  li:nth-child(1) {
    width: 40px;
    overflow: auto;
    padding: 0px 10px;
  }
  li:nth-child(2) {
    width: 100%;
    overflow: auto;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  border: 0px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(12, 36, 59);
  &:hover {
    background-color: rgb(12, 50, 59);
    transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
  }
  cursor: pointer;
`;

export const ModalBox = (width?: number) => {
  return {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width ? width : 500,
    minHeight: 500,
    maxHeight: 800,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    p: 4,
  }
};

const Style = {
  TextArea,
  Table,
  Thead,
  Tbody,
  Tfoot,
  ModalContent,
  Modal,
  EditUl,
  EditLi,
  EditWrap,
  EditButton,
  Li,
  InputWrap,
  Label,
  Input,
  Select,
  Form,
  Icon,
  Content,
  ImageInput,
  Button,
  DroppableLi,
  DeleteButton,
  AddButton,
  Description,
  LabelWrap,
};

export default Style;
