import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import '~/assets/scss/Modal.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ children, open, setOpen, title, confirm, confirmText = 'Salvar alterações', sx }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        className="modalContent"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={sx}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          className="closeModal"
          aria-label="close"
          onClick={() => handleClose(false)}
          sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {children}
        </DialogContent>
        <DialogActions>
          { confirmText != '' &&
            <Button autoFocus onClick={() => {
              handleClose(false) 
              confirm()
            }}>
                {confirmText}
            </Button>
          }
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}