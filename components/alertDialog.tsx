import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
type Props = {
  isOpen: boolean;
  isClose: (click: boolean) => void;
  handleDeleteClick: () => void

}
const AlertDialog = ({ isOpen, isClose, handleDeleteClick }: Props) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => isClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"정말로 해당 데이터를 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            삭제 후 해당 데이터는 없어집니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick}>취소</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;