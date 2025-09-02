import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
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

export default function CustomizedDialogs({ children, open, setOpen, title, confirm, confirmReturn, confirmText = 'Salvar alterações', disabled, sx, atualizar }) {
  const [error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if(confirm){
      confirm();
      handleClose();
    } else if (confirmReturn){
      const response = await confirmReturn();

      if(response['error']){
        setError(response['error']);
      } else {
        atualizar();
        handleClose();
      }
    }
  };

  useEffect(() => {
    setError(null);
  }, [open]);

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
          <Box sx={{ color: 'red', fontSize: 13, marginTop: 1 }}>{error}</Box>
        </DialogContent>
        <DialogActions>
          { confirmText != '' &&
            <Button autoFocus onClick={handleSubmit} disabled={disabled}>
                {confirmText}
            </Button>
          }
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}