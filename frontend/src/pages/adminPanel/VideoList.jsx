import { useContext, useEffect, useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import "./videoList.scss";
import { DataGrid } from '@mui/x-data-grid';
import { VideoContext } from "../../context/videoContext/VideoContext";
import { deleteVideo, getVideos } from "../../context/videoContext/apiCalls";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";

const VideoList = () => {
  const { videos, dispatch } = useContext(VideoContext);
  const [open, setOpen] = useState(false);
  const [deleting, SetDeleting] = useState();

  useEffect(() => {
    getVideos(dispatch);
  }, [dispatch]);

  const handleClickOpen = (item) => {
    SetDeleting(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (item) => {
    deleteVideo(item, dispatch);
    handleClose();
  };

  const videoListColumns = [
    { 
      field: '_id', 
      headerName: 'Id',
      width: '75'
    },
    {
      field: 'videoname',
      headerName: 'Name',
      width: '150'
    },
    {
      field: 'format',
      headerName: 'Format',
      width: '75'
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: '150'
    },
    {
      field: 'description',
      headerName: 'Description',
      width: '200'
    },
    {
      field: 'cast',
      headerName: 'Cast',
      width: '150'
    },
    {
      field: 'director',
      headerName: 'Director',
      width: '100'
    },
    {
      field: 'releasedate',
      headerName: 'Release Date',
      width: '110'
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: '75'
    },
    {
      field: 'limits',
      headerName: 'Limits',
      width: '65'
    },
    {
      field: 'seriesname',
      headerName: 'Series Name',
      width: '110'
    },
    {
      field: 'chapternumber',
      headerName: 'Chapter Number',
      width: '130'
    },
    {
      field: 'operation',
      headerName: 'Operations',
      width: '200',
      renderCell: (params) => {
        const id = params.row._id;
        const video = params.row;
        return (
          <>
            <Link to="/updateVideo" state={{ video, id }}>
              <button className="updateBtn">Update</button>
            </Link>
            <button className="deleteBtn" onClick={() => handleClickOpen(params.row._id)}>Delete</button>
          </>
        )
      }
    }
  ];
  
  return (
    <div className="videoList">
      <div className="left">
        <SideBar />
      </div>
      <div className="right">
        <DataGrid 
          rows={videos}
          columns={videoListColumns}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnMenu={true}
          getRowId={(row) => row._id}
          sx={{
            
          }}
        />
      </div>
      <div>
      <Dialog
        open={open}
        onClose={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          
          color: 'black'
        }}
      >
        <DialogTitle 
          id="alert-dialog-title"
          sx={{
            background: 'black',
            color: 'white'
          }}
        >
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent
          sx={{
            background: 'black',
          }}
        >
          <DialogContentText 
            id="alert-dialog-description"
            sx={{
              color: 'white'
            }}
          >
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            background: 'black'
          }}
        >
          <Button 
            onClick={handleClose} 
            sx={{
              color: 'white'
            }}
          >Cancel</Button>
          <Button 
            onClick={() => handleDelete(deleting)}
            sx={{
              color: 'red'
            }}
          >Delete</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}

export default VideoList;