import { useContext, useState } from 'react';
import SideBar from '../../components/sideBar/SideBar';
import "./updateVideo.scss";
import Select from "react-select";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";
import { updateVideo } from '../../context/videoContext/apiCalls';
import { VideoContext } from "../../context/videoContext/VideoContext";
import { useLocation } from 'react-router-dom';

const UpdateVideo = () => {
  const storage = getStorage(app);
  const location = useLocation();
  const { dispatch } = useContext(VideoContext);
  const currentVideo = location.state?.video;

  const formatOptions = [
    { value: 'Movie', label: 'Movie' },
    { value: 'Series', label: 'Series' }
  ];
  const categoryOptions = [
    { value: 'Action', label: 'Action' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Animation', label: 'Animation' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Sci_Fi', label: 'Sci-Fi' },
    { value: 'Thriller', label: 'Thriller' }
  ];

  const [updatedVideo, setUpdatedVideo] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedVideo({ ...updatedVideo, [e.target.name]: value });
  };

  const handleFormatChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setUpdatedVideo({ ...updatedVideo, "format": selectedValue });
  };

  const handleCategoriesChange =  (selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setUpdatedVideo({ ...updatedVideo, "categories": values })
  };

  const upload = (contents) => {
    contents.forEach(content => {
      const storageRef = ref(storage, '/contents/' + content.file.name)
      const uploadTask = uploadBytesResumable(storageRef, content.file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (err) => {console.log(err)}, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
            setUpdatedVideo((item) => {
            return { ...item, [content.label]: url };
          });
          setUploaded((item) => item + 1);
        });
      });
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.value) {
        upload([
            { file: video, label: "video" },
            { file: thumbnail, label: "thumbnail" },
            { file: trailer, label: "trailer" }
        ]);
    } else {
        setUploaded(3);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVideo(updatedVideo, currentVideo._id, dispatch);
  };

  console.log(updatedVideo);

  return (
    <div className="updateVideo">
      <div className="left">
        <SideBar />
      </div>
      <div className="right">
        <div className="currentVideo">
            <img
                className='thumbnail'
                src={currentVideo.thumbnail}
                alt=""
            />
            <div className="information">
                <span>Id</span>
                <span>{currentVideo._id}</span>
                <span>Video Name</span>
                <span>{currentVideo.videoname}</span>
                <span>Format</span>
                <span>{currentVideo.format}</span>
                <span>Categories</span>
                <div>
                    {
                        currentVideo.categories.map(function(item, index) {
                            return <span key={`demo_snap_${index}`}>{ (index ? ', ' : '') + item }</span>;
                        })
                    }
                </div>  
                <span>Description</span>
                <span>{currentVideo.description.substring(0, 35)}...</span>
                <span>Cast</span>
                <span>{currentVideo.cast}</span>
                <span>Director(s)</span>
                <span>{currentVideo.director}</span>
                <span>Release Date</span>
                <span>{currentVideo.releasedate}</span>
                <span>Duration</span>
                <span>{currentVideo.duration}</span>
                <span>Limits</span>
                <span>{currentVideo.limits}</span>
                <span>Series Name</span>
                <span>{currentVideo.seriesname}</span>
                <span>Chapter Number</span>
                <span>{currentVideo.chapternumber}</span>
            </div>
        </div>
        <form className='updateInfoInputs'>
          <label>Video Name</label>
          <input type="text" name="videoname" onChange={handleChange}></input>
          <label>Format</label>
          <Select
            className='formatSelect'
            name="format"
            isMulti={false}
            options={formatOptions}
            onChange={handleFormatChange}
          />
          <label>Categories</label>
          <Select 
            className='categorySelect'
            name="categories"
            isMulti={true}
            options={categoryOptions}
            isClearable={false}
            onChange={handleCategoriesChange}
          />
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange}></input>
          <label>Cast</label>
          <input type="text" name="cast" onChange={handleChange}></input>
          <label>Director(s)</label>
          <input type="text" name="director" onChange={handleChange}></input>
          <label>Release Date</label>
          <input type="text" name="releasedate" onChange={handleChange}></input>
          <label>Duration</label>
          <input type="text" name="duration" onChange={handleChange}></input>
          <label>Limits</label>
          <input type="text" name="limits" onChange={handleChange}></input>
          <label>Series Name</label>
          <input type="text" name="seriesname" onChange={handleChange}></input>
          <label>Chapter Number</label>
          <input type="text" name="chapternumber" onChange={handleChange}></input>
          <label>Video</label>
          <input type="file" id="video" name="video" onChange={e=>setVideo(e.target.files[0])}></input>
          <label>Thumbnail</label>
          <input type="file" id="thumbnail" name="thumbnail" onChange={e=>setThumbnail(e.target.files[0])}></input>
          <label>Trailer</label>
          <input type="file" id="trailer" name="trailer" onChange={e=>setTrailer(e.target.files[0])}></input>
        </form>
        <div className="buttons">
          {uploaded === 3 ? (
            <button className='updateVideoBtn' onClick={handleSubmit}>Update Video</button>
          ) : (
            <button className='updateVideoBtn' onClick={handleUpload}>Upload Changes</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateVideo;