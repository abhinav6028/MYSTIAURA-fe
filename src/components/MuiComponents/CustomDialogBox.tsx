import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({btnname1, btnname2, title, description, open, onClose,btn2Func}: {btnname1: string, btnname2: string, title: string, description: string, open: boolean, onClose: () => void, btn2Func: () => void}) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete this {description}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} variant='outlined'>{btnname2}</Button>
          <Button onClick={btn2Func} variant='contained' color='error' autoFocus>
            {btnname1}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
